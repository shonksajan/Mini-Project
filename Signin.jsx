import React, { useState } from 'react';
import './signin.css';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent the form from submitting

    // Basic form validation
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.firstName || !formData.firstName.trim()) {
      valid = false;
      newErrors.firstName = 'First name is required';
    } else {
      newErrors.firstName = '';
    }

    if (!formData.lastName || !formData.lastName.trim()) {
      valid = false;
      newErrors.lastName = 'Last name is required';
    } else {
      newErrors.lastName = '';
    }

    if (!formData.email || !formData.email.trim()) {
      valid = false;
      newErrors.email = 'Email is required';
    } else {
      newErrors.email = '';
    }

    if (!formData.password || !formData.password.trim()) {
      valid = false;
      newErrors.password = 'Password is required';
    } else {
      newErrors.password = '';
    }

    if (formData.password !== formData.confirmPassword) {
      valid = false;
      newErrors.confirmPassword = 'Passwords do not match';
    } else {
      newErrors.confirmPassword = '';
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Handle sign-in logic here (e.g., API request)

    // Clear form data on successful sign-in
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className='main'>
        <h1><center>Plan your trip with Us</center></h1>
      <h2><center>Sign In</center></h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <span className="error">{errors.firstName}</span>
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <span className="error">{errors.lastName}</span>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="error">{errors.email}</span>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <span className="error">{errors.password}</span>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <span className="error">{errors.confirmPassword}</span>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
