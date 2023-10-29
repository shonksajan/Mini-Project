const express = require('express');
const mysql = require('mysql2/promise'); // Use mysql2/promise for promises
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "gorent",
  waitForConnections: true,
  connectionLimit: 10, // Adjust the connection limit as needed
  queueLimit: 0,
});

app.post('/signin', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const query = 'INSERT INTO signin (f_name, l_name, email, password) VALUES (?, ?, ?, ?)';

  try {
    const [results] = await pool.execute(query, [firstName, lastName, email, password]);
    console.log('Data inserted successfully.');
    res.json({ message: 'Sign-in successful' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/get', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM signin WHERE email=? AND password=?', [email, password]);
    connection.release();
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error("An error occurred", error);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
