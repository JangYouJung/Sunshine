var express = require("express");
var app = express();
var router = express.Router();

router.get("/", function (req, res) {
  console.log(req.session);

  if (req.session.uid) {
    res.render("student_my");
  } else {
    res.write(
      "<script type='text/javascript'>alert('Please log in');</script>"
    );
    res.write("<script type='text/javascript'>location.href='/login'</script>");
  }
});

module.exports = router;
