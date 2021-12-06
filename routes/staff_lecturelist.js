var express = require("express");
var app = express();
var router = express.Router();
var connection = require("../config/db"); //디비 사용위해 필요, connection.query()식으로 사용

router.get("/", function (req, res) {
    if (req.session.uid) {
      connection.query(
        "select * from staff where staff_id=?",
        [req.session.uid],
        function (err, rows) {
          if (rows.length) {
            if (rows[0].staff_id === req.session.uid) {
              var context = [rows[0].staff_id, rows[0].staff_name]; 
       connection.query('SELECT course.course_id, course_name, date_format(course_date, "%Y/%m/%d")date FROM course join management on course.course_id = management.course_id and management.staff_id=?', [req.session.uid],
        function(error, course_list){
          if(error){
            console.log(error);
          }
          var list = [];
          for(var i = 0; i < course_list.length; i++) {
            list.push(course_list[i].course_name);
            list.push(course_list[i].date);
            list.push(1); //차시
            list.push(course_list[i].course_id);
          }
          res.render("staff_lecturelist", {context: context, list: list, length:course_list.length});
        });
      }}});
    } else {
          res.write(
            "<script type='text/javascript'>alert('Please log in');</script>"
          );
          res.write(
            "<script type='text/javascript'>location.href='/login'</script>"
          );
    }
});

module.exports = router;
