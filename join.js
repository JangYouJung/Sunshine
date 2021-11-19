var express = require("express");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
//var MySQLStore = require('express-mysql-session')(session);
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var server = require("./server");
//const { response } = require('express');
var cookieParser = require("cookie-parser");
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  session({
    secret: "my key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new FileStore(),
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password!",
  database: "mysql",
});

connection.connect();

app.get("/", function (req, res) {
  res.setHeader("Content-type", "text/html;charset=UTF-8");
  if (!req.session.uid) {
    res.render("join", {
      login_id: req.session.uid,
    });
  } else {
    res.write(
      "<script type='text/javascript'>alert('비정상적 접근 - 이미 로그인된 상태입니다.');</script>"
    );
    res.write("<script type='text/javascript'>location.href='/'</script>");
  }
});

router.post("/", function (req, res) {
  var join_id = req.body.userid;
  var join_pw = req.body.password;
  var join_name = req.body.username;
  var join_email = req.body.uEmailFirst + "@" + req.body.email_select;
  console.log(
    "post received: %s %s %s %s %s",
    join_id,
    join_pw,
    join_name,
    join_email
  );

  var sql_insert = {
    student_id: join_id,
    student_name: join_name,
    student_pwd: join_pw,
    email: join_email,
  };
  connection.query(
    "select student_id from student where student_id=?",
    [join_id],
    function (err, rows) {
      if (rows.length) {
        console.log("회원가입 실패");
        res.write("<script>alert('join fail')</script>");
        res.write('<script>window.location="/join"</script>');
      } else {
        connection.query(
          "insert into student set?",
          sql_insert,
          function (err, rows) {
            if (err) throw err;
            console.log("ok");
            res.write("<script>alert('success')</script>");
            res.write('<script>window.location="/login"</script>');
          }
        );
      }
    }
  );
});
module.exports = router;
