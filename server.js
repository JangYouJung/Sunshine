var express = require("express");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");
var ejs = require("ejs");
var login = require("./login");
var join = require("./join");
var logout = require("./logout");

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs"); //'ejs'탬플릿을 엔진으로 한다.
app.set("views", path.join(__dirname, "views")); //폴더, 폴더경로 지정

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: "my key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new FileStore(),
  })
);

app.get("/", (req, res) => {
  console.log("메인페이지 작동");

  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.isLogined);
  console.log(req.session.isStudent);

  if (req.session.isStudent == true) {
    if (req.session.isLogined == true) {
      res.render("student_main", {
        isLogined: req.session.isLogined,
        isStudent: req.session.isStudent,
        login_id: req.session.id,
      });
    } else {
      res.render("login", {
        isLogined: false,
      });
    }
  } else {
    if (req.session.isLogined == true) {
      res.render("staff_main", {
        isLogined: req.session.isLogined,
        isStudent: req.session.isStudent,
        login_id: req.session.id,
      });
    } else {
      res.render("login", {
        isLogined: false,
      });
    }
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/join", (req, res) => {
  res.render("join");
});

app.get("/staff_attendance", (req, res) => {
  res.send("staff_attendance");
});

app.get("/staff_attendancelist", (req, res) => {
  res.send("staff_attendancelist");
});

app.get("/staff_lecturelist", (req, res) => {
  res.send("staff_lecturelist");
});

app.get("/staff_main", (req, res) => {
  res.send("staff_main");
});

/*
app.get("/student_attendance_error", (req, res) => {
  res.send("student_attendance_error");
});

app.get("/student_attendance_suc", (req, res) => {
  res.send("student_attendance_suc");
});
*/
app.get("/student_attendance", (req, res) => {
  res.send("student_attendance");
});

app.get("/student_main", (req, res) => {
  res.send("student_main");
});

app.get("/student_my", (req, res) => {
  res.send("student_my");
});

app.use("/", login);
app.use("/join", join);
app.use("/logout", logout);

app.listen("8080");

module.exports = router;
