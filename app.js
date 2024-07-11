const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const app = express();
const dotenv = require('dotenv'); // Import dotenv package

// Load environment variables from .env file
dotenv.config();

// Use CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to MySQL Database');
});

// Serve the index.html file
//app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, 'index.html'));
//});

app.use(express.static(path.join(__dirname, 'public')));

// Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  connection.query(sql, [name, email], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: results.insertId, name, email });
  });
});

// Read all users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  connection.query(sql, [name, email, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
