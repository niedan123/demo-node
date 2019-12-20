#!/usr/bin/node

var msg = ['Name','Email','QQ','Mobile'];

var usr = {},i = 1;

process.stdout.write(msg[0] + ':');

process.stdin.on('data',function(data){
  usr[msg[i-1]] = data.slice(0,data.length-1).toString('utf8');
  if(i === 4){
    console.log(usr);
    process.exit();
  }else{
    process.stdout.write(msg[i++] + ':');
  }
});

process.stdin.on('end',() =>{
  console.log(usr);
})
