#!/usr/bin/node
const user = { 
  name: '聂丹',
  age:  20,
  qq:   '2911843931'
};

const log = console.log;

// 三种占位符
 log('name: %s', user.name);   
 log('age: %d', user.age);     
 log('JSON: %j', user);        

 log('qq: %s', user.qq);       
 log('qq:', user.qq);          
 log('qq: ' + user.qq);        
 log(`qq: ${user.qq}`);       
 console.error('Error! something wrong!');
