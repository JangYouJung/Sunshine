var express = require("express");
var app = express();
var router = express.Router();

router.get("/", function (req, res) {
  
    if (req.session.uid) {
      res.render("student_main");  //"student_main"은 student_main.ejs를 말하는 것임, ejs는 확장자명 생략가능->student_main.ejs을 페이지에 렌더링해줌
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
