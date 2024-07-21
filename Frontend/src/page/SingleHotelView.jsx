import React, { useEffect, useState } from "react";
import WrapperContainer from "../Components/WrapperContainer";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import { HotelRoomDetail } from "../Detail/HotelDetail"; // Importing HotelRoomDetail
import { RoomDetail } from "../Detail/RoomDetail"; // Importing RoomDetail

const SingleHotelView = () => {
  const { id } = useParams();
  const [hotelDetail, setHotelDetail] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

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
    description,
    extras,
  } = hotelDetail;

  const handleRoomTypeClick = (roomType) => {
    setSelectedRoomType(roomType);
  };

  return (
    <div>
      <nav>
        <Header />
      </nav>
      <div className="bg-cover bg-center h-screen relative" style={{ backgroundImage: `url(${images})` }}>
        <WrapperContainer>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className=" absolute">
            <div className="relative container text-white capitalize">
              <div className="flex justify-between items-center py-8">
                <div className="p-4">
                  <h1 className="text-7xl font-bold mb-2">{name}</h1>
                  <p className="font-bold text-3xl">{city}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-4xl">{description}</p>
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

      {/* Cards for each room type */}
      <section className="bg-gray-100 py-12">
        <WrapperContainer>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Room Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {RoomDetail.map((room, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out ${
                    selectedRoomType === room.type ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleRoomTypeClick(room.type)}
                >
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <p>{room.description}</p>
                  <p className="font-bold mt-2">{room.idealfor}</p>
                </div>
              ))}
            </div>
          </div>
        </WrapperContainer>
      </section>
    </div>
  );
};

export default SingleHotelView;
