function handleOnChange(e) {
	//선택된 데이터의 텍스트 값 가져오기
	const text = e.options[e.selectedIndex].text;
	if (text === "강의목록") {
		document.getElementById('v40_329').style.display = "none"; //인증번호 입력창 숨기기
		document.getElementById('message').style.display = "block"; //강의 선택 요청 문구 보이기
	} else {
		document.getElementById('v40_329').style.display = "block"; //인증번호 입력창 보이기
		document.getElementById('message').style.display = "none"; //강의 선택 요청 문구 숨기기
		
		//선택한 데이터 출력
		document.getElementById('v40_337').innerText = text;
	}
	
}