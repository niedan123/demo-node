#!/usr/bin/node

const cp = require('child_process');

console.log('I am father id :',process.pid);
var child = cp.fork('./02-child.js',['04-fork.js']);
 
global.setTimeout(function(){
   child.send('Hello Im your father');
},5000);


