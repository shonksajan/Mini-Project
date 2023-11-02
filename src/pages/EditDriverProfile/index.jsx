import "./EditDriverProfile.css";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input } from "antd";

function EditDriverProfile() {
  const { id } = useParams();
  const history = useHistory();
  const [driverData, setDriverData] = useState({});
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/driver/${id}`).then((response) => {
      setDriverData(response.data[0]); 
    });
  }, [id]);

  const handleEdit = () => {
    
    axios
      .put(`http://localhost:5000/api/driver/${id}`, editedData)
      .then((response) => {
        // After the update is successful, navigate back to the driver profile page
        history.push(`/driverprofile/${id}`);
      })
      .catch((error) => {
        console.error("Error updating driver profile:", error);
        // Handle the error appropriately, e.g., show an error message
      });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <Form>
        <Form.Item label="First Name">
          <Input
            value={editedData.firstName || driverData.firstName}
            onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            value={editedData.lastName || driverData.lastName}
            onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Address">
          <Input
            value={editedData.address || driverData.address}
            onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={editedData.email || driverData.email}
            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Phone">
          <Input
            value={editedData.phone || driverData.phone}
            onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Car Name">
          <Input
            value={editedData.carName || driverData.carName}
            onChange={(e) => setEditedData({ ...editedData, carName: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Car Model">
          <Input
            value={editedData.carModel || driverData.carModel}
            onChange={(e) => setEditedData({ ...editedData, carModel: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Seats">
          <Input
            value={editedData.seats || driverData.seats}
            onChange={(e) => setEditedData({ ...editedData, seats: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="License Plate">
          <Input
            value={editedData.licensePlate || driverData.licensePlate}
            onChange={(e) => setEditedData({ ...editedData, licensePlate: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Chassis Number">
          <Input
            value={editedData.chassisNumber || driverData.chassisNumber}
            onChange={(e) => setEditedData({ ...editedData, chassisNumber: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Account Number">
          <Input
            value={editedData.accountNumber || driverData.accountNumber}
            onChange={(e) => setEditedData({ ...editedData, accountNumber: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Account Name">
          <Input
            value={editedData.accountName || driverData.accountName}
            onChange={(e) => setEditedData({ ...editedData, accountName: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="IFSC Code">
          <Input
            value={editedData.ifscCode || driverData.ifscCode}
            onChange={(e) => setEditedData({ ...editedData, ifscCode: e.target.value })}
          />
        </Form.Item>
        <Button type="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default EditDriverProfile;
