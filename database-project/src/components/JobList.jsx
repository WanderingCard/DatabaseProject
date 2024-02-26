import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function JobList() {
  // Dummy data for testing
  const jobs = [
    { id: 1, car: 'Car 1', service: 'Service 1', date: '2024-02-27', technician: 'Technician 1' },
    { id: 2, car: 'Car 2', service: 'Service 2', date: '2024-02-28', technician: 'Technician 2' },
    { id: 3, car: 'Car 3', service: 'Service 3', date: '2024-02-29', technician: 'Technician 3' },
  ];

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Job List
      </Typography>
      <List>
        {jobs.map((job) => (
          <ListItem key={job.id}>
            <ListItemText primary={`${job.car} - ${job.service}`} secondary={`Date: ${job.date}, Technician: ${job.technician}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default JobList;
