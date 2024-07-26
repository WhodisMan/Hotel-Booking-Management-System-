import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button} from '@mui/material';
import "./Booking.css";

// Function to format dates to DD/MM/YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};



const getRoomCategoryName = (categoryNumber) => {
  switch (categoryNumber) {
    case 1:
      return 'Standard';
    case 2:
      return 'Deluxe';
    case 3:
      return 'Executive';
    case 4:
      return 'Presidential';
    default:
      return 'Unknown'; // Fallback for unexpected values
  }
};

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState('sno'); // Default sorting column
  const [sortDirection, setSortDirection] = useState('asc'); // Default sorting direction
  const navigate = useNavigate();

  // Function to fetch bookings data
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const pid = localStorage.getItem('pid');
      
      // Make the API call
      const response = await axios.post('http://localhost:5000/mngr/fetchRec', 
        { pid },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Transform the data into the expected format
      const bookingsData = response.data.result.map(booking => ({
        id: booking[0],
        userId: booking[2],
        roomCategory: getRoomCategoryName(booking[3]),
        bookingDate: formatDate(booking[4]),
        checkInDate: formatDate(booking[5]),
        checkOutDate: formatDate(booking[6]),
        guestCount: booking[7],
        price: parseFloat(booking[8]),
        status: booking[9] === 1 ? 'Cancelled' : 'Confirmed'
      }));

      // Update state with transformed data
      setBookings(bookingsData);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the bookings!", error);
      showLoginExpiredPopup();
      setLoading(false);
    }
  };

  // Fetch bookings when the component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to handle column header click
  const handleSort = (column) => {
    const newSortDirection = (sortColumn === column && sortDirection === 'asc') ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newSortDirection);
    
    const sortedBookings = [...bookings].sort((a, b) => {
      if (a[column] < b[column]) return newSortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setBookings(sortedBookings);
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  const showLoginExpiredPopup = () => {
    // Handle login expiration
    alert('Login expired. Redirecting to home page.');
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="container mx auto p-4">
      <Button
        component={Link}
        to="/HomeMan"
        variant="outlined"
        color="primary"
        style={{ marginBottom: '20px' }}
      >
        Back
      </Button>
      <h1 className="bookings-header">Bookings</h1>
      <table className="bookings-table">
        <thead>
          <tr>
            <th
              className={`bookings-th ${sortColumn === 'sno' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('sno')}
            >
              Sno
            </th>
            <th
              className={`bookings-th ${sortColumn === 'id' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('id')}
            >
              Booking ID
            </th>
            <th
              className={`bookings-th ${sortColumn === 'userId' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('userId')}
            >
              User ID
            </th>
            <th
              className={`bookings-th ${sortColumn === 'roomCategory' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('roomCategory')}
            >
              Category
            </th>
            <th
              className={`bookings-th ${sortColumn === 'bookingDate' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('bookingDate')}
            >
              Booking Date
            </th>
            <th
              className={`bookings-th ${sortColumn === 'checkInDate' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('checkInDate')}
            >
              Check-in Date
            </th>
            <th
              className={`bookings-th ${sortColumn === 'checkOutDate' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('checkOutDate')}
            >
              Check-out Date
            </th>
            <th
              className={`bookings-th ${sortColumn === 'guestCount' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('guestCount')}
            >
              Guest Count
            </th>
            <th
              className={`bookings-th ${sortColumn === 'price' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('price')}
            >
              Price
            </th>
            <th
              className={`bookings-th ${sortColumn === 'status' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
              onClick={() => handleSort('status')}
            >
              Status
            </th>
            <th className="bookings-th">Cancellation Prediction</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id} className="bookings-tr">
              <td className="bookings-td">{index + 1}</td>
              <td className="bookings-td">{booking.id}</td>
              <td className="bookings-td">{booking.userId}</td>
              <td className="bookings-td">{booking.roomCategory}</td>
              <td className="bookings-td">{booking.bookingDate}</td>
              <td className="bookings-td">{booking.checkInDate}</td>
              <td className="bookings-td">{booking.checkOutDate}</td>
              <td className="bookings-td">{booking.guestCount}</td>
              <td className="bookings-td">{booking.price}</td>
              <td className="bookings-td">{booking.status}</td>
              <td className="bookings-td"></td> {/* Placeholder for Cancellation Prediction */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booking;
