#!usr/bin/node
const { chapterList, userList} = require('./data');
const http = require('http');
const path = require('path');
const fs = require('fs');
var url = require('url');
var qs=require("querystring");
var Id;
var now={};
http.createServer((req,res)=>{
    // req.url获取url的所有信息，包括后面的参数
    //url.parse(req.url).pathname  只获取请求的路径名
    //后台登录页面
    if(req.url === '/login'){
        var paths = path.join(__dirname,'login.html');
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile(paths,'utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }else{    
                res.end(data);
            }
        })
        //后台文章页
    }else if(url.parse(req.url).pathname == '/listmanager'){
        //query.username获取到用户名
        var username=url.parse(req.url, true).query.username;
        var pwd=url.parse(req.url, true).query.pwd
        if( username== userList[0].username &&  pwd==userList[0].pwd ){
            var paths = path.join(__dirname,'list.html');
            res.writeHead(200,{'Content-Type':'text/html'});
            fs.readFile(paths,'utf-8',(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.end(data);
                }
            })
        }else{
            var paths = path.join(__dirname,'login.html');
            res.writeHead(200,{'Content-Type':'text/html'});
            fs.readFile(paths,'utf-8',(err,data)=>{
                if(err){
                    console.log(err);
                }else{    
                    res.end(data);
                }
        })
            // res.end('404 USER IS NOT FOUND');
        }
        //前端文章列表
    }else if(req.url === '/list'){
        var listPath = path.join(__dirname,'chapterList.html');
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile(listPath,'utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        })
    }
    else if(req.url == '/chaplist/'){
        res.write(JSON.stringify(chapterList));
        res.end();
    }
    //详情
    else if(url.parse(req.url).pathname == '/detail'){
            var paths = path.join(__dirname,'chapter.html');
            Id=url.parse(req.url).query.replace(/chapterId=/,"")-1;
            res.writeHead(200,{'Content-Type':'text/html'});
            fs.readFile(paths,'utf-8',(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.end(data);
                }
            })
            //增加文章页
    }else if(req.url === '/addChapter/'){
        var listPath = path.join(__dirname,'addChapter.html');
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile(listPath,'utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        })
    }
    else if(req.url == '/tits/'){
        res.write(JSON.stringify(chapterList));
        res.end();
    }else if(req.url == '/now/'){
        res.writeHead(200,{'Content-Type':'text/json'});
            now=chapterList[Id];  
            res.end(JSON.stringify(now));
    }else if(req.url == '/addtit'){
        console.log('添加成功')
        var newl = {};
        var data= ""; 
        // 数据块接收中
         req.addListener("data",(post)=> {
            data += post;
            var title=qs.parse(data).title;
            var content=qs.parse(data).content;
            newl.chapterId=chapterList.length+1;
            newl.chapterName=title;
            newl.chapterDes=content;
            newl.chapterContent=content;
            newl.publishTimer= "2019-10-27";
            newl.author="admin";
            newl.views=1;
            newl.imgPath='';
            chapterList.push(newl);
        });
    }else if(req.url !== '/'){
        var urls = '.'+req.url;
        res.writeHead(200,{'Content-type':"text/css"});
        fs.readFile(urls,(err, data)=> {
            if (err) {
                console.log(err);
            }else{
                res.end(data);
            }
        });
    }
}).listen(8083);