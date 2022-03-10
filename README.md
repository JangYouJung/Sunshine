# 🔮 Sungshin 특강 스마트출석 시스템
<img src = "https://user-images.githubusercontent.com/55652102/157665575-3ec959fd-6d54-4d8b-ae47-17705189050f.png" width="100%" height="100%">
2021년 2학기 데이터베이스프로그래밍 팀프로젝트 11팀 (김다은, 박민영, 이나연, 장유정)
<br>
<br>

* **프로젝트 주제**

    성신여자대학교 특강 스마트출석 시스템 웹사이트

<br>

* **프로젝트 개요**

    교내 S+마일리지 지급 전용 특강을 수강할 때, 특강마다 Zoom 채팅, 마무리 퀴즈 등등 출석 기준이 달라 학생들은 일일이 기억하기가 불편하고, 교직원들은 하나하나 확인하면서 출석을 체크해야 하는 불편함이 있습니다. 또한 특강을 출석했지만 최종적으로 S+마일리지를 받으려면 Sunshine 홈페이지에서 5일 내에 만족도조사를 완료해야 하는데, 이에 대한 마감 알림 등등이 존재하지 않아 잊어버리기 쉬워 불편함이 있습니다. <br>
    따라서 S+마일리지 지급 전용 특강들을 위한 스마트출석 인증 사이트를 제작하고, 스마트 출석 기능을 통해 출석 인증 기준을 명확하게 하나로 맞추어 이를 통해 학생들과 특강 관리자가 출석 현황을 간편하게 확인하고 이용할 수 있도록 Sungshin 특강 스마트출석 시스템 웹사이트를 제작하였습니다.

<br>
<br>


# 주요 기능
### 🔐 학생 회원가입
* **실행 화면**

  <img src = "https://user-images.githubusercontent.com/55652102/157668318-35788da0-8c68-470e-9e8e-afa263ac467c.gif" width="100%" height="100%">
<br>
<br>



### 👩‍🎓 학생 로그인
* **개요**

    로그인에서 학생/교직원 여부를 체크하게 하고, 자신의 소속에 따라 각각 다른 메인 페이지를 보여줍니다.
    <img src = "https://user-images.githubusercontent.com/55652102/157670258-6aa69ba2-fb85-432b-8dca-8668cfed21e1.png" width="100%" height="100%">
<br>

* **실행 화면**

  <img src = "https://user-images.githubusercontent.com/55652102/157668323-ffbb0231-ce68-4d62-8856-7926e46fdb45.gif" width="100%" height="100%">
<br>
<br>



### 👩‍🏫 교직원 로그인
* **실행 화면**

  <img src = "https://user-images.githubusercontent.com/55652102/157668324-ee4f355f-53bb-45e2-a7b8-5eeef3b78034.gif" width="100%" height="100%">
<br>




### ✔️ 출석 인증
* **기능**
    > **교직원 - 출석 인증 시작**
    
    출결 관리자가 자신이 관리하고 있는 특강 목록 중 출석 체크를 진행할 특강을 선택하여 인증 번호를 생성하고, 학생들에게 공지합니다. 생성된 인증 번호는 10분 동안 유효하고, 인증번호 우측에서 남은 시간을 확인할 수 있습니다. 이때 1차, 2차 등 여러 번에 걸친 출석 체크를 진행할 수 있습니다.

    <img src = "https://user-images.githubusercontent.com/55652102/157672819-7e131a3f-d0d9-4e8d-af2c-a44c40826a38.png" width="100%" height="100%">
    
    <br>

    > **학생 - 출석 인증**

    출결 관리자가 자신이 관리하고 있는 특강 목록 중 출석 체크를 진행할 특강을 선택하여 인증 번호를 생성하고, 학생들에게 공지합니다. 생성된 인증 번호는 10분 동안 유효하고, 인증번호 우측에서 남은 시간을 확인할 수 있습니다. 이때 1차, 2차 등 여러 번에 걸친 출석 체크를 진행할 수 있습니다.

    <img src = "https://user-images.githubusercontent.com/55652102/157673177-f37fb869-f28c-47c2-ba91-8a1463dc6148.png" width="100%" height="100%">
    
    <br>

    > **교직원 - 출석 관리**

    출결 관리자는 마이페이지에서 출석 정보를 확인할 수 있습니다. 특강의 각 차시를 선택하면 출석인증이 완료된 인원 수와 학생 정보를 열람할 수 있습니다.

    <img src = "https://user-images.githubusercontent.com/55652102/157673454-9e602a62-2ba9-46dc-b719-12999f6dc762.png" width="100%" height="100%">
    
    <br>


* **실행 화면**

  <img src = "https://user-images.githubusercontent.com/55652102/157668327-9ba8d37d-0d92-4080-94e6-5728126671ec.gif" width="100%" height="100%">
<br>
<br>

### 📬 이메일 예약
* **개요**

    Sunshine 홈페이지에서 만족도조사 기간이 임박할 때, 해당 특강 출석을 인증한 학생들에게 마감 안내 이메일을 자동으로 전송합니다.

* **실행 화면**
    
    <img src = "https://user-images.githubusercontent.com/55652102/157668328-f4f8afa3-a13b-4fdf-9f6b-89096a2491d9.gif" width="100%" height="100%">

<br>
<br>
  
# 📹 프로젝트 영상
* [프로젝트 데모영상](https://youtu.be/Rs0VtGXXfao)

<br>
<br>

# 📝 프로젝트 최종 보고서
* [최종 보고서](https://drive.google.com/file/d/18Zwk-4mVHwkUvAuJAqudywJGZ1rB9KPH/view?usp=sharing)
* [실행 매뉴얼](https://drive.google.com/file/d/1uOMYjuaMBPU5V3ZbzyKDOg8BfXGBH9Qd/view?usp=sharing)



<br>
<br>

# ➕ 참고 사항
* 구성

    * Script폴더: 자바스크립트 코드(프론트앤드 관련)
    * Routes 폴더: nodejs 코드(백엔드 관련)
    * Config 폴더- db.js(데이터베이스 연동) 
    * User.session.js (세션 설정) 
    * Views 폴더 : ejs파일들(브라우저에 렌더링할 html코드) 

<br>

* ejs 기본 사용법

    * <% %> : JS 코드 작성
    * <%_ _%> : 태그 내부 공백 제거
    * <%# %> : 주석
    * <%= %> : 변수 출력(html escape 처리)
    * <%- %> : html escape 처리 없이 출력