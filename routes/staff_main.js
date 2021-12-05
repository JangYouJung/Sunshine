var express = require("express");
var app = express();
var router = express.Router();
var connection = require("../config/db"); //디비 사용위해 필요, connection.query()식으로 사용

router.get("/", function (req, res) {
  if (req.session.uid) {
    //req.session.uid가 있으면 로그인 되어있다는 뜻
    /*res.render("staff_main");
    여기에 render("staff_main", { data: context, data1: context1 }) 이런식으로 데이터 넘겨주는 쿼리 작성,
    쿼리 작성끝내면 위의 res.render("staff_main");문은 지워야함*/
    connection.query(
      "select * from staff where staff_id=?",
      [req.session.uid],
      function (err, rows) {
        if (rows.length) {
          // 데이터가 존재하면!!
          if (rows[0].staff_id === req.session.uid) {
            var context = [rows[0].staff_id, rows[0].staff_name];
            const context1 = [];

            connection.query(
              "SELECT date_format(course_date, '%Y-%m-%d') AS course_date, course.course_id, course_num, course_name FROM course JOIN management ON course.course_id = management.course_id and management.staff_id=?",
              [req.session.uid],
              function (err, rows1) {
                if (err) {
                  throw err;
                }

                for (var i = 0; i < rows1.length; i++) {
                  context1[i] = [rows1[i]]; // context1에 관리자가 관리하는 과목 정보 넣기
                }
                res.render("staff_main", { data: context, data1: context1 });
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
