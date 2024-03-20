import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField, Button, Alert, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

function ServiceCount({ topServices }) { 
  const [serviceCount, setServiceCount] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [services, setServices] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3007/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleCountSubmit = (e) => {
    e.preventDefault();
    if (!selectedService || !startDate || !endDate) {
      setAlertMessage('Please select service and provide start and end dates.');
      return;
    }
    axios.get(`http://localhost:3007/jobs/count?service=${selectedService}&start=${startDate}&end=${endDate}`)
      .then(response => {
        setServiceCount(response.data.count);
        setAlertMessage('');
        generateChartData(response.data.services);
      })
      .catch(error => {
        console.error('Error fetching service count:', error);
        setAlertMessage('Error fetching service count.');
      });
  };

  const generateChartData = (serviceData) => {
    const chartData = {
      columns: [
        { field: 'service', headerName: 'Service' },
        { field: 'percentage', headerName: 'Percentage' },
      ],
      rows: serviceData.map(service => ({
        id: service.service,
        service: service.service,
        percentage: (service.count / serviceCount) * 100,
      })),
    };
    setChartData(chartData);
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Service Count
      </Typography>
      {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
      <form onSubmit={handleCountSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <InputLabel>Service</InputLabel>
            <Select
              value={selectedService}
              onChange={handleServiceChange}
              fullWidth
              required
            >
              <MenuItem value="" disabled>Select a service</MenuItem>
              {topServices.map(service => (
                <MenuItem key={service} value={service}>{service}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="date"
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="date"
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Get Service Count
            </Button>
          </Grid>
        </Grid>
      </form>
      {serviceCount > 0 && (
        <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
          <DataGrid
            rows={chartData.rows}
            columns={chartData.columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </div>
      )}
    </div>
  );
}

export default ServiceCount;
