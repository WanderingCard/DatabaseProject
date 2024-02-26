import React from 'react';
import { Container, Typography } from '@mui/material';
import CustomerForm from './components/CustomerForm';
import ServiceForm from './components/ServiceForm';
import JobScheduler from './components/JobScheduler';
import JobList from './components/JobList';
import ServiceReport from './components/ServiceReport';
import './App.css';

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Mechanic Shop Management
      </Typography>
      <CustomerForm />
      <ServiceForm />
      <JobScheduler />
      <JobList />
      <ServiceReport />
    </Container>
  );
}

export default App;