import React from 'react';
import { Typography } from '@mui/material';

function ServiceReport() {
  // Dummy data for testing
  const serviceData = [
    { title: 'Service 1', count: 5 },
    { title: 'Service 2', count: 10 },
    { title: 'Service 3', count: 7 },
  ];

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Service Report
      </Typography>
      <ul>
        {serviceData.map((service) => (
          <li key={service.title}>
            {`${service.title}: ${service.count}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceReport;
