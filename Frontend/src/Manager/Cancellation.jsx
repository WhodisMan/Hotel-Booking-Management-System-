
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

function CancellationPrediction() {
  const classes = useStyles();
  const [features, setFeatures] = useState({
    feature1: '',
    feature2: '',
    feature3: '',
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/predict', [features])
      .then(response => {
        setPrediction(response.data.prediction[0]);
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Cancellation Prediction
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="feature1"
          label="Feature 1"
          variant="outlined"
          fullWidth
          className={classes.input}
          value={features.feature1}
          onChange={handleChange}
        />
        <TextField
          name="feature2"
          label="Feature 2"
          variant="outlined"
          fullWidth
          className={classes.input}
          value={features.feature2}
          onChange={handleChange}
        />
        <TextField
          name="feature3"
          label="Feature 3"
          variant="outlined"
          fullWidth
          className={classes.input}
          value={features.feature3}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Predict
        </Button>
      </form>
      {prediction !== null && (
        <Typography variant="h6" gutterBottom>
          Prediction: {prediction === 1 ? 'Cancellation' : 'No Cancellation'}
        </Typography>
      )}
    </Paper>
  );
}

export default CancellationPrediction;
