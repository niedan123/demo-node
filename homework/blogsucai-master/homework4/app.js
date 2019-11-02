#!/usr/bin/node
var express = require('express');
var app = express();
var session = require('express-session');
var bodyparser = require('body-parser');

app.set('views', __dirname); //设置模板的目录
app.set('view engine', 'html'); // 设置解析模板文件类型：这里为html文件
app.engine('html', require('ejs').__express); // 使用ejs引擎解析html文件中ejs语法

app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));
app.get('/login', function(req, res){
    res.sendFile(__dirname + '/login.html')
});
app.post('/login', function(req, res){
    var count = 1;
    console.log(req.body.username)
    if(req.body.username == 'zhangsan' && req.body.pwd == '123'){
        if(typeof req.headers['cookie'] === 'undefined') {
            count = 1;
          } else {
            var pair = req.headers['cookie'].split('=');
            count = Number(pair[1]) + 1;
          }
          res.setHeader('Set-cookie', `count=${count}; max-age=10000000`);
          res.end(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>状态保持</title></head><body><h1>你这是第 ${count} 次访问本网站！</h1></body></html>`);
    }
});
app.listen(8081,function(){});