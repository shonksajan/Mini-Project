import { useState } from 'react'
/* src/index.css */
import 'bootstrap/dist/css/bootstrap.min.css';




import './App.css'
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import DriverProfile from './pages/DriverProfile';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import CarList from './pages/CarList/Index';
import Booking from './components/Booking';
import BookingHist from './components/BookingHist';
import Rating from './components/Rating';
import DriverDashboard from './pages/DriverDashboard/DriverDashboard';
function App() {
  

  return (
    <>
    <Header/>
     <Routes>
      
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element ={<Login/>}/>
      
      <Route path="/driverprofile" element={<DriverProfile/>}/>
      <Route path="/taxicars" element={<CarList/>}/>
      <Route path="/driver" element={<DriverDashboard/>}/>


     </Routes>
      <Footer/>
    </>
  )
}

export default App
