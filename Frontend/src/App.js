import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobleContext from './contextApi/GlobleContex';
import Home from './page/Home';
import About from './page/About';
import CategoryPage from './page/CategoryPage';
import Register from './page/Register';
import Login from './page/Login';
import ManagerRegister from './page/ManagerRegister';
import ManagerLogin from './page/ManagerLogin';
import ErrorPage from './page/ErrorPage';
import SingleHotelView from './page/SingleHotelView';
import Profile from './page/Profile';
import HomeMan from './Manager/HomeMan';
import Dashboard from './Manager/Dashboard';
import Rooms from './Manager/Rooms';
import Booking from './Manager/Booking';
import PaymentPage from './page/PaymentPage';
import Header from './Components/Header';
import HeaderUser from './Components/HeaderUser';
import HeaderManager from './Components/HeaderManager';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storedUserType = localStorage.getItem('UserType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    console.log(userType); // Logs the updated userType whenever it changes
  }, [userType]);

  

  return (
    <GlobleContext>
      <BrowserRouter>
        {/* Conditionally render Header based on userType */}
        {userType === 'user' && <HeaderUser />}
        {userType === 'manager' && <HeaderManager />}
        {userType !== 'user' && userType !== 'manager' && <Header />}
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ErrorPage" element={<ErrorPage />} />
          <Route path="/SingleHotelView/:id" element={<SingleHotelView />} />
          <Route path="/ManagerRegister" element={<ManagerRegister />} />
          <Route path="/ManagerLogin" element={<ManagerLogin />} />

          {/* Protected routes for users */}
          <Route 
            path="/CategoryPage" 
            element={<ProtectedRoute element={<CategoryPage />} allowedUserTypes={['user']} userType={userType} />} 
          />
          <Route 
            path="/Profile" 
            element={<ProtectedRoute element={<Profile />} allowedUserTypes={['user']} userType={userType} />} 
          />
          <Route 
            path="/PaymentPage" 
            element={<ProtectedRoute element={<PaymentPage />} allowedUserTypes={['user']} userType={userType} />} 
          />

          {/* Protected routes for managers */}
          <Route 
            path="/Dashboard" 
            element={<ProtectedRoute element={<Dashboard />} allowedUserTypes={['manager']} userType={userType} />} 
          />
          <Route 
            path="/Rooms" 
            element={<ProtectedRoute element={<Rooms />} allowedUserTypes={['manager']} userType={userType} />} 
          />
          <Route 
            path="/HomeMan" 
            element={<ProtectedRoute element={<HomeMan />} allowedUserTypes={['manager']} userType={userType} />} 
          />
          <Route 
            path="/Booking" 
            element={<ProtectedRoute element={<Booking />} allowedUserTypes={['manager']} userType={userType} />} 
          />


          {/* Catch-all route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </GlobleContext>
  );
}

export default App;
