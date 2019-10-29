#!usr/bin/node
const { chapterList, userList} = require('./data');
const http = require('http');
const path = require('path');
const fs = require('fs');
var url = require('url');
var qs=require("querystring");
var id;
http.createServer((req,res)=>{
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
    }
    else if(req.url === '/list'){
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
    else if(req.url == '/chList/'){
        res.write(JSON.stringify(chapterList));
        res.end();
    }
    else if(req.url === '/addChapter'){
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
    else if(url.parse(req.url).pathname === '/detail'){
        var paths = path.join(__dirname,'chapter.html');
        var a =  url.parse(req.url).query;
        id = a.charAt(a.length-1)-1;
        res.writeHead(200,{'Content-Type':'text/html'});
            fs.readFile(paths,'utf-8',(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.end(data);
                }
            })
    }
    else if(url.parse(req.url).pathname === '/getDetail/'){
        res.write(JSON.stringify(chapterList[id]));
        res.end();
    }
    else if(url.parse(req.url).pathname === '/listmanager'){
        var username = url.parse(req.url,true).query.username;
        var password = url.parse(req.url,true).query.pwd;
        if(username == userList[0].username && password==userList[0].pwd){
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
        
    }
    else if(req.url === '/data'){
        res.write(JSON.stringify(chapterList));
        res.end();
    }
    else if(req.url === '/add'){
        var a = {};
        var data= ""; 
         req.addListener("data",(post)=> {
            data += post;
            var title=qs.parse(data).title;
            var content=qs.parse(data).content;
            a.chapterId=chapterList.length+1;
            a.chapterName=title;
            a.chapterDes=content;
            a.chapterContent=content;
            a.publishTimer= "2019-10-27";
            a.author="admin";
            a.views=0;
            a.imgPath='';
            chapterList.push(a);
        });
    }
    else if(req.url !== '/'){
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