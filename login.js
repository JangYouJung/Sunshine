var express = require("express");
//var MySQLStore = require('express-mysql-session')(session);
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sunshine",
  database: "sunshine",
});

connection.connect();

app.use(router);

app.get("/", (req, res) => {
  console.log("메인페이지 작동");
  console.log(req.session);

  if (req.session.isStudent == true) {
    if (req.session.isLogined == true) {
      res.render("student_main", {
        isLogined: req.session.isLogined,
        isStudent: req.session.isStudent,
        login_id: req.session.id,
      });
    } else {
      res.render("login", {
        isLogined: false,
      });
    }
  } else {
    if (req.session.isLogined == true) {
      res.render("staff_main", {
        isLogined: req.session.isLogined,
        isStudent: req.session.isStudent,
        login_id: req.session.id,
      });
    } else {
      res.render("login", {
        isLogined: false,
      });
    }
  }
});

router.post("/", function (req, res) {
  var id = req.body.userid;
  var pw = req.body.password;
  var job = req.body.job;
  var sql_insert = { id: id, pw: pw };
  console.log("post received: %s %s %s", id, pw, job);

  if (job === "student") {
    connection.query(
      "select * from student where student_id=?",
      [id],
      function (err, rows) {
        if (rows.length) {
          if (rows[0].student_id == id) {
            connection.query(
              "select * from student where student_pwd=?",
              [pw],
              function (err, rows) {
                if (err) {
                  throw err;
                }
                if (rows.length) {
                  req.session.id = rows[0].student_id;
                  req.session.pw = rows[0].student_pwd;
                  req.session.isLogined = true;
                  req.session.isStudent = true;

                  req.session.save(function (err1) {
                    if (err1) {
                      throw err;
                    }
                    console.log(req.session);
                    res.render("student_main");
                  });
                } else {
                  console.log("로그인 실패");
                  res.write("<script>alert('pwd : fail')</script>");
                  res.write('<script>window.location="/"</script>');
                }
              }
            );
          }
        } else {
          console.log("로그인 실패");
          res.write("<script>alert('id : fail')</script>");
          res.write('<script>window.location="/"</script>');
        }
      }
    );
  } else {
    connection.query(
      "select * from staff where staff_id=?",
      [id],
      function (err, rows) {
        if (rows.length) {
          if (rows[0].staff_id === id) {
            connection.query(
              "select * from staff where staff_pwd=?",
              [pw],
              function (err, rows) {
                if (err) {
                  throw err;
                }
                if (rows.length) {
                  req.session.id = rows[0].staff_id;
                  req.session.pw = rows[0].staff_pwd;
                  req.session.isLogined = true;
                  req.session.isStudent = false;
                  req.session.save(function () {
                    console.log(req.session);
                    res.render("staff_main");
                  });
                } else {
                  console.log("로그인 실패");
                  res.write("<script>alert('pwd : fail')</script>");
                  res.write('<script>window.location="/"</script>');
                }
              }
            );
          }
        } else {
          console.log("로그인 실패");
          res.write("<script>alert('id : fail')</script>");
          res.write('<script>window.location="/"</script>');
        }
      }
    );
  }
});

module.exports = router;
