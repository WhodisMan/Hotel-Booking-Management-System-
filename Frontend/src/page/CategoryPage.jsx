import React, { useContext } from 'react';
import { HotelDetail, HotelRoomDetail } from '../Detail/HotelDetail';
import { Card } from '../Components/Slider';
import WrapperContainer from '../Components/WrapperContainer';
import SearchRooms from '../Components/SearchRooms';
import { Link } from 'react-router-dom';
import Contex from '../contextApi/Contex';
import Header from "../Components/Header";

const CategoryPage = () => {

  // const { Room, Guest, PriceRange } = useContext(Contex);

   let detail = HotelRoomDetail;
  // if (Room !== '' && Room !== 'All') {
  //   detail = HotelRoomDetail.filter(item => item.type === Room);
  // }
  // if (Guest !== '') {
  //   detail = detail.filter(item => item.capacity === Guest);
  // }
  // if (PriceRange !== '') {
  //   detail = detail.filter(item => item.price === PriceRange);
  // }

  return (
    <div className="bg-[#d27548]">
      <nav><Header /></nav>
      <WrapperContainer>
    
        <div id="showcase-Section" className="flex flex-wrap flex-col md:flex-row justify-start items-center pt-8 gap-4">
          {detail.map(detail => (
            <Link to={`/SingleHotelView/${detail.id}`} key={detail.id}><Card detail={detail} /></Link>
          ))}
        </div>
      </WrapperContainer>
    </div>
  );
}

export default CategoryPage;
