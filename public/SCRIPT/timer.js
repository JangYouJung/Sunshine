// var timer;
// var isRunning = false;
// // 인증번호 발송하고 타이머 함수 실행
// function start_timer() {
//   // 남은 시간
//   var leftSec = 30;

//   // 이미 타이머가 작동중이면 중지
//   if (isRunning) {
//     //document.getElementById("timer").innerHTML = "ggg";
//     clearInterval(timer);
//     console.log("running");
//   }

//   startTimer(leftSec);  

// }

// function startTimer(count) {
//   document.getElementById("timer").innerHTML = "dd";
//   var minutes, seconds;
//   timer = setInterval(function () {
//     document.getElementById("timer").innerHTML = "f";
//     minutes = parseInt(count / 60, 10);
//     seconds = parseInt(count % 60, 10);
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;
//     document.getElementById("timer").innerHTML = minutes + ":" + seconds;
//     // 타이머 끝
//     if (--count < 0) {
//       clearInterval(timer);
//       document.getElementById("timer").innerHTML = "";
//       isRunning = false;
//     }
//   }, 1000);
// }
/*
var connection = require("../../config/db");

function start_timer() {
  var course_name = document.getElementsByClassName("att_name")[0].innerHTML;
  console.log(course_name);
  connection.query(
    "SELECT att_valid FROM course WHERE coure_name= ?",
    [course_name],
    function (err1, rows1) {
      var valid = rows1[0].att_valid;
      if (valid) {
        connection.query(
          "SELECT attendance_time FROM attendance_info JOIN course ON course.course_id= attendance_info.course_id WHERE course.course_name=? AND att_valid = 1",
          [course_name],
          function (err, rows) {
            if (err) throw err;
            var att_time = rows[0].attendance_time;

            var timer = setInterval(function () {
              const now = new Date(); // 현재 시간
              const utcNow =
                now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값
              const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
              const krNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기위해 9시간(밀리세컨드)를 더함

              //시간 구하기
              var hours = ("0" + krNow.getHours()).slice(-2);
              var minutes = ("0" + krNow.getMinutes()).slice(-2);
              var seconds = ("0" + krNow.getSeconds()).slice(-2);
              var now_time = hours + ":" + minutes + ":" + seconds;

              var time = now_time - left_time;
              console.log(time);
              document.getElementById("timer").innerHTML = time;

              if (time < 0) {
                clearInterval(timer);
                document.getElementById("timer").innerHTML = "출석 종료";
              }
            }, 1000);
          }
        );
      }
    }
  );
}*/

