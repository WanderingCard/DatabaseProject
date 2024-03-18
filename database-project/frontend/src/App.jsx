import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

function App() {
  const [integrationData, setIntData] = useState([]);
  const [fieldValue, setFieldValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const fetchFitlerData = async () => {
    let url = 'http://localhost:5050/test/';
    if (filterValue !== "") {
      url += `?filter=${filterValue}`;
    }
    await fetch(url, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        if (filterValue !== "") {
          const filteredData = data.filter(item => item._id === filterValue);
          setIntData(filteredData);
        } else {
          setIntData(data);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const fetchAllData = async () => {
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
      <Grid item xs={4}>
        <TextField
          fullWidth
          variant='outlined'
          label='Filter'
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value)
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          variant='contained'
          onClick={() => {
            fetchFitlerData();
          }}
        >
          Get Fitler Data
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant='contained'
          onClick={() => {
            fetchAllData();
          }}
        >
          Get All Data
        </Button>
      </Grid>
      <Grid item xs={12}>
        <pre>
          {JSON.stringify(integrationData, null, 2)}
        </pre>
      </Grid>
    </Grid>
  )
}

export default App;
