
import "./welcome.css";
import { EditOutlined } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
function DriverProfile() {
  const data = [
    {
      id: 16,
      firstName: "Ayana",
      lastName: "Sherin",
      phone: "7736144367",
      address: "abcde",
      email: "ayanaasherin@gmail.com",
      carName: "asds",
      carModel: "asdsad",
      seats: 5,
      licensePlate: "ssad",
      chassisNumber: "123457",
      accountNumber: "234324",
      accountName: "errwer",
      ifscCode: "123213",
    },
  ];

  return (
    <div className="main">
      {data.map((el) => {
        return (
          <>
            <div className="p-info">
              <div className="pr-details">
                <div>
                  <h4>{el.firstName + " " + el.lastName}</h4>
                  <p className="dr">Driver</p>
                </div>
                {/* <p>{el.Phone}</p>
                <p>{el.address}</p>
                <p>{el.email}</p> */}
              </div>

              <div className="car-details">
                <div className="head-flex">
                  <h4 className="v-info">Vehicle Information</h4>
                  <div>
                    <EditOutlined />
                  </div>
                </div>
                <div className="flex">
                  <div className="titles">
                    <p>Car name</p>
                    <p>Car model</p>
                    <p>Seats</p>
                    <p>License plate</p>
                    <p>Chassis number</p>
                  </div>
                  <div className="c-data">
                    <p>{el.carName}</p>
                    <p>{el.carModel}</p>
                    <p>{el.seats}</p>
                    <p>{el.licensePlate}</p>
                    <p>{el.chassisNumber}</p>
                  </div>
                </div>
              </div>
              <div className="acc-details">
                <div className="head-flex">
                  <h4 className="v-info">Account Information</h4>
                  <div>
                    <EditOutlined />
                  </div>
                </div>
                <div className="flex">
                  <div className="titles">
                    <p>Account number</p>
                    <p>Account name</p>
                    <p>IFSC code</p>
                  </div>
                  <div className="acc-d">
                    <p>{el.accountNumber}</p>
                    <p>{el.accountName}</p>
                    <p>{el.ifscCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}

      <div>
        <div className="card">
          <h6>
            Certificates{" "}
            <img
              className="verified"
              src="https://cdn-icons-png.flaticon.com/512/7641/7641727.png"
            />
          </h6>
          <div className="insurance">
            <h6>Insurance</h6>
            <Button
              type="primary"
              shape="circle"
              icon={<DownloadOutlined />}
              size={10}
            />
          </div>

          <div className="insurance">
            <h6>Driving Lisence</h6>
            <Button
              type="primary"
              shape="circle"
              icon={<DownloadOutlined />}
              size={10}
            />
          </div>
          <div className="insurance">
            <h6>Pollution</h6>
            <Button
              type="primary"
              shape="circle"
              icon={<DownloadOutlined />}
              size={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;