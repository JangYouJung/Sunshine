var time = 600;
var min = "";
var sec = "";

function start_timer(){
	var timer = setInterval(function(){
		min = parseInt(time/60);
		sec = time%60;
		
		document.getElementByClassName('timer')[0].innerHTML = min "분 " + sec + "초";
		console.log(min "분 " + sec + "초");
		time--;

		if (time < 0){
			clearInterval(timer);
			document.getElementByClassName('timer')[0].innerHTML = "출석 종료";
		}
	},1000);
}
