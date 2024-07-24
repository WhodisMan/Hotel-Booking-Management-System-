import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ButtonContainer = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const PageContainer = styled('div')({
  margin: '20px', // Adjust as needed
});

const HomeMan = () => {
  const [pid, setPid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const storedPid = localStorage.getItem('pid'); // Get pid from localStorage

    if (!pid && token && !storedPid) { // Check if pid is not set and there's no stored pid in localStorage
      axios.get('http://localhost:5000/protected', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        console.log('PID:', response.data);
        const receivedPid = response.data['logged_in_as'];
        setPid(receivedPid); // Set PID state
        localStorage.setItem('pid', receivedPid); // Store PID in localStorage
      })
      .catch(error => console.error('Error fetching PID:', error));
    } else {
      // If pid is already set or stored in localStorage, use it
      setPid(storedPid);
    }
  }, [pid]); // Add pid to the dependency array

  return (
    <div className="container m-auto"> {/* Ensure this container class matches with your header */}
      <PageContainer>
        <Typography variant="h4" gutterBottom>
          Welcome to ATLIQ
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <PaperContainer>
              <Typography variant="h6">Dashboard</Typography>
              <Typography variant="body2">
                View your hotel’s overall performance metrics.
              </Typography>
              <ButtonContainer
                variant="contained"
                color="primary"
                component={Link}
                to="/Dashboard"
              >
                Go to Dashboard
              </ButtonContainer>
            </PaperContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PaperContainer>
              <Typography variant="h6">Rooms</Typography>
              <Typography variant="body2">
                Manage room availability and details.
              </Typography>
              <ButtonContainer
                variant="contained"
                color="primary"
                component={Link}
                to="/rooms"
              >
                Manage Rooms
              </ButtonContainer>
            </PaperContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PaperContainer>
              <Typography variant="h6">Bookings</Typography>
              <Typography variant="body2">
                View and manage current bookings.
              </Typography>
              <ButtonContainer
                variant="contained"
                color="primary"
                component={Link}
                to="/bookings"
              >
                Manage Bookings
              </ButtonContainer>
            </PaperContainer>
          </Grid>
        </Grid>
      </PageContainer>
    </div>
  );
};

export default HomeMan;
