#!/usr/bin/node

var msg = ['Name','Email','QQ','Mobile'];
var usr = {},i = 0;
console.log(msg[0] + ':');
process.stdin.on('data',function(data){
  usr[msg[i]] = data.slice(0,data.length-1).toString('utf8');
  console.log(msg[++i] + ':');
});
