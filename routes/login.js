var express = require("express");
var router = express.Router();
var connection = require("../config/db");
let bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  console.log("로그인페이지 작동");

  if (req.session.uid) {
    res.write(
      "<script type='text/javascript'>alert('You are already logged in.');</script>"
    );
    res.write("<script type='text/javascript'>location.href='/'</script>");
  } else {
    res.render("login");
  }
});

router.post("/", function (req, res) {
  var id = req.body.userid;
  var pw = req.body.password;
  var job = req.body.job;

  //console.log("post received: %s %s %s", id, pw, job);

  if (job === "student") {
    connection.query(
      "select * from student where student_id=?",
      [id],
      function (err, rows) {
        if (rows.length) {
          if (rows[0].student_id === id) {
            bcrypt.compare(pw, rows[0].student_pwd, (err, tf) => {
              if (tf !== true) {
                console.log("로그인 실패");
                res.write("<script>alert('pwd : fail')</script>");
                res.write('<script>window.location="/"</script>');
              } else {
                req.session.uid = rows[0].student_id;
                req.session.isLogined = true;
                req.session.isStudent = true;

                req.session.save(function (err1) {
                  if (err1) {
                    throw err;
                  }
                  console.log("학생 로그인");
                  res.redirect("/student_main");
                });
              }
            });
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
            if (pw !== rows[0].staff_pwd) {
              console.log("로그인 실패");
              res.write("<script>alert('pwd : fail')</script>");
              res.write('<script>window.location="/"</script>');
            } else {
              req.session.uid = rows[0].staff_id;
              req.session.isLogined = true;
              req.session.isStudent = false;

              req.session.save(function (err1) {
                if (err1) {
                  throw err;
                }
                console.log("직원 로그인");
                res.redirect("staff_main");
              });
            }
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
