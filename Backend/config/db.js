const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Your Password',
    database: 'banner_db'
});

db.connect(err => { 
    if (err) {
        console.error('MySQL connection error:', err.message);
        process.exit(1);
    }
    console.log('Succesfully Connected To MySQL Database');
});

module.exports = db;
