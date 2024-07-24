import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

// Styled components for Paper and Typography
const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function Dashboard() {
  const [data, setData] = useState([]);
  const [roomOccupancy, setRoomOccupancy] = useState([]);
  const [pid, setPid] = useState(null); // State to store the PID



  return (
    <div className="dashboard-container">
      {/* Back Button */}
      <Button
        component={Link}
        to="/HomeMan"
        variant="outlined"
        color="primary"
        style={{ marginBottom: '20px' }}
      >
        Back
      </Button>

      <Grid container spacing={3}>
        {/* Bookings Bar Chart */}
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">
              Monthly Bookings
            </ChartTitle>
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
          </ChartContainer>
        </Grid>

        {/* Revenue Bar Chart */}
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">
              Monthly Revenue
            </ChartTitle>
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
          </ChartContainer>
        </Grid>

        {/* Room Occupancy Pie Chart */}
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">
              Room Occupancy
            </ChartTitle>
            <div className="pie-chart">
              <div className="pie-labels">
                <div>Available: 60%</div>
                <div>Occupied: 40%</div>
              </div>
            </div>
          </ChartContainer>
        </Grid>

        
      </Grid>
    </div>
  );
}

export default Dashboard;
