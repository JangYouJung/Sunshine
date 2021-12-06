var express = require("express");
var router = express.Router();
var connection = require("../config/db");  //디비 사용할려면 넣어줘야 함, connection.query()이런 식으로 사용


router.get("/", function (req, res) {

  if (req.session.uid) {


    connection.query(
      "select * from student where student_id=?",
      [req.session.uid],
      function (err, rows) {
        if (rows.length) {

          if (rows[0].student_id === req.session.uid) { 
            var context = [rows[0].student_id, rows[0].student_name];

            const context1 = [];

            connection.query(
              "select date_format(course.course_date, '%Y-%m-%d') as course_date, attendance.degree, course.course_name from course join attendance on course.course_id = attendance.course_id and attendance.student_id=? order by course.course_id",

              [req.session.uid],
              function (err, rows1) { // 세션 아이디가 로그인 아이디와 같으면 그 학생의 수강한 과목의 정보를 보여줌, attendance 테이블과 course테이블 조인하여 결과 보여줌
                if (err) {
                  throw err;
                }

                for (var i = 0; i < rows1.length; i++) {

                  context1.push(rows1[i]);

                }
                res.render("student_my", { data: context, data1: context1 }); //student_my.ejs에 데이터 넘기기(data는 학생의 이름,학번 정보, data1은 학생이 들은 과목 정보)
              }
            );
          }
        }
      }
    );
  } else {
    res.write(
      "<script type='text/javascript'>alert('Please log in');</script>" //로그인 된 상태가 아닐때 접속하려하면 뜨는 알림창
    );
    res.write("<script type='text/javascript'>location.href='/login'</script>"); //알림창의 확인버튼을 눌렀을 때 나오게 할창(로그인창)
  }
});

module.exports = router;
