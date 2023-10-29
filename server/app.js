

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
// ...
app.use(bodyParser.json());

// Create a MySQL connection pool
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

// app.post("/upload", upload.single("pdf"), (req, res) => {
//   const { originalname, buffer } = req.file;
  

//   const sql = "INSERT INTO pdfs (name, data) VALUES (?, ?)";
//   const values = [originalname, buffer];

//   pool.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error uploading PDF:", err);
//       res.status(500).json({ error: "Error uploading PDF" });
//     } else {
//       console.log("PDF uploaded successfully");
//       res.status(200).json({ message: "PDF uploaded successfully" });
//     }
//   });
// });

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
  // try {
  //   // Use the pool to acquire a connection
  //   const connection = await pool.getConnection();

  //   // Query the database to find a user with the provided email and password
  //   const [results] = await connection.query(
  //     'SELECT * FROM taxi_driver WHERE email = ? AND password = ?',
  //     [email, password]
  //   );

  //   connection.release(); // Release the connection back to the pool

  //   if (results.length > 0) {
  //     // Return the user's record
  //     res.json(results[0]);
  //   } else {
  //     // If no matching user is found, return an error
  //     res.status(404).json({ error: 'User not found' });
  //   }
  // } catch (error) {
  //   res.status(500).json({ error: 'Database error' });
  // }
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
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
  const sql = "SELECT * FROM taxi_driver WHERE id = ?";
  const value = [id];

  db.query(sql, value, (err, result) => {
    if (err) {
      console.error("Error retrieving taxi_driver:", err);
      res.status(500).json({ error: "Error retrieving taxi_driver" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.status(200).json(result);
    }
  });
});


app.get('/download/insurance/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;

  // Query the database to retrieve the PDF data
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

    // Set the appropriate response headers for the PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="downloaded.pdf"`);

    console.log(result[0]);
    // Send the PDF data to the client for download
    res.end(result[0].insurance, 'binary');
  });
});

app.get('/download/driving_license/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;

  // Query the database to retrieve the PDF data
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

    // Set the appropriate response headers for the PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="downloaded.pdf"`);

    console.log(result[0]);
    // Send the PDF data to the client for download
    res.end(result[0].driving_license, 'binary');
  });
});

app.get('/download/pollution_certificate/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;

  // Query the database to retrieve the PDF data
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

    // Set the appropriate response headers for the PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="downloaded.pdf"`);

    console.log(result[0]);
    // Send the PDF data to the client for download
    res.end(result[0].pollution_certificate, 'binary');
  });
});





// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   console.log(email,password);

  
  
// });
// Add this route to your Express server
// app.get("/pdf/:pdfId", (req, res) => {
//   const pdfId = req.params.pdfId;

//   const sql = "SELECT data FROM pdfs WHERE id = ?";
//   const values = [pdfId];

//   pool.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error retrieving PDF:", err);
//       res.status(500).json({ error: "Error retrieving PDF" });
//     } else if (result.length === 0) {
//       res.status(404).json({ error: "PDF not found" });
//     } else {
//       const pdfData = Buffer.from(result[0].data, "base64");
//       res.contentType("application/pdf");
//       res.send(pdfData);
//     }
//   });
// });
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
  // Check if the user is authenticated (e.g., by checking a session or token)
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, continue to the next middleware or route handler
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

// Middleware function to check if the user has admin privileges
function isAdmin(req, res, next) {
  // Check if the user has admin privileges (you can define your own logic here)
  if (req.user && req.user.isAdmin) {
    return next(); // User is an admin, continue to the next middleware or route handler
  } else {
    return res.status(403).json({ message: 'Forbidden - Admin access required' });
  }
}

// Example route that requires authentication
app.get('/secure-route', isAuthenticated, (req, res) => {
  res.json({ message: 'This is a secure route' });
});

// Example route that requires both authentication and admin privileges
app.get('/admin-route', isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: 'This is an admin-only route' });
});


app.post("/api/get", async (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  try {
    // Use the pool to acquire a connection
    const connection = await pool.getConnection();

    // Query the database to fetch data from the "taxi_driver" table
    const [rows, fields] = await connection.execute(
      'SELECT * FROM taxi_driver where email = ? and password = ?',
      [username, password]
    );

    connection.release(); // Release the connection back to the pool

    if (rows.length > 0) {
      // If matching user(s) found, send the fetched data as a JSON response
      res.json(rows);
    } else {
      // If no matching user is found, return an error response
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