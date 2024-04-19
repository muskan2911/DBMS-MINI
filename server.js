const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = 5601

// Middleware to parse JSON and form data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'patent_auto'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Endpoint to fetch patents with authors
app.get('/patents', (req, res) => {
  const searchInput = req.query.searchInput.toLowerCase();
  const patentType = req.query.patentType;

  let query = `
    SELECT * from test_patent1
  `;


  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to add patent
app.post('/add-patent', (req, res) => {
  const { title, type, department, datePublished } = req.body;

  const query = `
    INSERT INTO patents (Patent_title,Patent_id, patent_type,patent_author, patent_department, published)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(query, [title, type, department, datePublished], (error, results) => {
    if (error) {
      console.error('Error adding patent:', error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    } else {
      res.json({ success: true });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
