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
      var c = req.query.course;
      connection.query('select a.*, c.*, date_format(course_date, "%Y-%m-%d")date from course as c left join(select (course_id)c, max(degree)max from attendance group by course_id) as a on a.c=c.course_id where c.course_id='+c,
        function(error, lecture_data){
          if(error){
            console.log(error);
          }
          var list = [];
          list.push(lecture_data[0].course_name);
          list.push(lecture_data[0].date); //.toISOString().substring(0,10)
          list.push(lecture_data[0].course_num);
          var degree = lecture_data[0].max;
          connection.query('select attendance_time, attendance_personnel from attendance_info where course_id='+c+' group by degree order by degree',
            function(error, course_data){
            if(error){
              console.log(error);
            }
            var list2 =[];
            for(var i = 1; i<degree+1; i++){
                list2.push(course_data[i-1].attendance_time); 
                list2.push(course_data[i-1].attendance_personnel);
            }
          res.render("staff_attendancelist", {context: context, list:list, list2:list2, max:degree, course:c}); });
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
