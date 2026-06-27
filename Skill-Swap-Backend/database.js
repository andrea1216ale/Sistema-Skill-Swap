const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "skillswap",
});

connection.connect((error) => {
  if (error) {
    console.error("Error al conectar MySQL:", error);
    return;
  }
  console.log("MySQL conectado correctamente");
});

module.exports = connection;
