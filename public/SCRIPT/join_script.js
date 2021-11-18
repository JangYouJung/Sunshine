//join_script.js


function checkPasswordPattern(str) {

    var pass = str.value;
    var message = "";
    var color = "";

     if (pass.length) {
         if (pass.length < 8 || pass.length > 16) {
             message = "비밀번호는 8자리 이상 16자리 이하만 가능합니다.";
             color = 'red';
         }
         document.getElementById("makyText").innerHTML = message;
         document.getElementById("makyText").style.color = color;
       
    }
}

function isSame() {

    if (document.getElementById('password').value != '' && document.getElementById('pw_check').value != '') {
        if (document.getElementById('password').value == document.getElementById('pw_check').value) {
            document.getElementById('checkText').innerHTML = '비밀번호가 일치합니다.';
            document.getElementById('checkText').style.color = 'blue';
        }
        else {
            document.getElementById('checkText').innerHTML = '비밀번호가 일치하지 않습니다.';
            document.getElementById('checkText').style.color = 'red';
        }
    }


}
       

    
