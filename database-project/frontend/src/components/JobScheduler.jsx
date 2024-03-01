//This file is not needed anymore as JobList contains the sceduler


import React, { useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';

function JobScheduler() {
  const [formData, setFormData] = useState({
    carId: '',
    serviceId: '',
    date: '',
    technicianId: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule job');
      }

      // Reset the form after successful submission
      setFormData({
        carId: '',
        serviceId: '',
        date: '',
        technicianId: '',
      });

      console.log('Job scheduled successfully');
    } catch (error) {
      console.error('Error scheduling job:', error.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Job Scheduler
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Car ID"
              name="carId"
              value={formData.carId}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Service ID"
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label=""
              name="date"
              type="datetime-local"
              value={formData.date}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Technician ID"
              name="technicianId"
              value={formData.technicianId}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Schedule Job
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default JobScheduler;
