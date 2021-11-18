var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express(); 
var router = express.Router();
var mysql = require('mysql'); 
var bodyParser = require('body-parser'); 
var path = require('path');
var ejs = require('ejs');


app.use(express.static(__dirname + '/public'));



app.set('view engine', 'ejs'); //'ejs'탬플릿을 엔진으로 한다.
app.set('views', path.join(__dirname, 'views')); //폴더, 폴더경로 지정

app.use (express.json ()) 
app.use (express.urlencoded ({extended : true})) 

app.get('/',(req,res)=>{
    console.log('메인페이지 작동');
    /*console.log(req.session);
    if(req.session.isStudent == true){
        if(req.session.isLogined == true)
        {
            res.render('student_main',{
            isLogined : req.session.isLogined,
            isStudent : req.session.isStudent,
            login_id : req.session.id});
        }
        else{
            res.render('login',{
            isLogined : false});
        }

    } 
    else{
        if(req.session.isLogined == true)
        {
            res.render('staff_main',{
            isLogined : req.session.isLogined,
            isStudent : req.session.isStudent,
            login_id : req.session.id})
        }
       else{
        res.render('login',{
            isLogined : false});
        }
    }*/
    res.render('login')
});
    
app.listen(8080);
