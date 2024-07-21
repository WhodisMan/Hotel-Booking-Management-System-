import React from 'react';
import { Container, Typography, Paper } from '@mui/material'; // Import MUI components
import HeaderUser from '../Components/HeaderUser';

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe123',
  addr: '123 Main Street, Cityville',
};

const Profile = () => {
  return (
    <div>
      <HeaderUser /> {/* Header component */}
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        {/* Center the content with maximum width */}
        <Paper elevation={3} className="profile-container" style={{ padding: '20px' }}>
          {/* Paper container for profile */}
          <Typography variant="h4" gutterBottom>
            Welcome, {user.name}!
          </Typography>
          <div className="profile-info" style={{ marginBottom: '20px' }}>
            {/* Profile information */}
            <Typography variant="body1" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Username: {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Address: {user.addr}
            </Typography>
            {/* Other user details */}
          </div>
          <div className="booking-history">
            {/* Display booking history */}
            {/* Display upcoming bookings */}
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;
