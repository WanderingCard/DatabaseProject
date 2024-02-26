import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

function ServiceForm() {
  const [serviceData, setServiceData] = useState({
    title: '',
    cost: '',
  });

  const handleChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., sending data to backend)
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        New Service Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              name="title"
              value={serviceData.title}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cost"
              name="cost"
              type="number"
              value={serviceData.cost}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Service
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ServiceForm;
