import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

function CustomerForm() {
  const [customerData, setCustomerData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setCustomerData({
      ...customerData,
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
        New Customer Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={customerData.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              value={customerData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={customerData.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Customer
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CustomerForm;
