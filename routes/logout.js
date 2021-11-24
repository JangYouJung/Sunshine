var express = require("express");
var app = express();
var router = express.Router();

router.get("/", function (req, res) {
  req.session.destroy(function (err) {
    console.log("로그아웃");
    res.render("login"); //로그인 창으로 이동
    console.log(req.session);
    });
});

module.exports = router;
