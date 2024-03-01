import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Alert } from '@mui/material';
import axios from 'axios';

function CustomerForm() {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [usedPhoneNumbers, setUsedPhoneNumbers] = useState([]);

  useEffect(() => {
    // Fetch existing phone numbers from the API
    axios.get('http://localhost:3005/customers')
      .then(response => {
        const phoneNumbers = response.data.map(customer => customer.phoneNumber);
        setUsedPhoneNumbers(phoneNumbers);
      })
      .catch(error => {
        console.error('Error fetching phone numbers:', error);
      });
  }, []);

  const handleChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(customerData).filter(key => customerData[key] === '');
    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      setAlertMessage('Please fill in all required fields.');
      return;
    }
    if (usedPhoneNumbers.includes(customerData.phoneNumber)) {
      setErrorFields(['phoneNumber']);
      setAlertMessage('Phone number already exists. Please use a different phone number.');
      return;
    }
    axios.post('http://localhost:3005/customers', customerData)
      .then(response => {
        setAlertMessage('Customer added successfully.');
        setCustomerData({
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
        });
        setUsedPhoneNumbers([...usedPhoneNumbers, response.data.phoneNumber]); // Add the newly added phone number to the list of used phone numbers
      })
      .catch(error => {
        console.error('Error adding customer:', error);
        setAlertMessage('Error adding customer: ' + error.message);
      });
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        New Customer Form
      </Typography>
      {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={customerData.firstName}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('firstName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={customerData.lastName}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('lastName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              value={customerData.address}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('address')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={customerData.phoneNumber}
              onChange={handleChange}
              fullWidth
              required
              error={errorFields.includes('phoneNumber')}
              helperText={errorFields.includes('phoneNumber') ? 'Phone number already taken' : ''}
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
