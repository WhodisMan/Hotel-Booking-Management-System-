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
import PaymentPage from './page/PaymentPage';
import Header from './Components/Header';
import HeaderUser from './Components/HeaderUser';
import HeaderManager from './Components/HeaderManager'; // Import HeaderManager component
import Footer from './Components/Footer';

function App() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storedUserType = localStorage.getItem('UserType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <GlobleContext>
      <BrowserRouter>
        {/* Conditionally render Header based on userType */}
        {userType === 'user' && <HeaderUser />}
        {userType === 'manager' && <HeaderManager />}
        {userType !== 'user' && userType !== 'manager' && <Header />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/CategoryPage" element={<CategoryPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ManagerRegister" element={<ManagerRegister />} />
          <Route path="/ManagerLogin" element={<ManagerLogin />} />
          <Route path="/HomeMan" element={<HomeMan />} />
          <Route path="/SingleHotelView/:id" element={<SingleHotelView />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/PaymentPage" element={<PaymentPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </GlobleContext>
  );
}

export default App;
