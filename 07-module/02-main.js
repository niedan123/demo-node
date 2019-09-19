#!/usr/bin/node


const circle = require('./02-export-object2');

console.log('\ndiameter:\t', circle.diameter(10));
console.log('circumference:\t', circle.circumference(10));
console.log('area:\t\t', circle.area(10));

/*
const p = require('./02-export-var');
console.dir(module);
console.log(p);
*/
/*
const circle = require('./02-export-function');

console.log('r=10,circle area: %d',circle(10).area());
console.log('r = 10,circle circumference: %d',circle(10).circumference());
*/
/*
const circle = require('./02-export-object'),
      log = console.log;
log('r = 10,circle diameter:',circle.diameter(10));
log('r = 10,circle area:',circle.area(10));
console.dir(module);
*/



