const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const connection = require("./config/db");

exports.surveyEmail = function () {
  connection.query(
    "select course_id, course_name, date_format(survey_date, '%Y%m%d') as survey_date from course order by survey_date",
    function (err, rows) {
      let context3 = [];
      for (var i = 0; i < rows.length; i++) {
        const date = new Date(
          rows[i].survey_date.substring(0, 4),
          rows[i].survey_date.substring(4, 6) - 1,
          rows[i].survey_date.substring(6, 8),
          21,
          28,
          50,
        );

        context3.push(date);

        let surveyDate = rows[i].survey_date;
        let courseName = rows[i].course_name;
        let courseId = rows[i].course_id;

        var job = schedule.scheduleJob(context3[i], function () {
          let context = [];

          console.log("안녕");

          connection.query(
            "select distinct attendance.student_id from course join attendance where course.course_id = attendance.course_id and course.survey_date = ? and attendance.course_id = ?",
            [surveyDate, courseId],
            function (err, rows1) {
              for (var j = 0; j < rows1.length; j++) {
                connection.query(
                  "select distinct student.email from student join attendance where student.student_id = attendance.student_id and student.student_id = ? ",
                  [rows1[j].student_id],
                  function (err, rows2) {
                    if (err) {
                      throw err;
                    }                 
                      context.push(rows2[0].email + ","); //보내는 이메일 context에 저장}
                    
                  }
                );
              }
            }
          );

          // e-mail message options
          const mailOptions = {
            from: "sunshine.lecture@gmail.com",
            to: context, //보내는 이메일
            subject: "sunshine 특강 만족도 조사", //메일 제목
            html:
              courseName +
              "  만족도 조사 참여 부탁드립니다" +
              " <p>https://sunshine.sungshin.ac.kr</p>",
            //메일 내용
          };

          // e-mail transport configuration
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "sunshine.lecture@gmail.com", //아이디
              pass: "sunshine!12", //비번
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          // Send e-mail
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        });
      }
    }
  );
};