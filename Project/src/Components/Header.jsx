import React, { useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import DiamondIcon from '@mui/icons-material/Diamond';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";



const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { user, isAuthenticated } = useAuth0;

  return (
    <>
      <div className="flex justify-between items-center p-4 pt-8 container m-auto">
        <div className={`hidden md:block ${isMenu ? "block" : "hidden"}`}>
          <ul className="list-none capitalize flex">
          <Link to={"/"}><li className="px-4 relative cursor-pointer">Home</li></Link>
            <Link to={"/CategoryPage"}><li className="px-4 relative cursor-pointer">Category</li></Link>
            <Link to={"/Login"}><li className="px-4 relative cursor-pointer">Register</li></Link>
          </ul>
        </div>
        <div className="w-20 md:w-30">
          <Link to={'/'}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="hidden md:block">
          <button className="px-4 p-3 uppercase font-normal">
            <DiamondIcon />
            <span className="p-1">Reservation</span>
          </button>
          <button className="px-4 p-3 bg-[#d27548] uppercase text-white font-normal rounded">
            <Link to={'/CategoryPage'}>
              book now
            </Link>
          </button>
        </div>
        <div className="block md:hidden px-8 p-4" onClick={() => setIsMenu(!isMenu)}>
          <DensityMediumIcon />
        </div>
      </div>
      {
      isAuthenticated && (
      <div>
        <p>
          {user.name}
        </p>
      </div>
      )
    }
    </>
  );
};

export default Header;
