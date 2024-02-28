import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

function CustomerForm() {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
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
    axios.post('http://localhost:3001/customers', customerData)
      .then(response => {
        console.log('Customer added successfully:', response.data);
        setCustomerData({
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
        });
      })
      .catch(error => {
        console.error('Error adding customer:', error);
      });
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
              label="First Name"
              name="firstName"
              value={customerData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={customerData.lastName}
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
