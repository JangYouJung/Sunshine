var express = require("express");
var app = express();
var router = express.Router();
var connection = require("../config/db"); //디비 사용위해 필요, connection.query()식으로 사용

var student_id;

router.get("/", function (req, res) {
  console.log(req.session);

  if (req.session.uid) { //로그인이 되어있으면 true
    //res.render("student_attendance");
    /*
    여기에 render("student_attendance", { data: context, data1: context1 }) 이런식으로 데이터 넘겨주는 쿼리 작성
    위의 res.render("student_attendance");문은 지워야함("student_attendance"은 student_attendance.ejs를 말하는 것임, student_attendance.ejs페이지를 렌더링한다는 뜻)
    */
    connection.query(
      "SELECT * FROM student WHERE student_id = ?", [req.session.uid], function(err, rows) {
        if (rows.length) {
          if (rows[0].student_id === req.session.uid) {
            student_id = rows[0].student_id;
            connection.query("SELECT * FROM course where att_valid = 1", function(error, courses) {
              // 일단 모든 강의 목록을 띄워옴
              if (error) throw error;
              else {
                 const course_list = [];
                 for (var i = 0; i < courses.length; i++) {
                   course_list.push(courses[i].course_name);
                 }
                 res.render("student_attendance", {data:course_list});
              }
            });
          }
        }
      }
    );

  } else {
       res.write(
         "<script type='text/javascript'>alert('Please log in');</script>"
       );
       res.write(
         "<script type='text/javascript'>location.href='/login'</script>"
       );
  }
});

router.post("/", function(req, res) {
  var atd_number = Number(req.body.atd_number); // 학생이 입력한 출석 인증 번호
  var course_name = req.body.v40_341;   // 학생이 선택한 특강 이름
  
  connection.query(
    "SELECT * FROM course INNER JOIN attendance_info ON course.course_id = attendance_info.course_id WHERE course.course_name = ? and course.att_valid = 1", 
    [course_name], 
    function(error, course) {
      if (course.length) { // 선택한 특강 이름과 일치하고 현재 유효한 강의를 찾은 경우
        var course_id = course[0].course_id;           // 특강 ID
        var course_degree = course[0].degree;          // 특강 차시
        var attendance_num = course[0].attendance_num; // 출석 인증 번호

        connection.query( 
          "SELECT * FROM attendance WHERE student_id = ? and course_id = ? and degree = ?", 
          [student_id, course_id, course_degree],
          function(error2, rows) {
            if (error2) throw error2;
            if (rows.length) { // 학생이 이미 해당 차시 출석을 진행한 경우 
              res.write("<script language='javascript' charset='utf-8'>alert('Duplicate attendance')</script>"); // 중복된 출석 인증
              res.write('<script>window.location="/student_attendance"</script>');
            } else { //학생이 처음 출석인증을 하는 경우
              if (attendance_num === atd_number) { // 출석 번호가 일치할 경우
                connection.query(
                  "INSERT INTO attendance(student_id,course_id,degree) VALUES (?,?,?)",
                  [student_id, course_id, course_degree],
                  function(error3, rows2) {
                    if (error3) throw error3;
                    res.render("student_attendance_suc");
                  }
                );
              } else { // 출석 번호가 일치하지 않은 경우
                res.write("<script language='javascript' charset='utf-8'>alert('This is not same attendance number.')</script>"); 
                res.write('<script>window.location="/student_attendance"</script>');
              }
            }
          }
        );
      } else { // 선택한 특강 이름과 일치하지 않거나 현재 유효한 강의를 찾지 못한 경우
        res.render("student_attendance_error");
      }
    }
  );
});

module.exports = router;