const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database successfully!!");
  createDatabase();
});

function createDatabase() {
  db.query("CREATE DATABASE IF NOT EXISTS Youtube", (err) => {
    if (err) throw err;
    console.log("Youtube database created or already exists");
    useDatabase();
  });
}

function useDatabase() {
  db.query("USE Youtube", (err) => {
    if (err) throw err;
    console.log("Using Youtube database");
    createTable();
  });
}

function createTable() {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS signup (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  db.query(createTableSql, (err) => {
    if (err) throw err;
    console.log("Signup table created or already exists");
  });
}

module.exports = db;
