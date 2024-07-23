import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentPage = () => {
    const [bookingDetails, setBookingDetails] = useState(null); // State to hold booking details
    const [selectedPropertyList, setSelectedPropertyList] = useState([]); // State to hold selected properties as list
    const [uid, setUid] = useState(null); // State to hold user ID

    useEffect(() => {
        // Fetch booking details from localStorage
        const storedBookingDetails = localStorage.getItem('bookingDetails');
        if (storedBookingDetails) {
            setBookingDetails(JSON.parse(storedBookingDetails));
        }
    
        // Fetch selectedProperty from localStorage
        const storedSelectedProperty = localStorage.getItem('selectedProperty');
        if (storedSelectedProperty) {
            // Split the string into an array using ', ' as the delimiter
            const propertyList = storedSelectedProperty.split(',');
            setSelectedPropertyList(propertyList);
        }

        // Fetch user ID from server on component mount
        fetchUid();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const fetchUid = () => {
        // Example endpoint URL; replace with your actual endpoint
        const apiUrl = 'http://localhost:5000/protected';

        // Retrieve access token from localStorage
        const accessToken = localStorage.getItem('token');

        // Make sure access token exists before making the API call
        if (!accessToken) {
            console.error('Access token not found in localStorage');
            return;
        }

        // Make GET request using Axios to retrieve uid
        axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('User ID retrieved:', response.data.logged_in_as);
            setUid(response.data.logged_in_as);
        })
        .catch(error => {
            console.error('Error fetching user ID:', error);
            // Handle error appropriately
        });
    }

    const handleConfirmBooking = () => {
        // Example endpoint URL; replace with your actual endpoint
        const apiUrl = 'http://localhost:5000/book';
        
        // Example payload structure; adjust according to your API's requirements
        const payload = {
            pid: selectedPropertyList[0],  // Example: Property ID from selectedPropertyList
            uid: uid,                      // Use retrieved uid
            r_cat: bookingDetails.roomType, // Example: Room category from selectedPropertyList
            checkin: bookingDetails.checkInDate,    // Example: Check-in date from bookingDetails
            checkout: bookingDetails.checkOutDate,  // Example: Check-out date from bookingDetails
            g_count: bookingDetails.numGuests,      // Example: Number of guests from bookingDetails
            amount: selectedPropertyList[7 + bookingDetails.roomType] // Example: Amount from selectedPropertyList
        };

        // Retrieve access token from localStorage
        const accessToken = localStorage.getItem('token');

        // Make sure access token exists before making the API call
        if (!accessToken) {
            console.error('Access token not found in localStorage');
            return;
        }

        // Make POST request using Axios
        axios.post(apiUrl, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Booking successful:', response.data);
            // Redirect or show success message here
        })
        .catch(error => {
            console.error('Error booking:', error);
            // Handle error appropriately
        });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Booking Details</h2>
                            {bookingDetails ? (
                                <>
                                    <p><strong>Hotel:</strong> {selectedPropertyList[1]}</p>
                                    <p><strong>Type:</strong> {selectedPropertyList[2]}</p>
                                    <p><strong>City:</strong> {selectedPropertyList[3]}</p>
                                    <p><strong>Room Type:</strong> {bookingDetails.roomName}</p>
                                    <p><strong>Price:</strong> {selectedPropertyList[7 + bookingDetails.roomType]}</p>
                                    <p><strong>Check-in Date:</strong> {bookingDetails.checkInDate}</p>
                                    <p><strong>Check-out Date:</strong> {bookingDetails.checkOutDate}</p>
                                    <p><strong>Number of Guests:</strong> {bookingDetails.numGuests}</p>
                                    <p><strong>Number of Rooms:</strong> {Math.ceil(bookingDetails.numGuests / 4)}</p>
                                    <p><strong>Total Price:</strong> {selectedPropertyList[7 + bookingDetails.roomType] * Math.ceil(bookingDetails.numGuests / 4)}</p>
                                    
                                    <button onClick={handleConfirmBooking} className="btn btn-primary mt-3">Confirm Booking</button>
                                </>
                            ) : (
                                <p>Loading booking details...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
