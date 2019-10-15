#!/usr/bin/node
const log = console.log,
      url = require('url'),
      fs = require('fs'),
      http = require('http');
var item=[];
http.createServer((req,res)=>{
  log(`${req.method}${req.url}HTTP/${req.hasOwnProperty}`);
  log(req.headers);
  log();

  var item = ['eats'];
  if(req.method ==='GET' && req.url == '/'){
    res.writeHead(200,{'Content-Type':'text/html','Content-length':Buffer,byteLength(getHTML,'utf8')});
    res.end(getHTML);
    }else if(req.method ==='POST' && req.url == '/'){
      
})
function getHTML(){
  //read html file
  var html = fs.readFileSync('todo.html').toString('utf8');

  //write real data
  html = html.replace('%',item.map(function(item){return '<li>'+item+'</li>';}).join('\n'));
  return html;
}
