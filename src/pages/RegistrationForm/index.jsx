// import './registerform.css';
// import React, { useState } from 'react';
// import {  useNavigate } from 'react-router-dom';
// function RegistrationForm() {
//   const nav = useNavigate();

//   const [phoneError, setPhoneError] = useState('');
//   const [formData, setFormData] = useState({
//     // Driver Details
//     firstName: '',
//     lastName: '',
//     phone: '',
//     address: '',
//     email: '',

//     // Car Details
//     carName: '',
//     carModel: '',
//     seats: '',
//     licensePlate: '',
//     chassisNumber: '',

//     // Uploaded Documents
//     insurance: null,
//     pollutionCertificate: null,
//     drivingLicense: null,

//     // Bank Account Details
//     accountNumber: '',
//     accountName: '',
//     ifscCode: '',
//   });
//   const [emailError, setEmailError] = useState('');
//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (type === 'email') {
//       // Email validation using a regular expression
//       const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//       if (!emailRegex.test(value)) {
//         setEmailError('Enter a valid email address.');
//       } else {
//         setEmailError('');
//       }
//     }
//     if (name === 'phone') {
//       // Phone number validation using a regular expression
//       const phoneRegex = /^\d{10}$/; // Change this pattern to match your requirements
//       if (!phoneRegex.test(value)) {
//         setPhoneError('Enter a valid 10-digit phone number.');
//       } else {
//         setPhoneError('');
//       }
//     }
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'file' ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
    
//     e.preventDefault();
//     if (emailError) {
//       // Don't submit the form if there's an email error
//       return;
//     }
//     // Handle form submission here, e.g., send data to the server
//     console.log('Form Data:', formData);

    
    
//   };

//   return (
//     <div className="regform-ctn">
//     <div className='regform'>
      
//       <form onSubmit={handleSubmit}>
//         {/* Driver Details */}
//         <div className='driver'>
//           <h3>Driver Details</h3>
//           <div className='form-group'>
//             <label>First Name:<span className="required">*</span></label>
//             <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>Last Name:<span className="required">*</span></label>
//             <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>Phone:<span className="required">*</span></label>
//             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//             {phoneError && <div className="error-message">{phoneError}</div>}
          
//           </div>
//           <div className='form-group'>
//             <label>Address:<span className="required">*</span></label>
//             <input type="text" name="address" value={formData.address} onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>Email:<span className="required">*</span></label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//             {emailError && <div className="error-message">{emailError}</div>}
//           </div>
//         </div>

//         {/* Car Details */}
//         <div className='car'>
//           <h3>Car Details</h3>
//           <div className='form-group'>
//             <label>Car Name:<span className="required">*</span></label>
//             <input type="text" name="carName" value={formData.carName} onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>Car Model:<span className="required">*</span></label>
//             <input type="text" name="carModel" value={formData.carModel} onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>Number of Seats:<span className="required">*</span></label>
//             <input type="number" name="seats" value={formData.seats} onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>License Plate Number:<span className="required">*</span></label>
//             <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>Chassis Number:<span className="required">*</span></label>
//             <input type="text" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} required />
//           </div>
//         </div>

//         {/* Uploaded Documents */}
//         <div className='documents'>
//           <h3>Upload Documents</h3>
//           <div className='form-group'>
//             <label>Insurance:<span className="required">*</span></label>
//             <input type="file" name="insurance" onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>Pollution Certificate:<span className="required">*</span></label>
//             <input type="file" name="pollutionCertificate" onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>Driver's Driving License:<span className="required">*</span></label>
//             <input type="file" name="drivingLicense" onChange={handleChange} required />
//           </div>
//         </div>

//         {/* Bank Account Details */}
//         <div className='bank'>
//           <h3>Bank Account Details</h3>
//           <div className='form-group'>
//             <label>Account Number:<span className="required">*</span></label>
//             <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>Account Name:<span className="required">*</span></label>
//             <input type="text" name="accountName" value={formData.accountName} onChange={handleChange} required />
//           </div>
//           <div className='form-group'>
//             <label>IFSC Code:<span className="required">*</span></label>
//             <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" onClick={()=>{nav("/home");}} >Register</button>
//       </form>
//     </div>
//     </div>
//   );
// }

// export default RegistrationForm;

import "./registerform.css";
import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
function RegistrationForm() {
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    // Driver Details
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",

    // Car Details
    carName: "",
    carModel: "",
    seats: "",
    licensePlate: "",
    chassisNumber: "",

    // Uploaded Documents
    insurance: null,
    pollutionCertificate: null,
    drivingLicense: null,

    // Bank Account Details
    accountNumber: "",
    accountName: "",
    ifscCode: "",
  });
  const [emailError, setEmailError] = useState("");
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "email") {
      // Email validation using a regular expression
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        setEmailError("Enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
    if (name === "phone") {
      // Phone number validation using a regular expression
      const phoneRegex = /^\d{10}$/; // Change this pattern to match your requirements
      if (!phoneRegex.test(value)) {
        setPhoneError("Enter a valid 10-digit phone number.");
      } else {
        setPhoneError("");
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      // Don't submit the form if there's an email error
      return;
    }

    try {
      // Create a FormData object to send the form data as a multipart/form-data request
      const formDataToSend = new FormData();

      // Append each field to the FormData object
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Make an Axios POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:5000/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      if (response.status === 200) {
        console.log("Registration successfull");
      } else {
        // Registration failed, handle the error here
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="regform-ctn">
      <div className="regform">
        <form onSubmit={handleSubmit}>
          {/* Driver Details */}
          <div className="driver">
            <h3>Driver Details</h3>
            <div className="form-group">
              <label>
                First Name:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Last Name:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Phone:<span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {phoneError && <div className="error-message">{phoneError}</div>}
            </div>
            <div className="form-group">
              <label>
                Address:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Email:<span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
          </div>

          {/* Car Details */}
          <div className="car">
            <h3>Car Details</h3>
            <div className="form-group">
              <label>
                Car Name:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Car Model:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Number of Seats:<span className="required">*</span>
              </label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                License Plate Number:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Chassis Number:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="chassisNumber"
                value={formData.chassisNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="documents">
            <h3>Upload Documents</h3>
            <div className="form-group">
              <label>
                Insurance:<span className="required">*</span>
              </label>
              <input
                type="file"
                name="insurance"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Pollution Certificate:<span className="required">*</span>
              </label>
              <input
                type="file"
                name="pollutionCertificate"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Driver&quot;s Driving License:
                <span className="required">*</span>
              </label>
              <input
                type="file"
                name="drivingLicense"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="bank">
            <h3>Bank Account Details</h3>
            <div className="form-group">
              <label>
                Account Number:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Account Name:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                IFSC Code:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;