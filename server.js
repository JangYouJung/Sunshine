var express = require("express");
var session = require("express-session");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");
var ejs = require("ejs");
var login = require("./routes/login");
var join = require("./routes/join");
var logout = require("./routes/logout");
var staff_attendance = require("./routes/staff_attendance");
var staff_attendancelist = require("./routes/staff_attendancelist");
var staff_lecturelist = require("./routes/staff_lecturelist");
var staff_main = require("./routes/staff_main");
var student_attendance_error = require("./routes/student_attendance_error");
var student_attendance_suc = require("./routes/student_attendance_suc");
var student_attendance = require("./routes/student_attendance");
var student_main = require("./routes/student_main");
var student_my = require("./routes/student_my");
var email = require("./email");
var staff_att_start = require("./routes/staff_att_start");
var staff_studentlist = require("./routes/staff_studentlist");
var user_session = require("./user.session");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs"); //'ejs'탬플릿을 엔진으로 한다.
app.set("views", path.join(__dirname, "views")); //폴더, 폴더경로 지정
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use( //세션 설정
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: user_session,
    cookie: {
      maxAge: 24000 * 60 * 60, // 쿠키 유효기간 24시간
    },
  })
);

app.get("/", (req, res) => {
  console.log("메인페이지 작동");

  if (req.session.isStudent == true) {
    if (req.session.isLogined == true) {
      res.redirect("/student_main");
    } else {
      res.redirect("/login");
    }
  } else {
    if (req.session.isLogined == true) {
      res.redirect("staff_main");
    } else {
      res.redirect("login");
    }
  }
});


app.use("/", login);
app.use("/join", join);
app.use("/login", login);  
app.use("/logout", logout);
app.use("/staff_attendance", staff_attendance);
app.use("/staff_attendancelist", staff_attendancelist);
app.use("/staff_lecturelist", staff_lecturelist);
app.use("/staff_main", staff_main);
app.use("/staff_studentlist", staff_studentlist);
app.use("/student_attendance_error", student_attendance_error);
app.use("/student_attendance_suc", student_attendance_suc);
app.use("/student_attendance", student_attendance);
app.use("/student_main", student_main); //ejs파일에서 <a href="/student_main">이런식으로 링크 설정해주면 라우터 모듈안의 student_main이 불러와짐->라우터 모듈안의 student_main은 ejs파일을 렌더링해줌
app.use("/student_my", student_my);
app.use("/staff_att_start", staff_att_start);

email.surveyEmail(); //이메일 보내기 함수

app.listen("80");



module.exports = app;
