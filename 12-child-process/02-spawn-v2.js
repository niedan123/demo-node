#!/usr/bin/node

const cp = require('child_process');

var child = cp.spawn('./02-child.js',[],{'detached':true,'stdio':['ignore',1,2]});

console.log("I am father with id ",process.pid);
  
global.setTimeout(function(){
  console.log("father bye!");
  process.exit();
},5000);
