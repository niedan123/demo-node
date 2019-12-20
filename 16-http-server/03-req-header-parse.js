#!/usr/bin/node

const http = require('http'),
      log = console.log;

http.createServer((req,res)=>{
  log('request headers:',req.headers);
  log('Authorization:',req.headers.authorization);
  
  var auth = req.headers.authorization;
  if(typeof auth != 'undefined'){
    auth = auth.split(' ');
    if(auth[0] === 'Basic'){
      var buf = new Buffer(auth[1],'base64');
      log('username & password:',buf.toString('utf8'));
    }
  }

  log('User-Agent:',req.headers['user-agent']);

  

  res.end('OK!');
}).listen(8080);

