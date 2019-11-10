#!usr/bin/node
const express = require('express'),
    app = express();
const path = require('path');
const fs = require('fs');
var url = require('url');
var data1;
var file = path.join(__dirname,'data.json');
        fs.readFile(file, 'utf-8', function(err, data) {
            if (err) {
                res.send('文件读取失败');
            } else {
                data1 = data.toString();
                data1 = JSON.parse(data1);
            }
        });
app.use(express.static(__dirname));
app.get('/login',(req,res)=>{
    var paths = path.join(__dirname,'login.html');
    res.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile(paths,'utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{    
            res.end(data);
        }
    })
});
app.get('/list',(req,res)=>{
    var username = url.parse(req.url,true).query.username;
        var password = url.parse(req.url,true).query.pwd;
        if(username == data1.users[0].username && password==data1.users[0].password){
            var listPath = path.join(__dirname,'list.html');
            res.writeHead(200,{'Content-Type':'text/html'});
            fs.readFile(listPath,'utf-8',(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.end(data);
                }
            })
        }
        else{
            res.end(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>状态保持</title></head><body><h1>用户名密码错误，请重新输入</h1></body></html>`);
        }
});
app.get('/data',(req,res)=>{
    res.write(JSON.stringify(data1.chapterList));
    res.end();
});
app.listen(8080);