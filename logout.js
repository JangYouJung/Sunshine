var express = require("express");
var app = express();
var server = require("./server");
var router = express.Router();

router.get("/", function (req, res) {
  req.session.destroy(function (err) {
    console.log("로그아웃");
    res.render("login");
  });
});

module.exports = router;
