#!/usr/bin/node

const EventEmmiter = require('events').EventEmitter;

var e = new EventEmmiter();

setInterval(function(){
  e.emit('hello');
},1000);

setInterval(function(){
  e.emit('bye');
},5000);

e.on('hello',function(){
  console.log('hello event emit!');
});
e.on('bye',function(){
  console.log('goodbye!');
  process.exit();
})
