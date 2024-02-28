import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, Alert } from '@mui/material';
import axios from 'axios';

function NewCar() {
  const [carData, setCarData] = useState({
    customerId: '',
    model: '',
    trim: '',
    year: '',
    make: '',
    vin: '',
  });
  const [customers, setCustomers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(carData).filter(key => carData[key] === '');
    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      setAlertMessage('Please fill in all required fields.');
      return;
    }
    axios.post('http://localhost:3006/cars', carData)
      .then(response => {
        setAlertMessage('Car added successfully');
        setCarData({
          customerId: '',
          model: '',
          trim: '',
          year: '',
          make: '',
          vin: '',
        });
      })
      .catch(error => {
        console.error('Error adding car:', error);
        setAlertMessage('Error adding customer: ' + error.message)
      });
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        New Car Form
      </Typography>
      {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Customer"
              name="customerId"
              value={carData.customerId}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('customer')}
            >
              {customers.map(customer => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.firstName} {customer.lastName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Model"
              name="model"
              value={carData.model}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('model')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Trim"
              name="trim"
              value={carData.trim}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('trim')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Year"
              name="year"
              value={carData.year}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('year')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Make"
              name="make"
              value={carData.make}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('make')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Vin #"
              name="vin"
              value={carData.vin}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('vin')}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Car
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default NewCar;
