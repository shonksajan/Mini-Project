import React, { useState } from 'react';
import './booking.css'

function Booking() {
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [carType, setCarType] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');
  const [dropoffPoint, setDropoffPoint] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [adharFile, setAdharFile] = useState(null);

  const [needDriver, setNeedDriver] = useState('yes');
  const [drivingLicenseFile, setDrivingLicenseFile] = useState(null);
  const handlePickupDateChange = (e) => {
    setPickupDate(e.target.value);
    calculateNumberOfDays(e.target.value, dropoffDate);
  };

  const handleDropoffDateChange = (e) => {
    setDropoffDate(e.target.value);
    calculateNumberOfDays(pickupDate, e.target.value);
  };

  const calculateNumberOfDays = (pickupDate, dropoffDate) => {
    if (pickupDate && dropoffDate) {
      const startDate = new Date(pickupDate);
      const endDate = new Date(dropoffDate);
      const timeDifference = endDate - startDate;
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      setNumberOfDays(daysDifference + 1); // Adding 1 to include both the start and end dates
    }
  };
  const [isNotARobot, setIsNotARobot] = useState(false); 
  const [showPaymentOption, setShowPaymentOption] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      fullname &&
      address &&
      pincode &&
      contactNumber &&
      carType &&
      pickupPoint &&
      dropoffPoint &&
      pickupDate &&
      dropoffDate &&
      numberOfDays &&
      adharFile &&
      isNotARobot
    ) {
      if (needDriver === 'no' && !drivingLicenseFile) {
        alert('Please upload your driving license.');
      } else {
        // Handle form submission and booking logic here
        console.log("Form submitted");
      }
    } else {
      alert('Please fill out all mandatory fields.');
    }
  };

  return (
    <div className='container'>
        <div className='booking-form'>
      <h2>Book your Ride!!</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label>Pincode:</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />

        <label>Contact Number:</label>
        <input
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />

        <label>Car Type:</label>
        <select
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
          required
        >
          <option value="">Select Car Type</option>
          <option value="compact">Compact</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
        </select>

        <label>Pickup Point:</label>
        <input
          type="text"
          value={pickupPoint}
          onChange={(e) => setPickupPoint(e.target.value)}
          required
        />

        <label>Drop-off Point:</label>
        <input
          type="text"
          value={dropoffPoint}
          onChange={(e) => setDropoffPoint(e.target.value)}
          required
        />

<label>Pickup Date:</label>
        <input
          type="date"
          value={pickupDate}
          onChange={handlePickupDateChange}
          required
        />

        <label>Drop-off Date:</label>
        <input
          type="date"
          value={dropoffDate}
          onChange={handleDropoffDateChange}
          required
        />

        <label>Number of Days:</label>
        <input
          type="number"
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(e.target.value)}
          required
        />

        <label>Do you need a driver?</label>
        <div>
          <label>
            <input
              type="radio"
              name="needDriver"
              value="yes"
              checked={needDriver === 'yes'}
              onChange={() => setNeedDriver('yes')}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="needDriver"
              value="no"
              checked={needDriver === 'no'}
              onChange={() => setNeedDriver('no')}
            />
            No
          </label>
        </div>

        {needDriver === 'no' && (
          <div>
            <label>Upload Driving License (PDF only):</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setDrivingLicenseFile(e.target.files[0])}
              required
            />
          </div>
        )}

        <label>Upload Aadhar (PDF only):</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setAdharFile(e.target.files[0])}
          required
        />
        <div>
          <label>
            <input
              type="checkbox"
              checked={isNotARobot}
              onChange={() => setIsNotARobot(!isNotARobot)}
            />
            I am not a Robot
          </label>
        </div>

        {isNotARobot && ( // Only show the "Proceed to Payment" button when the checkbox is checked
          <div>
            <button type="submit">Proceed to Payment</button>
          

        <button type="submit">Book Now</button>
        </div>
        )}
      </form>
      </div>
      <div className="poster">
      <img src="/images/ofr2.png" alt="ofr" />
  </div>
    </div>
  );
}

export default Booking;
