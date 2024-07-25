import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'; // Import axios

// Sample data for RoomDetail and HotelDetail
import { RoomDetail } from "../Detail/RoomDetail";
import { HotelDetail } from '../Detail/HotelDetail';

const Rooms = () => {
  const [hotelDetails, setHotelDetails] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editCount, setEditCount] = useState(0);
  const [editCost, setEditCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedHotelDetails = JSON.parse(localStorage.getItem("HotelDetails")) || [];
        setHotelDetails(storedHotelDetails);

        const storedPID = localStorage.getItem('pid');
        if (storedPID) {
          fetchHotelDetails(storedHotelDetails[0].city, storedPID); // Fetch details based on the first hotel in storedHotelDetails
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setHotelDetails([]); // Handle error state if needed
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Function to fetch hotel details by city name and PID
  const fetchHotelDetails = async (cityname, pid) => {
    try {
      const response = await axios.post('http://localhost:5000/city', {
        city: cityname
      });

      const filteredProperties = response.data.properties.filter((property) => property[0] === parseInt(pid));

      if (filteredProperties.length > 0) {
        const updatedHotelDetails = filteredProperties.map(property => ({
          id: property[0],
          name: property[1],
          city: property[2],
          description: property[3],
          category: property[4]
        }));

        updateHotelDetailCounts(filteredProperties[0]);
      }
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }
  };

  // Function to update HotelDetail counts and costs
  const updateHotelDetailCounts = (property) => {
    HotelDetail.rt1_count = property[4];
    HotelDetail.rt2_count = property[5];
    HotelDetail.rt3_count = property[6];
    HotelDetail.rt4_count = property[7];

    HotelDetail.rt1_cost = property[8];
    HotelDetail.rt2_cost = property[9];
    HotelDetail.rt3_cost = property[10];
    HotelDetail.rt4_cost = property[11];
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
    setEditCount(HotelDetail[`rt${room.type}_count`] || 0);
    setEditCost(HotelDetail[`rt${room.type}_cost`] || 0);
    setOpenDialog(true); // Open the dialog
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle count change
  const handleCountChange = (event) => {
    setEditCount(parseInt(event.target.value));
  };

  // Function to handle cost change
  const handleCostChange = (event) => {
    setEditCost(parseFloat(event.target.value));
  };

  // Function to handle submit
// Function to handle submit
const handleSubmit = async () => {
  const accessToken = localStorage.getItem('token');
  const PID = localStorage.getItem('pid');
  if (selectedRoom) {
    try {
      // Update room count
      const countResponse = await axios.post('http://localhost:5000/mngr/roomUpdate', {
        pid: String(PID), // Replace with actual PID
        cat: String(selectedRoom.type), // Assuming room type corresponds to 'cat' in API
        num: String(editCount) // Assuming editCount is the updated count
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Replace with actual authorization token
          'Content-Type': 'application/json'
        }
      });

      console.log('Room update response:', countResponse.data);

      // Update room cost
      const costResponse = await axios.post('http://localhost:5000/mngr/priceUpdate', {
        pid: String(PID), // Replace with actual PID
        cat: String(selectedRoom.type), // Assuming room type corresponds to 'cat' in API
        price: String(editCost) // Assuming editCost is the updated cost
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Replace with actual authorization token
          'Content-Type': 'application/json'
        }
      });

      console.log('Cost update response:', costResponse.data);

      // Update local state or any other necessary state management
      HotelDetail[`rt${selectedRoom.type}_count`] = editCount;
      HotelDetail[`rt${selectedRoom.type}_cost`] = editCost;

      setOpenDialog(false); // Close the dialog after submission
    } catch (error) {
      console.error('Error updating room:', error);
      // Handle error appropriately
    }
  }
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
                <p className="text-sm">Cost: ${HotelDetail[`rt${room.type}_cost`] || '-'}</p>
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
              {/* Editable fields for count and cost */}
              <TextField
                margin="dense"
                id="count"
                label="Count"
                type="number"
                fullWidth
                value={editCount}
                onChange={handleCountChange}
              />
              <TextField
                margin="dense"
                id="cost"
                label="Cost"
                type="number"
                fullWidth
                value={editCost}
                onChange={handleCostChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Rooms;
