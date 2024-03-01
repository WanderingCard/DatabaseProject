import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Grid, TextField, Button, Alert, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';

function JobList() {
  const [jobData, setJobData] = useState({
    car: '',
    service: '',
    date: '',
    technician: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [cars, setCars] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const topServices = ['Oil Change', 'Tire Rotation', 'Brake Inspection', 'Engine Tune-up', 'Car Wash'];

  useEffect(() => {
    axios.get('http://localhost:3006/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3007/jobs')
      .then(response => {
        setFilteredJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3008/technician')
      .then(response => {
        const formattedTechnicians = response.data.map(tech => ({
          id: tech.id,
          name: `${tech.fname} ${tech.lname}`
        }));
        setTechnicians(formattedTechnicians);
      })
      .catch(error => {
        console.error('Error fetching technicians:', error);
      });
  }, []);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(jobData).filter(key => jobData[key] === '');
    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      setAlertMessage('Please fill in all required fields.');
      return;
    }
    axios.post('http://localhost:3007/jobs', jobData)
      .then(response => {
        setAlertMessage('Job added successfully.');
        setJobData({
          car: '',
          service: '',
          date: '',
          technician: '',
        });
      })
      .catch(error => {
        console.error('Error adding job:', error);
        setAlertMessage('Error adding job: ' + error.message);
      });
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Job List
      </Typography>
      {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel>Car</InputLabel>
            <Select
              name="car"
              value={jobData.car}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('car')}
            >
              <MenuItem value="" disabled>
                Select a car
              </MenuItem>
              {cars.map(car => (
                <MenuItem key={car.id} value={car.id}>
                  {car.make} - {car.model}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Service</InputLabel>
            <Select
              name="service"
              value={jobData.service}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('service')}
            >
              <MenuItem value="" disabled>
                Select a service
              </MenuItem>
              {topServices.map(service => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Date</InputLabel>
            <TextField
              type="date"
              name="date"
              value={jobData.date}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('date')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Technician</InputLabel>
            <Select
              name="technician"
              value={jobData.technician}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('technician')}
            >
              <MenuItem value="" disabled>
                Select a technician
              </MenuItem>
              {technicians.map(technician => (
                <MenuItem key={technician.id} value={technician.name}>
                  {technician.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Job
            </Button>
          </Grid>
        </Grid>
      </form>
      <List>
        {filteredJobs.map((job) => (
          <ListItem key={job.id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
            <ListItemText primary={`${job.car} - ${job.service}`} secondary={`Date: ${job.date}, Technician: ${job.technician}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default JobList;
