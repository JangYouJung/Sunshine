var express = require("express");
var app = express();
var router = express.Router();

router.get("/", function (req, res) {
  if (req.session.uid) {
    res.render("staff_attendance");
    /*
    여기에 render("staff_attendance", { data: context, data1: context1 }) 이런식으로 데이터 넘겨주는 쿼리 작성
    */
  } else {
    res.write(
      "<script type='text/javascript'>alert('Please log in');</script>"
    );
    res.write("<script type='text/javascript'>location.href='/login'</script>");
  }
});

module.exports = router;
