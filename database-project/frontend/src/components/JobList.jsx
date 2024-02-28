import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Grid, TextField, Button, Alert, Select, MenuItem } from '@mui/material';
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
    // Filter jobs based on the cars fetched from the API
    const filteredJobs = jobs.filter(job => cars.some(car => car.id === job.carId));
    setFilteredJobs(filteredJobs);
  }, [cars]);

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

  // Dummy data for testing
  const jobs = [
    { id: 1, carId: 1, service: 'Service 1', date: '2024-02-27', technician: 'Technician 1' },
    { id: 2, carId: 2, service: 'Service 2', date: '2024-02-28', technician: 'Technician 2' },
    { id: 3, carId: 3, service: 'Service 3', date: '2024-02-29', technician: 'Technician 3' },
  ];

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Job List
      </Typography>
      {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Select
              label="Car"
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
            <TextField
              label="Service"
              name="service"
              value={jobData.service}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('service')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={jobData.date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={errorFields.includes('date')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Technician"
              name="technician"
              value={jobData.technician}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('technician')}
            />
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
