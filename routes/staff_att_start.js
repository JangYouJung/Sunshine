var express = require("express");
var app = express();
var router = express.Router();
var connection = require("../config/db");

router.post("/", function (req, res) {
	var id = req.body.course_id;

	connection.query(
		"SELECT att_valid FROM course WHERE course_id=?",
		[id],
		function(err, rows){
			if(err){
				throw err;
			}
			var valid = rows[0].att_valid;
			
			if(valid){ // 이미 유효한 정보가 있으면 이전 화면으로 redirect				
				res.write("<script type= 'text/javascript'>alert('This course has valid attendance!');</script>");
				res.write("<script type='text/javascript'>location.href='staff_main'</script>");
			
			}else{//새로운 출석 정보 생성
				/* (1)한번이라도 출석 인증 정보를 생성했다면 DB에서 마지막 차시를 불러와야하고, 
				 * (2)처음 출석 인증을 진행하는 경우에는 '1차시'부터 시작해야한다.*/
				connection.query(//1. 한번이라도 차시를 진행한 적 있는지 알아오기
					"SELECT EXISTS(SELECT * FROM attendance_info WHERE course_id = ?) as T",
					[id],
					function(err2, rows2){
						if(err2) throw err2;
						var exist = rows2[0].T; // SQL 결과값을 exist에 저장했다.

						var attendance_num = Math.floor(Math.random()*90000) + 10000;//5자리 출석 번호 생성
						var att_valid = true;

						const now = new Date(); // 현재 시간
						const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
						const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
						const krNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

						//날짜 구하기
						var year = krNow.getFullYear();
						var month = ('0' + (krNow.getMonth() +1)).slice(-2);
						var day = ('0' + krNow.getDate()).slice(-2);
						var attendance_date = year + '-' + month + '-' + day;
						
						//시간 구하기
						var hours = ('0' + krNow.getHours()).slice(-2);
						var minutes = ('0' + krNow.getMinutes()).slice(-2);
						var seconds = ('0' + krNow.getSeconds()).slice(-2); 
						var attendance_time = hours + ':' + minutes  + ':' + seconds;
						
						async function GenSQLInsert(){ //SQL Insert문을 동기적으로 실행되도록 하는 함수	
							//[1] async, await 사용하여 차시 속성 먼저 받아오기
							let promise = new Promise((resolve, reject) => {
								if(exist){ //(1)DB에서 마지막 차시를 불러와 다음 차시 번호 구성
									connection.query(
										"SELECT max(degree) as max FROM attendance_info WHERE course_id=?",
										[id],
										function(err1, rows1){
											if(err1)throw err1;
											let degree = rows1[0].max + 1;
											console.log('불러온  차시: '+degree);
											resolve(degree);
									});
								}
								else{//(2) 1차시부터 시작
									resolve(1);
								}		
							});
							let att_degree = await promise; 
							console.log(att_degree);
								
							//[2] 1번에서 받아온 차시 속성으로 sql 쿼리를 구성해 DB에 삽입하기 
							connection.query(//생성한 출석 정보 데이터에 삽입
								"INSERT INTO attendance_info(course_id, degree, attendance_num, attendance_date, attendance_time, att_valid) values(?,?,?,?,?,?); UPDATE course SET att_valid = 1 WHERE course_id = ? ",
								[id, att_degree, attendance_num, attendance_date, attendance_time, att_valid, id ],		
								function(err3, rows3){
									if(err3) throw err3;
									setTimeout(function(){ // [3] 10분 후, 출석 종료 
										connection.query(
											"UPDATE course SET att_valid = 0 WHERE course_id = ?; UPDATE attendance_info SET att_valid = 0 WHERE attendance_num = ?",
											[id, attendance_num],
											function(err4, rows4){
												if(err4) throw err4;
												console.log('10분 후 출석 종료');
											}
										);
									},60000); //현재는 1분동안 작동하도록 설정
								
								console.log("정보 삽입 성공");
								// res.write("<script>alert('Attendence Start')</script>");
								// res.write('<script>window.location="staff_main"</script>');
								res.redirect("/staff_attendance?id=" +req.body.course_id);
								
								}
							);
						}

						GenSQLInsert();			
					}
				);							
			}
		}
	);	
});

module.exports = router;
