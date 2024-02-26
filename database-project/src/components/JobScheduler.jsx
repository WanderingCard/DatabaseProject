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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to schedule job (e.g., sending data to backend)
    console.log(formData); // For testing purposes
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
              label="Date"
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
