#!/usr/bin/node

const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
   if(req.url === '/favicon.ico') return;
   var fileName = __dirname + req.url;
   console.log(fileName);
   res.end(fs.readFileSync(fileName)).toString('utf8');
}).listen(8080);
