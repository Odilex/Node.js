const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',      // Database host
  user: 'your-username',   // MySQL username
  password: 'your-password', // MySQL password
  database: 'userdb'       // Database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the userdb database.');
});

module.exports = db;
