import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function HomeMan() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Welcome to ATLIQ
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Dashboard</Typography>
            <Typography variant="body2">
              View your hotel’s overall performance metrics.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={Link}
              to="/Dashboard"
            >
              Go to Dashboard
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Rooms</Typography>
            <Typography variant="body2">
              Manage room availability and details.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={Link}
              to="/rooms"
            >
              Manage Rooms
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Bookings</Typography>
            <Typography variant="body2">
              View and manage current bookings.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={Link}
              to="/bookings"
            >
              Manage Bookings
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeMan;