var express = require("express");
var app = express();
var router = express.Router();
var connection = require("../config/db"); //디비 사용위해 필요
let bcrypt = require("bcrypt"); //비번 암호화위한 것

router.get("/", function (req, res) {
  res.setHeader("Content-type", "text/html;charset=UTF-8");
  if (!req.session.uid) {
    res.render("join", {
      login_id: req.session.uid,
    });
  } else {
    res.write(
      "<script type='text/javascript'>alert('You are already logged in.');</script>"
    );
    res.write("<script type='text/javascript'>location.href='/'</script>");
  }
});

router.post("/", function (req, res) {
  var join_id = req.body.userid;
  var join_name = req.body.username;
  var join_pwd = req.body.password;
  var join_email = req.body.uEmailFirst + "@" + req.body.email_select;

  var sql_insert = [join_id, join_name, join_pwd, join_email];

  var saltRounds = 10;
  console.log(sql_insert);

  connection.query(
    "select student_id from student where student_id=?",
    [join_id],
    function (err, rows) {
      if (rows.length) {
        console.log("회원가입 실패");
        res.write(
          "<script>alert('The same ID already exists. join fail')</script>"
        );
        res.write('<script>window.location="/join"</script>');
      } else {
        connection.query(
          "select email from student where email=?",
          [join_email],
          function (err, rows) {
            if (rows.length) {
              console.log("회원가입 실패");
              res.write(
                "<script>alert('The same EMAIL already exists. join fail')</script>"
              );
              res.write('<script>window.location="/join"</script>');
            } else {
              bcrypt.hash(sql_insert[2], saltRounds, (error, hash) => {
                sql_insert[2] = hash;
                console.log(sql_insert);
                connection.query(
                  "insert into student(student_id, student_name, student_pwd, email) values(?,?,?,?)",
                  sql_insert,
                  function (err, rows) {
                    if (err) throw err;
                    console.log("ok");
                    console.log(sql_insert);
                    res.write("<script>alert('success')</script>");
                    res.write('<script>window.location="/login"</script>');
                  }
                );
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
