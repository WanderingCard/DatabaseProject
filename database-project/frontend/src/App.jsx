/*import React from 'react';
import { Container, Typography } from '@mui/material';
import CustomerForm from './components/CustomerForm';
import ServiceForm from './components/ServiceForm';
import JobScheduler from './components/JobScheduler';
import JobList from './components/JobList';
import ServiceReport from './components/ServiceReport';
import NewCar from './components/NewCar';
import './App.css';

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Mechanic Shop Management
      </Typography>
      <CustomerForm />
      <NewCar />
      <ServiceForm />
      <JobScheduler />
      <JobList />
      <ServiceReport />
    </Container>
  );
}

export default App;*/
import React, { useState, useEffect } from 'react';
import CustomerForm from './components/CustomerForm';
import NewCar from './components/NewCar';
import JobList from './components/JobList';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

function App() {
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });

    axios.get('http://localhost:3006/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });

    axios.get('http://localhost:3007/jobs')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Mechanic Shop Management
      </Typography>
      <CustomerForm />
      <h2>Customers</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            <strong>{customer.firstName} {customer.lastName}</strong>: {customer.address} ({customer.phoneNumber})
          </li>
        ))}
      </ul>
      <NewCar />
      <h2>Cars</h2>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            <strong>Customer ID:</strong> {car.customerId}, <strong>Model:</strong> {car.model}, <strong>Make:</strong> {car.make}, <strong>Year:</strong> {car.year}
          </li>
        ))}
      </ul>
      <JobList />
      <h2>Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <strong>Car:</strong> {job.car}, <strong>Service:</strong> {job.service}
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default App;
