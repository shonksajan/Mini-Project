const express = require('express');
const mysql = require('mysql')
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gorent',
});
connection.connect()

app.post('/signin', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const query = 'INSERT INTO signin (f_name, l_name, email, password) VALUES (?, ?, ?, ?)';
    
    try {
      await connection.query(query, [firstName, lastName, email, password]);
      connection.end()
      console.log('Data inserted successfully.');
      res.json({ message: 'Sign-in successful' });
    } catch (error) {
      // connection.end()
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
