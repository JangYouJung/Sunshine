var express = require("express");
var app = express();
var router = express.Router();
var connection = require("../config/db"); //디비 사용위해 필요, connection.query()식으로 사용
// var url =request('url');

router.get("/", function (req, res) {
  if (req.session.uid) {
    connection.query(
      "select * from staff where staff_id=?",
      [req.session.uid],
      function (err, rows) {
        if (rows.length) {
          if (rows[0].staff_id === req.session.uid) {
            var context = [rows[0].staff_id, rows[0].staff_name]; 
    // var _url = request.url;
    // var url_query = url.parse(_url, true).query;
    var c = req.query.course;
    var d = req.query.degree;
    connection.query('select student.student_id, student_name from attendance INNER JOIN student ON student.student_id = attendance.student_id where course_id='+c+' AND degree='+d,
        function(error, student_list){
          if(error){
            console.log(error);
          }
          var list = [];
          for (var i = 0; i < student_list.length; i++) {
            list.push(student_list[i].student_id);
            list.push(student_list[i].student_name);
          }
          res.render("staff_studentlist", {context: context, list: list, c:c, d:d});
    });
  }}});  
    
  } else {
    res.write(
      "<script type='text/javascript'>alert('Please log in');</script>"
    );
    res.write("<script type='text/javascript'>location.href='/login'</script>");
  }
});

module.exports = router;
