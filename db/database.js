const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sailing_adventure_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// // Define SQL queries to create tables if they don't exist
// const createTables = `
//   CREATE TABLE IF NOT EXISTS Sailors (
//     S_Id INT AUTO_INCREMENT PRIMARY KEY,
//     S_name VARCHAR(255) NOT NULL,
//     B_date DATE,
//     Rate INT
//   );

//   CREATE TABLE IF NOT EXISTS Boats (
//     B_Id INT AUTO_INCREMENT PRIMARY KEY,
//     B_name VARCHAR(255) NOT NULL,
//     B_type VARCHAR(255) NOT NULL
//   );

//   CREATE TABLE IF NOT EXISTS Reserves (
//     S_Id INT,
//     B_Id INT,
//     Day DATE,
//     FOREIGN KEY (S_Id) REFERENCES Sailors(S_Id),
//     FOREIGN KEY (B_Id) REFERENCES Boats(B_Id),
//     PRIMARY KEY (S_Id, B_Id, Day)
//   );
// `;

// // Execute the create tables query
// connection.query(createTables, (err) => {
//   if (err) {
//     console.error('Error creating tables:', err);
//     return;
//   }
//   console.log('Tables created successfully');
// });

module.exports = connection;
