var express = require("express");
var router = express.Router();
var connection = require("../config/db"); //디비 사용위해 필요
let bcrypt = require("bcrypt"); //비번 암호화위한 것

router.get("/", function (req, res) {
  res.setHeader("Content-type", "text/html;charset=UTF-8");
  if (!req.session.uid) {
    res.render("join", {
      login_id: req.session.uid,
    }); //로그인 되어있지 않으면 join.ejs창을 브라우저에 렌더링해줌, res.render("join")에서 join은 join.ejs를 말하는것임(ejs확장자는 생략가능함)
  } else {
    res.write(
      "<script type='text/javascript'>alert('You are already logged in.');</script>"
    );
    res.write("<script type='text/javascript'>location.href='/'</script>");
  }
});

router.post("/", function (req, res) { // join.ejs에서 post로 요청한 기능 구현
  var join_id = req.body.userid;
  var join_name = req.body.username;
  var join_pwd = req.body.password;
  var join_email = req.body.uEmailFirst + "@" + req.body.email_select;

  var sql_insert = [join_id, join_name, join_pwd, join_email];

  var saltRounds = 10;

  connection.query(
    "select student_id from student where student_id=?",
    [join_id],

    function (err, rows) { //학번이 이미있으면 실패

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
            if (rows.length) { //이메일이 이미있으면 실패
              console.log("회원가입 실패");
              res.write(
                "<script>alert('The same EMAIL already exists. join fail')</script>"
              );
              res.write('<script>window.location="/join"</script>');
            } else { //비밀번호를 암호화해서 저장
              bcrypt.hash(sql_insert[2], saltRounds, (error, hash) => {
                sql_insert[2] = hash;
                connection.query(
                  "insert into student(student_id, student_name, student_pwd, email) values(?,?,?,?)",
                  sql_insert,
                  function (err, rows) { //student테이블에 삽입해줌
                    if (err) throw err;
                    console.log("ok");
                    res.write("<script>alert('success')</script>");
                    res.write('<script>window.location="/login"</script>'); //성공 알림창의 확인버튼 누르면 로그인 페이지로 이동
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
