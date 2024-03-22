import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, InputLabel } from '@mui/material';

const topServices = ['Oil Change', 'Tire Rotation', 'Brake Inspection', 'Engine Tune-up', 'Car Wash'];

function TechnicianForm() {
  const [technicianData, setTechnicianData] = useState({
    fname: '',
    lname: '',
    services: [],
  });
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3008/technician')
      .then(response => {
        setTechnicians(response.data);
      })
      .catch(error => {
        console.error('Error fetching technicians:', error);
      });
  }, []);

  const handleChange = (e) => {
    setTechnicianData({
      ...technicianData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, services } = technicianData;
    if (!fname || !lname || services.length === 0) {
      alert('Please fill in all required fields.');
      return;
    }
    const newTechnician = {
      fname,
      lname,
      services,
    };
    axios.post('http://localhost:3008/technician', newTechnician)
      .then(response => {
        setTechnicians([...technicians, response.data]);
        setTechnicianData({
          fname: '',
          lname: '',
          services: [],
        });
      })
      .catch(error => {
        console.error('Error adding technician:', error);
        alert('Error adding technician. Please try again.');
      });
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Add Technician
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="fname"
              value={technicianData.fname}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lname"
              value={technicianData.lname}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="services-label">Services</InputLabel>
            <Select
              labelId="services-label"
              id="services"
              multiple
              value={technicianData.services}
              onChange={(e) => setTechnicianData({ ...technicianData, services: e.target.value })}
              fullWidth
              required
            >
              {topServices.map((service, index) => (
                <MenuItem key={index} value={service}>
                  {service}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Technician
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '20px' }}>
        Technician List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Services</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {technicians.map((technician, index) => (
              <TableRow key={index}>
                <TableCell>{technician.fname}</TableCell>
                <TableCell>{technician.lname}</TableCell>
                <TableCell>{technician.services.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TechnicianForm;
