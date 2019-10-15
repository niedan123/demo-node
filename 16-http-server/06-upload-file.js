#!/usr/bin/node

const http = require('http'),
      qs = require('querystring'),
      fs = require('fs'),
      log = console.log;

http.createServer((req,res)=>{
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log();

  var fl = '';
  req.setEncoding('binary');
  req.on('data',(data) => {
    fl+= data;
  });

  req.on('end', ()=>{
    //parse fl
    //get file name

    var filename=qs.parse(fl.split('\r\n')[1].split(';')[2].trim()).filename;
  filename = filename.slice(1,filenam.length-1)
  log(filename);
  var filedata = fl.split('\r\n')[4];
  log(filedata);
  //step 2:save file

   fs.writeFileSync(filename,fildata,{'encoding':'binary'})
  })

  req.pipe(process.stdout);
 
    res.end('OK!');

}).listen(8080);

