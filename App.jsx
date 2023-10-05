import React, { useState } from 'react';
import Login from './Components/Login/Login';
import Signin from './Components/Signin/Signin';
import TermsndConditions from './Components/TermsndConditions/TermsndConditions';
import Booking from './Components/Booking/Booking';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/termsndconditions" element={<TermsndConditions />} />
        <Route path="/booking" element={<Booking/>} />
        {/* Add more routes as needed */}
      </Routes>
      </Router>
    </div>
  );
}

export default App;
