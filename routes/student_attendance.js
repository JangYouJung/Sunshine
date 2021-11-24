var express = require("express");
var app = express();
var router = express.Router();
var connection = require("../config/db"); //디비 사용위해 필요, connection.query()식으로 사용

router.get("/", function (req, res) {
  console.log(req.session);

  if (req.session.uid) {
    res.render("student_attendance");
    /*
    여기에 render("student_attendance", { data: context, data1: context1 }) 이런식으로 데이터 넘겨주는 쿼리 작성
    위의 res.render("student_attendance");문은 지워야함("student_attendance"은 student_attendance.ejs를 말하는 것임, student_attendance.ejs페이지를 렌더링한다는 뜻)
    */
    
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
