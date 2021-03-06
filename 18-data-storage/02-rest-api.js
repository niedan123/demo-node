#!/usr/bin/node

const http = require('http'),
  log = console.log,
  fs = require('fs');
var items = loadData();
http.createServer((req,res)=>{
  log(`${req.method}${req.url}HTTP/${req.httpVersion}`);
  log(req.headers);
  log('');
  switch(req.method){
    case 'GET':
      select(req,res);
      break;
    case 'POST':
      inset(req,res);
    case 'PUT':
      update(req,res);
      break;
    case 'DELETE':
      remove(req,res);
      break;
    default:
      err(res);
  }

  res.end('OK!');
}).listen(8080);
function select(req,res){
  var data = JSON.stringify(items);
  res.setHeader('Content-Length',Buffer.byteLength(data));
  res.setHeader('Access-Control-Allow-Orign','*');
  res.end(data);
}
function inset(req,res){
  var item = '';
  req.on('data',(data)=>{
    item +=data;
  })
  req.on('end',()=>{
    console.log('items = ',items)
    items.push(item);
    res.end('Insert OK');
  })
  res.end(res.method);
}
function update(req,res){
  
  res.end(req.method);

  
}
function remove(req,res){
  var id = req.url.split(1,req.url.length);
  
  //validata id:1 type 2,range
  items.splice(id ,1);
  res.end('Delete OK!');
}
function err(res){
  res.end(res.end);
}
function loadData(){
  try{
    var data = fs.readFileSync('./todo-list.txt','utf8');
    return JSON.parse(data);
  }catch(e){
    return[];
  }
}

process.on('SIGINT',()=>{
  fs.writeFileSync('./todo-list.txt',JSON.stringify(items));
  process.exit();
})
