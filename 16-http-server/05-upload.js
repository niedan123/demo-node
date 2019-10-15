#!/usr/bin/node

const http = require('http'),
      url = require('url'),
      qs = require('querystring');
      log = console.log;
var items = [];
http.createServer((req,res)=>{
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log();

  req.pipe(process.stdout);
    


  if(req.url === '/'){
    //200 ok
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(html);
  }else{
    //404 not found
    var it = qs.parse(url.parse(req.url).query);
    if(typeof it !== 'undefined' ){
      items.push(it);
    }
      }

  var html = getHTML();
}).listen(8080);

function getHTML(){
 return  html = ''
  +'<!DOCTYPE html>'
  +'<html lang="en">'
  +'<head>'
  +'<meta charset="UTF-8">'
  +'<title>TODO List</title>'
  +'<head>'
  +'<body>'
  +'<h1>TODO List </h1>'
  +'<ul>'
  +items.map(function(it){return '<li>'+it+'</li>'}).join('\n')
  +'<ul>'
  +'<form metho="GET" action="/">'
  +'<input ytpe="text" name="item">'
  +'<input type="submit" value="提交">'
  +'</form>'
  +'</body></html>';
 
}

