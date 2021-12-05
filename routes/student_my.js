var express = require("express");
var router = express.Router();
var connection = require("../config/db");

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
              "select date_format(course.course_date, '%Y-%m-%d') as course_date, attendance.degree, course.course_name from course join attendance on course.course_id = attendance.course_id and attendance.student_id=?",
              [req.session.uid],
              function (err, rows1) {
                if (err) {
                  throw err;
                }

                for (var i = 0; i < rows1.length; i++) {
<<<<<<< HEAD
                  context1.push(rows1[i]);
=======
                  context1[i] = [rows[i]];
>>>>>>> 4f5e36bb36fe215a403daec2ed9f7aa528a8d2ed
                }
                res.render("student_my", { data: context, data1: context1 });
              }
            );
          }
        }
      }
    );
  } else {
    res.write(
      "<script type='text/javascript'>alert('Please log in');</script>"
    );
    res.write("<script type='text/javascript'>location.href='/login'</script>");
  }
});

module.exports = router;
