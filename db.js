const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ip123",
  database: "petmatch_db"
});
connection.connect();
module.exports = connection;
