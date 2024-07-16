import React, { useState } from "react";
import { Button } from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-4 pt-8 container m-auto">
        <div className={`hidden md:flex space-x-4 ${isMenu ? "block" : "hidden"}`}>
          <Link to={"/"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              Home
            </Button>
          </Link>
          <Link to={"/CategoryPage"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              Category
            </Button>
          </Link>
          <Link to={"/About"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              About
            </Button>
          </Link>
        </div>
        <div className="w-20 md:w-30 mx-auto">
          <Link to={'/'}>
             <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to={"/Login"}>
            <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              Login
            </Button>
          </Link>
          <Link to={"/Register"}>
            <Button variant="contained" color="secondary" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
              Register
            </Button>
          </Link>
        </div>
        <div className="block md:hidden px-8 p-4" onClick={() => setIsMenu(!isMenu)}>
          <DensityMediumIcon />
        </div>
      </div>
      <div className="relative">
        <div className={`${isMenu ? "block" : "hidden"} bg-[#d27548] text-white md:hidden absolute rounded left-0 right-0`}>
          <ul className="list-none capitalize flex flex-col">
            <Link to={"/"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Home</li></Link>
            <Link to={"/Category"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Category</li></Link>
            <Link to={"/About"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>About</li></Link>
            <Link to={"/Login"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Login</li></Link>
            <Link to={"/Register"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Register</li></Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
