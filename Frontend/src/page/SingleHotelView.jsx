import React, { useEffect, useState } from "react";
import WrapperContainer from "../Components/WrapperContainer";
import { useParams, Link } from "react-router-dom";
import { HotelRoomDetail } from "../Detail/HotelDetail";
import { RoomDetail } from "../Detail/RoomDetail";
import { ArrowBack } from "@mui/icons-material"; // Importing ArrowBack icon from Material UI

const SingleHotelView = () => {
  const { id } = useParams();
  const [hotelDetail, setHotelDetail] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulating fetching hotel details from a data source
    const fetchHotelDetail = async () => {
      try {
        // Filter hotel detail by id from HotelRoomDetail array
        const hotelDetailData = HotelRoomDetail.find(detail => detail.id === +id);
        setHotelDetail(hotelDetailData);
      } catch (error) {
        console.error("Error fetching hotel detail:", error);
        setHotelDetail(null); // Handle error state if needed
      }
    };

    fetchHotelDetail();
  }, [id]);

  if (!hotelDetail) {
    return null; // You can return a loading indicator or handle the loading state
  }

  const {
    name,
    city,
    price,
    images,
    description: hotelDescription,
    extras,
  } = hotelDetail;

  const handleRoomTypeClick = (roomType) => {
    const selectedRoom = RoomDetail.find(room => room.type === roomType);
    setSelectedRoomType(selectedRoom);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(""); // Reset error message
  };

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const handleNumGuestsChange = (e) => {
    setNumGuests(parseInt(e.target.value));
  };

  const handleConfirmBooking = () => {
    // Validation checks
    if (!checkInDate || !checkOutDate || !numGuests) {
      setError("Please fill in all fields.");
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    if (numGuests < 1) {
      setError("Number of guests must be greater than or equal to 1.");
      return;
    }

    // Perform booking confirmation logic here
    console.log("Booking confirmed:", {
      roomType: selectedRoomType,
      checkInDate,
      checkOutDate,
      numGuests,
    });

    closeModal();
  };

  return (
    <div>
      <div className="bg-cover bg-center h-screen relative" style={{ backgroundImage: `url(${images})` }}>
        <WrapperContainer>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute">
            <div className="relative container text-white capitalize">
              <div className="flex items-center py-8">
                {/* Back button with "Back" text and ArrowBack icon */}
                <Link to="/CategoryPage" className="absolute left-4 top-4 flex items-center text-white text-lg font-semibold no-underline">
                  <ArrowBack style={{ fontSize: 30 }} />
                  <span className="ml-2">Back</span>
                </Link>
                {/* Heading */}
                <div className="p-4 pl-12">
                  <h1 className="text-7xl font-bold mb-2">{name}</h1>
                  <p className="font-bold text-3xl">{city}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-4xl">{hotelDescription}</p>
                <ul className="pl-6 text-lg">
                  {extras.map((detail, i) => (
                    <li className="list-disc" key={i}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </WrapperContainer>
      </div>

      {/* Book Now section */}
      <section className="bg-gray-100 py-12">
        <WrapperContainer>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Book Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {RoomDetail.map((room, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:shadow-lg ${
                    selectedRoomType && selectedRoomType.type === room.type ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleRoomTypeClick(room.type)}
                >
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <p className="text-sm">{room.idealfor}</p>
                </div>
              ))}
            </div>
          </div>
        </WrapperContainer>
      </section>

      {/* Modal for booking details */}
      {isModalOpen && selectedRoomType && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedRoomType.name} - Book Now</h2>
            <p className="text-lg mb-4">{selectedRoomType.description}</p>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Check-In Date:</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  value={checkInDate}
                  onChange={handleCheckInChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Check-Out Date:</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  value={checkOutDate}
                  onChange={handleCheckOutChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Number of Guests:</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  value={numGuests}
                  onChange={handleNumGuestsChange}
                  min={1}
                  max={10}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                  onClick={handleConfirmBooking}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleHotelView;
