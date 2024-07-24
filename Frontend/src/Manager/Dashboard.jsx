
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import './Dashboard.css';
import axios from 'axios';
import { useStyles } from "@material-ui/core/styles";
import { useState, useEffect } from 'react';

function Dashboard() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [roomOccupancy, setRoomOccupancy] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        axios.get('/api/bookings')
          .then(response => setData(response.data))
          .catch(error => console.error('Error fetching bookings data:', error));
    
        axios.get('/api/roomOccupancy')
          .then(response => setRoomOccupancy(response.data))
          .catch(error => console.error('Error fetching room occupancy data:', error));
      }, []);

  return (
    <div className="dashboard-container">
      <Grid container spacing={3}>
        {/* Bookings Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper className="chart-container">
            <Typography variant="h6" className="chart-title">
              Monthly Bookings
            </Typography>
            <div className="bar-chart">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="bar"
                  style={{ height: `${item.bookings * 5}px` }}
                  title={`Month: ${item.name}, Bookings: ${item.bookings}`}
                ></div>
              ))}
            </div>
          </Paper>
        </Grid>

        {/* Revenue Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper className="chart-container">
            <Typography variant="h6" className="chart-title">
              Monthly Revenue
            </Typography>
            <div className="bar-chart">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="bar"
                  style={{ height: `${item.revenue / 100}px`, backgroundColor: '#8884d8' }}
                  title={`Month: ${item.name}, Revenue: $${item.revenue}`}
                ></div>
              ))}
            </div>
          </Paper>
        </Grid>

        {/* Room Occupancy Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper className="chart-container">
            <Typography variant="h6" className="chart-title">
              Room Occupancy
            </Typography>
            <div className="pie-chart">
              <div className="pie-labels">
                <div>Available: 60%</div>
                <div>Occupied: 40%</div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
