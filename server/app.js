// const express = require('express');
// const db = require('./config/db')
// const cors = require('cors')

// const app = express();
// const  PORT = 3002;
// app.use(cors());
// app.use(express.json())

// // Route to get all posts
// app.get("/api/get", (req,res)=>{
// db.query("SELECT * FROM posts", (err,result)=>{
//     if(err) {
//     console.log(err)
//     } 
// res.send(result)
// });   });

// // Route to get one post
// app.get("/api/getFromId/:id", (req,res)=>{

// const id = req.params.id;
//  db.query("SELECT * FROM posts WHERE id = ?", id, 
//  (err,result)=>{
//     if(err) {
//     console.log(err)
//     } 
//     res.send(result)
//     });   });


// // Route for creating the post
// app.post('/api/create', (req,res)=> {

// const username = req.body.userName;
// const title = req.body.title;
// const text = req.body.text;

// db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
//    if(err) {
//    console.log(err)
//    } 
//    console.log(result)
// });   })

// // Route to like a post
// app.post('/api/like/:id',(req,res)=>{

// const id = req.params.id;
// db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
//     if(err) {
//    console.log(err)   } 
//    console.log(result)
//     });    
// });

// // Route to delete a post

// app.delete('/api/delete/:id',(req,res)=>{
// const id = req.params.id;

// db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
// if(err) {
// console.log(err)
//         } }) })

// app.listen(PORT, ()=>{
//     console.log(`Server is running on ${PORT}`)
// })

const express = require("express");
const multer = require("multer");
const mysql = require("mysql2/promise");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  port: "8080",
  user: "root",
  password: "ayana",
  database: "car_rent",
});

app.use(express.json());

app.post("/upload", upload.single("pdf"), (req, res) => {
  const { originalname, buffer } = req.file;
  //   const pdfData = buffer.toString("base64");

  const sql = "INSERT INTO pdfs (name, data) VALUES (?, ?)";
  const values = [originalname, buffer];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error uploading PDF:", err);
      res.status(500).json({ error: "Error uploading PDF" });
    } else {
      console.log("PDF uploaded successfully");
      res.status(200).json({ message: "PDF uploaded successfully" });
    }
  });
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
      carName,
      carModel,
      seats,
      licensePlate,
      chassisNumber,
      accountNumber,
      accountName,
      ifscCode,
    } = req.body;

    // Validate user data here if needed

    const insuranceFile = req.files["insurance"][0];
    const pollutionCertificateFile = req.files["pollutionCertificate"][0];
    const drivingLicenseFile = req.files["drivingLicense"][0];

    // Check if all required files were uploaded
    if (!insuranceFile || !pollutionCertificateFile || !drivingLicenseFile) {
      return res.status(400).json({ error: "All document files are required" });
    }

    try {
      // Insert user data into the "users" table
      const userInsertSql = `
        INSERT INTO users (firstName, lastName, phone, address, email, carName, carModel, seats, licensePlate, chassisNumber, accountNumber, accountName, ifscCode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const userInsertValues = [
        firstName,
        lastName,
        phone,
        address,
        email,
        carName,
        carModel,
        seats,
        licensePlate,
        chassisNumber,
        accountNumber,
        accountName,
        ifscCode,
      ];

      // Get the ID of the last inserted user (assuming you have an auto-incrementing primary key)
      const userInsertResult = await pool.query(
        userInsertSql,
        userInsertValues
      );

      console.log(userInsertResult[0].insertId);

      if (!userInsertResult || !userInsertResult[0].insertId) {
        // Handle the case where the insertId is not available
        console.error("User insert failed");
        return res.status(500).json({ error: "User insert failed" });
      }

      // Get the ID of the last inserted user (assuming you have an auto-incrementing primary key)
      const userId = userInsertResult[0].insertId; // This is the user_id you need

      console.log(userId);
      // Insert document data into the "documents" table
      const documentInsertSql = `
        INSERT INTO documents (user_id, insurance, pollution_certificate, driving_license)
        VALUES (?, ?, ?, ?)
      `;
      const documentInsertValues = [
        userId, // Set the user_id correctly
        insuranceFile.buffer, // You can store this binary data in the database
        pollutionCertificateFile.buffer,
        drivingLicenseFile.buffer,
      ];

      // Execute the document INSERT query
      await pool.query(documentInsertSql, documentInsertValues);

      console.log("User registered successfully");
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  }
);

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

  const sql = "SELECT data FROM pdfs WHERE id = ?";
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
      "SELECT name, data FROM pdfs WHERE id = ?",
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

    // Save the PDF to a temporary file
    const tempFilePath = `uploads/${name}`;
    fs.writeFileSync(tempFilePath, data);

    // Send the PDF file as an attachment
    res.download(tempFilePath, name, (err) => {
      // Cleanup: Delete the temporary file after it's sent
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

app.get("/api/get", (req, res) => {
  console.log("test");
  res.send("test");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});