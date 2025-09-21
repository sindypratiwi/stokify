const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // default user XAMPP
  password: '',       // isi kalau kamu pakai password MySQL
  database: 'stokify' // pastikan database sudah dibuat di MySQL
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
