import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'; // Import axios

// Sample data for RoomDetail and HotelDetail
import { RoomDetail } from "../Detail/RoomDetail";
import { HotelDetail } from '../Detail/HotelDetail';

const Rooms = () => {
  const [hotelDetails, setHotelDetails] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [PID, setPID] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPID = localStorage.getItem('pid');
        if (storedPID) {
          setPID(storedPID);
        }
        const storedHotelDetails = JSON.parse(localStorage.getItem("HotelDetails")) || [];
        setHotelDetails(storedHotelDetails);
        console.log(hotelDetails)
        fetchHotelDetails(storedHotelDetails[0].city); // Fetch for the first hotel in the array

      } catch (error) {
        console.error("Error fetching data:", error);
        setHotelDetails([]); // Handle error state if needed
      }
    };

    fetchData(); // Fetch hotel details from localStorage
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Function to fetch hotel details by city name
  const fetchHotelDetails = async (cityname) => {
    try {
      const response = await axios.post('http://localhost:5000/city', {
        city: cityname
      });

      const filteredProperties = response.data.properties.filter((property) => property[0] === parseInt(PID));

      if (filteredProperties.length > 0) {
        // Update hotelDetails state
       // Assuming you want to update state with filteredProperties

        // Update HotelDetail variables (avoid direct mutation)
        HotelDetail.rt1_count = filteredProperties[0][4];
        HotelDetail.rt2_count = filteredProperties[0][5];
        HotelDetail.rt3_count = filteredProperties[0][6];
        HotelDetail.rt4_count = filteredProperties[0][7];

        HotelDetail.rt1_cost = filteredProperties[0][8];
        HotelDetail.rt2_cost = filteredProperties[0][9];
        HotelDetail.rt3_cost = filteredProperties[0][10];
        HotelDetail.rt4_cost = filteredProperties[0][11];
      }
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }
  };

  // Style the Paper component for hotel details
  const RoundedBox = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.divider}`,
  }));

  // Style for Room Cards
  const RoomCard = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
    "&:hover": {
      boxShadow: theme.shadows[4],
    },
  }));

  // Function to handle click on room card
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true); // Open the dialog
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {/* Display hotel details */}
      <div className="container mx-auto p-4">
        <div className="">
          {hotelDetails.map(detail => (
            <RoundedBox key={detail.id}>
              <Typography variant="h5">{detail.name}</Typography>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>{detail.city}</Typography>
              <Typography variant="body1">{detail.description}</Typography>
              <Typography variant="body1">{detail.category}</Typography>
            </RoundedBox>
          ))}
        </div>
      </div>

      {/* Room Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {RoomDetail.map(room => (
          <RoomCard key={room.type} onClick={() => handleRoomClick(room)}>
            <h2 className="text-lg font-semibold">{room.name}</h2>
            <p className="text-sm text-gray-500">Room Type: {room.type}</p>
            {/* Display room count and cost from HotelDetail */}
            {hotelDetails.length > 0 && (
              <>
                <p className="text-sm">Count: {HotelDetail[`rt${room.type}_count`]}</p>
                <p className="text-sm">Cost: ${HotelDetail[`rt${room.type}_cost`]} per night</p>
              </>
            )}
          </RoomCard>
        ))}
      </div>

      {/* Room Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedRoom && (
          <>
            <DialogTitle>{selectedRoom.name}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1">{selectedRoom.description}</Typography>
              <Typography variant="body1" style={{ marginTop: '8px', marginBottom: '8px' }}>Ideal for: {selectedRoom.idealfor}</Typography>
              <Typography variant="body1">Count: {HotelDetail[`rt${selectedRoom.type}_count`]}</Typography>
              <Typography variant="body1">Cost: ${HotelDetail[`rt${selectedRoom.type}_cost`]} per night</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Rooms;
