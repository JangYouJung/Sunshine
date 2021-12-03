var express = require("express");
var app = express();
var router = express.Router();
var connection = require("../config/db");
let bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  console.log("로그인페이지 작동");
  console.log(req.session);

  if (req.session.uid) { //req.session.uid가 있으면 로그인 되어있다는 뜻
    res.write(
      "<script type='text/javascript'>alert('You are already logged in.');</script>" //이미 로그인 되어있으니 로그인 할수없도록 알림창이 뜸
    );
    res.write("<script type='text/javascript'>location.href='/'</script>"); //알림창의 확인 버튼 누르면 원래 페이지로 이동
  } else {
    res.render("login");
  }
 
});

router.post("/", function (req, res) { //login.ejs에서 post로 넘겨준 기능 구현
  var id = req.body.userid; //login.ejs에서 <input id="userid"> 이런식으로 id를 붙여줬었음            
  var pw = req.body.password;
  var job = req.body.job;

  console.log("post received: %s %s %s", id, pw, job);

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
                req.session.uid = rows[0].student_id; //req.session.uid에 학생 아이디 넣기
                req.session.isLogined = true;  //req.session.isLogined 에 로그인 여부 넣기
                req.session.isStudent = true; //req.session.isStudent에 학생인지 아닌지 넣기

                req.session.save(function (err1) {
                  if (err1) {
                    throw err;
                  }
                  console.log("학생 로그인");
                  console.log(req.session);
                  res.render("student_main"); //로그인 성공시 학생 메인페이지로 이동
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
                console.log(req.session);
                res.redirect("/staff_main");
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

module.exports = router; //라우팅 할려면 설정해줘야 함
