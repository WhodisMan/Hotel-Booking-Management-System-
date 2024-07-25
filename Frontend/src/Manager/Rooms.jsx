import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RoomDetail } from "../Detail/RoomDetail";

const Rooms = () => {

  const [hotelDetails, setHotelDetails] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // State to hold the selected room
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hotel details from localStorage
    const storedHotelDetails = JSON.parse(localStorage.getItem("HotelDetails")) || [];
    setHotelDetails(storedHotelDetails);
  }, []);

  // Style the Paper component for hotel details
  const RoundedBox = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.divider}`, // Set border color to black

  }));

  // Style for Room Cards
  const RoomCard = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
    "&:hover": {
      boxShadow: theme.shadows[4], // Add shadow on hover
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
              {/* Add more details as needed */}
            </RoundedBox>
          ))}
        </div>
      </div>

      {/* Room Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {RoomDetail.map(room => (
          <RoomCard key={room.type} onClick={() => handleRoomClick(room)}>
            <h2 className="text-lg font-semibold">{room.name}</h2>
            <p className="text-sm text-gray-500">Room Type: {room.name}</p>
            {/* Add additional details or actions if necessary */}
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
              <Typography variant="body1" style={{ marginTop: '8px' }}>Ideal for: {selectedRoom.idealfor}</Typography>
              {/* Add more room details as needed */}
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
