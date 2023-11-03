

const express = require("express");
const multer = require("multer");
const mysql = require("mysql2/promise");
const mysql2 = require("mysql2");

const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt")
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });


const bodyParser = require('body-parser');

app.use(bodyParser.json());


const pool = mysql.createPool({
  host: "localhost",
  port: "8080",
  user: "root",
  password: "ayana",
  database: "gorent",
});

const db = mysql2.createConnection({
  host: "localhost",
  port: "8080",
  user: "root",
  password: "ayana",
  database: "gorent",
});

app.use(express.json());



db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.post('/login', async (req, res) => {


  const { email, password } = req.body;
  console.log(email,password)
 
});


app.post('/api/driver/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const sql = `
      UPDATE taxi_driver
      SET firstName = ?,
          lastName = ?,
          phone = ?,
          address = ?,
          email = ?,
          carName = ?,
          carModel = ?,
          seats = ?,
          licensePlate = ?,
          chassisNumber = ?,
          accountNumber = ?,
          accountName = ?,
          ifscCode = ?
      WHERE id = ?
    `;

    const values = [
      updatedData.firstName,
      updatedData.lastName,
      updatedData.phone,
      updatedData.address,
      updatedData.email,
      updatedData.carName,
      updatedData.carModel,
      updatedData.seats,
      updatedData.licensePlate,
      updatedData.chassisNumber,
      updatedData.accountNumber,
      updatedData.accountName,
      updatedData.ifscCode,
      id,
    ];

    const [result] = await pool.query(sql, values);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Driver profile updated successfully' });
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    console.error('Error updating driver profile:', error);
    res.status(500).json({ error: 'Error updating driver profile' });
  }
});








app.post(
  "/register",
  upload.fields([
    { name: "insurance", maxCount: 1 },
    { name: "pollutionCertificate", maxCount: 1 },
    { name: "drivingLicense", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      firstName,
      lastName,
      phone,
      address,
      email,
      password,
      carName,
      carModel,
      seats,
      licensePlate,
      chassisNumber,
      accountNumber,
      accountName,
      ifscCode,
    } = req.body;

  

    const insuranceFile = req.files["insurance"][0];
    const pollutionCertificateFile = req.files["pollutionCertificate"][0];
    const drivingLicenseFile = req.files["drivingLicense"][0];

    
    if (!insuranceFile || !pollutionCertificateFile || !drivingLicenseFile) {
      return res.status(400).json({ error: "All document files are required" });
    }

    try {
     
      const userInsertSql = `
        INSERT INTO taxi_driver (firstName, lastName, phone, address, email, password, carName, carModel, seats, licensePlate, chassisNumber, accountNumber, accountName, ifscCode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const userInsertValues = [
        firstName,
        lastName,
        phone,
        address,
        email,
        password,
        carName,
        carModel,
        seats,
        licensePlate,
        chassisNumber,
        accountNumber,
        accountName,
        ifscCode,
      ];

      
      const userInsertResult = await pool.query(
        userInsertSql,
        userInsertValues
      );

      console.log(userInsertResult[0].insertId);

      if (!userInsertResult || !userInsertResult[0].insertId) {
       
        console.error("User insert failed");
        return res.status(500).json({ error: "User insert failed" });
      }

      
      const userId = userInsertResult[0].insertId; 
      console.log(userId);

      const documentInsertSql = `
        INSERT INTO documents (user_id, insurance, pollution_certificate, driving_license)
        VALUES (?, ?, ?, ?)
      `;
      const documentInsertValues = [
        userId, 
        insuranceFile.buffer, 
        pollutionCertificateFile.buffer,
        drivingLicenseFile.buffer,
      ];

      
      await pool.query(documentInsertSql, documentInsertValues);

      console.log("User registered successfully");
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  }
);


app.get('/api/driver/:id', (req, res) => {
  const id = req.params['id'];
  const sql = "SELECT taxi_driver.*, documents.prof FROM taxi_driver INNER JOIN documents ON taxi_driver.id = documents.user_id where taxi_driver.id = ?";
  const value = [id];
  db.query(sql, value, (err, result) => {
    if (err) {
      console.error("Error retrieving taxi_driver:", err);
      res.status(500).json({ error: "Error retrieving taxi_driver" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "user not found" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});

app.get('/api/carlist', (req, res) => {
  const sql = `
    SELECT taxi_driver.carModel, taxi_driver.carName, taxi_driver.seats, documents.prof FROM taxi_driver INNER JOIN documents ON taxi_driver.id = documents.user_id`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error retrieving taxi_driver:", err);
      res.status(500).json({ error: "Error retrieving taxi_driver" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "user not found" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});



app.get('/download/insurance/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;

  const sql = 'SELECT insurance FROM documents WHERE user_id = ?';

  db.query(sql, [pdfId], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Error retrieving PDF' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'PDF not found' });
      return;
    }

    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="downloaded.pdf"`);

    console.log(result[0]);
    
    res.end(result[0].insurance, 'binary');
  });
});

app.get('/download/driving_license/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;

  
  const sql = 'SELECT driving_license FROM documents WHERE user_id = ?';

  db.query(sql, [pdfId], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Error retrieving PDF' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'PDF not found' });
      return;
    }

    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="downloaded.pdf"`);

    console.log(result[0]);
    
    res.end(result[0].driving_license, 'binary');
  });
});

app.get('/download/pollution_certificate/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;

  
  const sql = 'SELECT pollution_certificate FROM documents WHERE user_id = ?';

  db.query(sql, [pdfId], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Error retrieving PDF' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'PDF not found' });
      return;
    }

    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="downloaded.pdf"`);

    console.log(result[0]);
    
    res.end(result[0].pollution_certificate, 'binary');
  });
});






app.get("/pdf/:pdfId", (req, res) => {
  const pdfId = req.params.pdfId;

  const sql = "SELECT insurance FROM documents WHERE id = ?";
  const values = [pdfId];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error retrieving PDF:", err);
      res.status(500).json({ error: "Error retrieving PDF" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "PDF not found" });
    } else {
      const pdfData = Buffer.from(result[0].data, "base64");
      res.contentType("application/pdf");
      res.send(pdfData);
    }
  });
});

app.get("/viewpdf/:id", async (req, res) => {
  try {
    const pdfId = req.params.id;

    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT name, data FROM documents WHERE id = ?",
      [pdfId]
    );
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "PDF not found" });
    }

    const { name, data } = rows[0];

    if (!name || !data) {
      return res.status(500).json({ error: "Invalid PDF data" });
    }

    
    const tempFilePath = `uploads/${name}`;
    fs.writeFileSync(tempFilePath, data);

   
    res.download(tempFilePath, name, (err) => {
      
      fs.unlinkSync(tempFilePath);
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Error fetching and serving PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


function isAuthenticated(req, res, next) {
  
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}


function isAdmin(req, res, next) {
 
  if (req.user && req.user.isAdmin) {
    return next(); 
  } else {
    return res.status(403).json({ message: 'Forbidden - Admin access required' });
  }
}


app.get('/secure-route', isAuthenticated, (req, res) => {
  res.json({ message: 'This is a secure route' });
});


app.get('/admin-route', isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: 'This is an admin-only route' });
});


app.post("/api/get", async (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  try {
    
    const connection = await pool.getConnection();

    
    const [rows, fields] = await connection.execute(
      'SELECT * FROM taxi_driver where email = ? and password = ?',
      [username, password]
    );

    connection.release(); 

    if (rows.length > 0) {
     
      res.json(rows);
    } else {
      
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Database error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});