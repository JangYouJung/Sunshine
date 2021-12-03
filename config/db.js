var mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sunshine",
  database: "sunshine",
  multipleStatements: true
});

connection.connect();

module.exports = connection;
