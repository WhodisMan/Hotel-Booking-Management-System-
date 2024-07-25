import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip ,BarChart, Bar, XAxis, YAxis} from 'recharts';
import './Dashboard.css';

// Styled components for Paper and Typography
const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center align contents
}));

const RoundedBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.divider}`,
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));



function Dashboard() {
  const [data, setData] = useState([]);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [roomCategories, setRoomCategories] = useState([0, 0, 0, 0]); // Initialize as per room categories 1 to 4
  const [availableRooms, setAvailableRooms] = useState([]);
  const [totalRooms, setTotalRooms] = useState([]);

  const combinedData = availableRooms.map((entry, index) => ({
    category: entry.category,
    availableRooms: entry.count,
    bookedRooms: (totalRooms[index].count - entry.count)
  }));


  useEffect(() => {
    // Fetch hotel details from localStorage
    const storedHotelDetails = JSON.parse(localStorage.getItem("HotelDetails")) || [];
    setHotelDetails(storedHotelDetails);

    // Fetch booking records
    const fetchBookingRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = 'http://localhost:5000/mngr/fetchRec';

        const response = await axios.post(apiUrl, {
          pid: localStorage.getItem('pid') // Replace with the actual PID you want to fetch bookings for
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.result) {
          const bookings = response.data.result.map(record => ({
            id: record[0],
            category: record[3],
            bookingDate: record[4],
            checkInDate: record[5],
            checkInDate: record[6],
            guestCount: record[7],
            amount: record[8],
            cancelled: record[9]
          }));

          // Calculate room counts per category
          const categoryCounts = [0, 0, 0, 0];
          bookings.forEach(booking => {
            if (booking.category >= 1 && booking.category <= 4) {
              categoryCounts[booking.category - 1]++;
            }
          });

          setRoomCategories(categoryCounts);
          setData(bookings);
        } else {
          console.error('Invalid API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching booking records:', error);
      }
    };

    const fetchHotelDetails = async (cityname, pid) => {
      try {
        const response = await axios.post('http://localhost:5000/city', {
          city: cityname
        });
  
        const filteredProperties = response.data.properties.filter((property) => property[0] === parseInt(pid));
        console.log(filteredProperties);
  
        if (filteredProperties.length > 0) {

          setTotalRooms([
            {category:1,count:filteredProperties[0][4]},
            {category:2,count:filteredProperties[0][5]},
            {category:3,count:filteredProperties[0][6]},
            {category:4,count:filteredProperties[0][7]},
          ]);
  
          
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    const fetchHotelInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = 'http://localhost:5000/hotel';

        const response = await axios.post(apiUrl, {
          hotel_id: localStorage.getItem('pid') // Replace with the actual hotel ID you want to fetch info for
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.info) {
          // Extract available rooms data
          const roomsData = response.data.info.map(item => ({
            category: item[0],
            count: item[1]
          }));
          setAvailableRooms(roomsData);

          // Extract reviews data
         
        } else {
          console.error('Invalid API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching hotel info:', error);
      }
    };

    
    fetchBookingRecords();
    fetchHotelInfo();
    const storedHotelDetail = JSON.parse(localStorage.getItem("HotelDetails")) || [];
    console.log(storedHotelDetail[0].city)
    fetchHotelDetails(storedHotelDetail[0].city,localStorage.getItem('pid'));
  }, []);

  // Prepare data for pie chart
  const pieChartData1 = roomCategories.map((count, index) => ({
    name: `Category ${index + 1}`,
    value: count
  }));

  const pieChartData2 = [
    { name: 'Available Rooms', value: combinedData.reduce((acc, entry) => acc + entry.availableRooms, 0) },
    { name: 'Booked Rooms', value: combinedData.reduce((acc, entry) => acc + entry.bookedRooms, 0) }
  ];

  // Colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

      {/* Hotel Details */}
      <div className="container mx-auto p-4">
        <div className="">
          {hotelDetails && hotelDetails.map(detail => (
            <RoundedBox key={detail.id}>
              <Typography variant="h5">{detail.name}</Typography>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>{detail.city}</Typography>
              <Typography variant="body1">{detail.description}</Typography>
              <Typography variant="body1">{detail.category}</Typography>
            </RoundedBox>
          ))}
        </div>
      </div>

      <Grid container spacing={3}>
        {/* Bookings Bar Chart */}
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">
              Monthly Bookings
            </ChartTitle>
            <div className="bar-chart">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="bar"
                  style={{ height: `${item.amount / 1000}px` }} // Adjust height as per your data
                  title={`Booking ID: ${item.id}, Amount: $${item.amount}`}
                ></div>
              ))}
            </div>
            <Typography variant="body2">Month</Typography>
          </ChartContainer>
        </Grid>

        {/* Revenue Bar Chart */}
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">
              Monthly Revenue
            </ChartTitle>
            <div className="bar-chart">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="bar"
                  style={{ height: `${item.amount / 100}px`, backgroundColor: '#8884d8' }}
                  title={`Booking ID: ${item.id}, Revenue: $${item.amount}`}
                ></div>
              ))}
            </div>
            <Typography variant="body2">Month</Typography>
          </ChartContainer>
        </Grid>

        {/* Room Category Pie Chart */}
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">
              Room Category Statistics
            </ChartTitle>
            <PieChart width={300} height={300} style={{ marginBottom: '20px' }}>
              <Pie
                data={pieChartData1}
                cx={150} // Center of the pie chart
                cy={100} // Center of the pie chart
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">
              Room Occupancy 
            </ChartTitle>
            <PieChart width={300} height={300} style={{ marginBottom: '20px' }}>
              <Pie
                data={pieChartData2}
                cx={150} // Center of the pie chart
                cy={100} // Center of the pie chart
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} md={6}>
      <BarChart width={600} height={400} data={combinedData}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bookedRooms" stackId="stack" fill="#82ca9d" name="Booked Rooms" />
        <Bar dataKey="availableRooms" stackId="stack" fill="#8884d8" name="Available Rooms" />
      </BarChart>
    </Grid>


        
      </Grid>
    </div>
  );
}

export default Dashboard;
