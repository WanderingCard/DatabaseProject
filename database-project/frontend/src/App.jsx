import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@mui/material';

function App() {
  const [integrationData, setIntData] = useState({});
  const [fieldValue, setFieldValue] = useState("");
  
  const fetchData = async () => {
    await fetch('http://localhost:5050/test/', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        setIntData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const postData = async (value) => {
    await fetch ('http://localhost:5050/test/', {
      method: 'POST',
      body: JSON.stringify({
        data: value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => {
      console.log(err.message)
    })
  }

  return (
    <Grid container spacing ={3} style={{width:'50vw', height:'75vh', marginLeft:'25vw', marginTop:'12.5vh'}}>
      <Grid item xs={8}>
        <TextField 
        fullWidth
          variant='outlined' 
          label='Test' 
          value={fieldValue}
          onChange={(event) => {
            setFieldValue(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Button 
          fullWidth
          variant='contained'
          onClick={() => {
            postData(fieldValue);
            setFieldValue('');
          }}
        >
          Add Data
        </Button>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Button
          variant='contained'
          onClick={() => {
            fetchData();
          }}
        >
          Get Data
        </Button>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={12}>
        <pre>
          {JSON.stringify(integrationData, null, 2)}
        </pre>
      </Grid>
    </Grid>
  )
}

export default App;
