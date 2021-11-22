//join_script.js

//유효성 검사
function checkAll() {
  if (!checkUserId(form.userid.value)) {
    return false;
  } else if (
    !checkPassword(form.userid.value, form.password.value, form.pw_check.value)
  ) {
    return false;
  } else if (!checkName(form.username.value)) {
    return false;
  } else if (!checkEmail(form.uEmailFirst.value, form.email_select.value)) {
    return false;
  }

  return true;
}

function checkUserId(id) {
  var idRegExp = /^[0-9]{8}$/;
  if (!idRegExp.test(id)) {
    alert("학번은 숫자 8자리 입니다!");
    form.userid.value = "";
    form.userid.focus();
    return false;
  }
  return true;
}

function checkPassword(id, password1, password2) {
  var password1RegExp = /^[a-zA-Z0-9]{8,16}$/;
  if (!password1RegExp.test(password1)) {
    alert("비밀번호는 영문 대소문자와 숫자 8~12자리로 입력해야합니다!");
    form.password.value = "";
    form.password.focus();
    return false;
  }

  if (password1 != password2) {
    alert("두 비밀번호가 맞지 않습니다.");
    form.password.value = "";
    form.pw_check.value = "";
    form.password.focus();
    return false;
  }

  if (id == password1) {
    alert("아이디와 비밀번호는 같을 수 없습니다!");
    form.password.value = "";
    form.pw_check.value = "";
    form.password.focus();
    return false;
  }
  return true;
}

function checkName(username) {
  var nameRegExp = /^[a-zA-Z가-힣]{2,5}$/;
  if (!nameRegExp.test(username)) {
    alert("이름이 올바르지 않습니다.");
    form.username.value = "";
    form.username.focus();
    return false;
  }
  return true;
}

function checkEmail(uEmailFirst, email_select) {
  if (uEmailFirst == "") {
    alert("이메일을 입력하시오.");
    form.uEmailFirst.value = "";
    form.uEmailFirst.focus();
    return false;
  }
  if (email_select == "") {
    alert("이메일을 입력하시오.");
    form.email_select.value = "";
    form.email_select.focus();
    return false;
  }
  return true;
}

//화면에 띄우기
function checkPasswordPattern(str) {
  var pass = str.value;
  var message = "";
  var color = "";

  if (pass.length) {
    if (pass.length < 8 || pass.length > 16) {
      message = "비밀번호는 8자리 이상 16자리 이하만 가능합니다.";
      color = "red";
    }
    document.getElementById("makyText").innerHTML = message;
    document.getElementById("makyText").style.color = color;
  }
}

function isSame() {
  if (
    document.getElementById("password").value != "" &&
    document.getElementById("pw_check").value != ""
  ) {
    if (
      document.getElementById("password").value ==
      document.getElementById("pw_check").value
    ) {
      document.getElementById("checkText").innerHTML = "비밀번호가 일치합니다.";
      document.getElementById("checkText").style.color = "blue";
    } else {
      document.getElementById("checkText").innerHTML =
        "비밀번호가 일치하지 않습니다.";
      document.getElementById("checkText").style.color = "red";
    }
  }
}
