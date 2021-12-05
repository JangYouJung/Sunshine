var express = require("express");
var app = express();
var router = express.Router();

router.get("/", function (req, res) {
  
    if (req.session.uid) {
      res.render("staff_lecturelist");
      /*
    여기에 render("staff_main", { data: context, data1: context1 }) 이런식으로 데이터 넘겨주는 쿼리 작성,
    쿼리 작성끝내면 위의 res.render("staff_main");문은 지워야함
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
