import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import EditDriverProfile from './pages/EditDriverProfile';




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
import DownloadFile from './pages/DownloadFile/DownloadFile';
function App() {
  

  return (
    <>
    <Header/>
     <Routes>
      
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element ={<Login/>}/>
      
      <Route path="/driverprofile/:id" element={<DriverProfile/>}/>
      <Route path="/taxicars" element={<CarList/>}/>
      <Route path="/driver" element={<DriverDashboard/>}/>
      <Route path="/editdriver" element={<EditDriverProfile/>}/>

      <Route path='/download/:type' element={<DownloadFile/>}/>
     </Routes>
      <Footer/>
    </>
  )
}

export default App
