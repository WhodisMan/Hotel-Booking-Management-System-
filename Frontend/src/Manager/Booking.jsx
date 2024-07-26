import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CancellationPrediction from '../Manager/Cancellation';
import { HotelRoomDetail } from '../Detail/HotelDetail';
import './Booking.css';

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const[user,setUser] = useState([]);

  const isDatePassed = (dateString) => {
    const currentDate = new Date();
    const checkDate = new Date(dateString);
    return currentDate > checkDate; // Compare if current date is greater than check-in date
  };

  const getBookingData = (uid) => {
    const apiUrl = 'http://localhost:5000/bookings';
    const accessToken = localStorage.getItem('token');

    axios.post(apiUrl, { uid }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('POST request successful:', response.data);

      // Assuming response.data.result is the array of bookings data
      const newBookings = convertResponseToBookings(response.data.result);
      setBookings(newBookings);

      // Store the bookings data in local storage
      localStorage.setItem('bookingData', JSON.stringify(response.data.result));  
      
    })
    .catch(error => {
      console.error('Error making POST request:', error);
      // Handle error if needed
    });
  };

  const getUserData = (uid) => {
    const apiUrl = 'http://localhost:5000/userInfo';
    const accessToken = localStorage.getItem('token');

    axios.post(apiUrl, { uid }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('POST request successful:');
      setUser(response.data.res[0]);



      localStorage.setItem('userData', JSON.stringify(response.data.res));  
      
    })
    .catch(error => {
      console.error('Error making POST request:', error);
      // Handle error if needed
    });
  };

  const upcomingBookings = bookings.filter((booking) => !isDatePassed(booking.checkInDate));
  const previousBookings = bookings.filter((booking) => isDatePassed(booking.checkInDate));

  const convertResponseToBookings = (responseData) => {
    return responseData.map(item => ({
      id: item[0],
      hotelName: `${(HotelRoomDetail.find(room => room.pid === item[1])).name}`, // Adjust as per your requirement
      bookingDate: new Date(item[4]).toISOString().split('T')[0],
      checkInDate: new Date(item[5]).toISOString().split('T')[0], // Format to YYYY-MM-DD
      checkOutDate: new Date(item[6]).toISOString().split('T')[0], // Format to YYYY-MM-DD
      guestCount: item[7], // Assuming guest count is at index 7
      amount: `$${item[8]}`, // Assuming amount is at index 8
      // Example details
    }));
  };

  useEffect(() => {
    // Fetch bookings data from API
    axios.get('http://localhost:5000/bookings')
      .then(response => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Room Number</th>
            <th>Guest Name</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Cancellation Prediction</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.roomNumber}</td>
              <td>{booking.guestName}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td><CancellationPrediction booking={booking} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booking;
