import { useState } from 'react'
/* src/index.css */
import 'bootstrap/dist/css/bootstrap.min.css';




import './App.css'
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import DriverHome from './pages/DriverHome';

function App() {
  

  return (
    <>
     <Routes>
      <Route path="/register" element={<Register/>}/>

      <Route path="/home" element={<DriverHome/>}/>
     </Routes>
      
    </>
  )
}

export default App
