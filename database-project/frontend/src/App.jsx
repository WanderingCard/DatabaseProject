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
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import CustomerForm from './components/CustomerForm';
import NewCar from './components/NewCar';
import JobList from './components/JobList';
import TechnicianForm from './components/TechnicianForm';

function App() {
  const [activeSection, setActiveSection] = useState('customers');
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customersData, carsData, jobsData] = await Promise.all([
        axios.get('http://localhost:3005/customers'),
        axios.get('http://localhost:3006/cars'),
        axios.get('http://localhost:3007/jobs')
      ]);
      setCustomers(customersData.data);
      setCars(carsData.data);
      setJobs(jobsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'customers':
        return (
          <div>
            <h2>Customers</h2>
            <CustomerForm />
            <ul>
              {customers.map(customer => (
                <li key={customer.id}>
                  <strong>{customer.firstName} {customer.lastName}</strong>: {customer.address} ({customer.phoneNumber})
                </li>
              ))}
            </ul>
          </div>
        );
      case 'cars':
        return (
          <div>
            <h2>Cars</h2>
            <NewCar />
            <ul>
              {cars.map(car => (
                <li key={car.id}>
                  <strong>Customer ID:</strong> {car.customerId}, <strong>Model:</strong> {car.model}, <strong>Make:</strong> {car.make}, <strong>Year:</strong> {car.year}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'jobs':
        return (
          <div>
            <h2>Jobs</h2>
            <JobList />
            <ul>
              {jobs.map(job => (
                <li key={job.id}>
                  <strong>Car:</strong> {job.car}, <strong>Service:</strong> {job.service}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'technician':
        return (
          <div>
            <h2>Technician</h2>
            <TechnicianForm />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Mechanic Shop Management
      </Typography>
      <div>
        <button onClick={() => setActiveSection('customers')}>Customers</button>
        <button onClick={() => setActiveSection('cars')}>Cars</button>
        <button onClick={() => setActiveSection('jobs')}>Jobs</button>
        <button onClick={() => setActiveSection('technician')}>Technician</button>
      </div>
      {renderSection()}
    </Container>
  );
}

export default App;
