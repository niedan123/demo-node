#!/usr/bin/node

process.on('SIGINT',()=>{
  console.log('ctrl+c or kill');
  process.exit();
})
process.on('SIGTSTP',()=>{
  console.log('ctrl + z'));
});

