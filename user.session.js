const MySQLStore = require("express-mysql-session");

var options = {
  host: "localhost",
  user: "root",
  password: "sunshine",
  database: "sunshine",
  port: 3306,
};

//mysql store의 정보를 mysqlstore모듈에 넣어준다.
var sessionStore = new MySQLStore(options);



module.exports = sessionStore;
