import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Grid, TextField, Button, Alert, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import ServiceCount from './ServiceCount';

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
  const [filterDate, setFilterDate] = useState('');
  const [fetchJobs, setFetchJobs] = useState(false);

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

  useEffect(() => {
    if (filterDate && fetchJobs) {
      axios.get(`http://localhost:3007/jobs?date=${filterDate}`)
        .then(response => {
          setFilteredJobs(response.data);
          setAlertMessage(response.data.length === 0 ? 'No jobs found for the selected date' : '');
          setFetchJobs(false);
        })
        .catch(error => {
          console.error('Error fetching jobs for the given date:', error);
          setAlertMessage('Error fetching jobs for the given date');
          setFilteredJobs([]);
          setFetchJobs(false);
        });
    }
  }, [filterDate, fetchJobs]);

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
    setFetchJobs(true); // Set to true to fetch jobs when date is changed
  };

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Job
      </Typography>
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
          <Grid item xs={12} sm={6}>
            <InputLabel>Date Filter</InputLabel>
            <TextField
              type="date"
              label=""
              value={filterDate}
              onChange={handleDateChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ServiceCount topServices={topServices} />
          </Grid>
        </Grid>
      </form>
      {filteredJobs.length > 0 && (
        <div>
          <Typography variant="h4" component="h2" gutterBottom>
            Jobs for Selected Date
          </Typography>
          <List>
            {filteredJobs.map((job) => (
              <ListItem key={job.id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
                <ListItemText primary={`${job.car} - ${job.service}`} secondary={`Date: ${job.date}, Technician: ${job.technician}`} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {alertMessage && <Alert severity="info">{alertMessage}</Alert>}
    </div>
  );
}

export default JobList
