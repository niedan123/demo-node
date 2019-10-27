#!/usr/bin/node

const log = console.log;

log('process id',process.pid);

process.stdin.resume();

process.on('SIGINT',()=>{
  log('your press ctrl+c');
  process.exit();
});

process.on('SIGSTP',()=>{
  log('your press ctrl + z,stop running');
  process.exit();
})


