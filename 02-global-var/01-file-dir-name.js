#!/usr/bin/node

console.log('dir name:',__dirname);
console.log('fil name:',__filename);

//opterate date file
var file = __dirname + '/data/db.xml';
console.log('file name:',file);

//window data file
file = __dirname + '\\data\\db.xml';
console.log('file name in window:',file);

const path = require('path');
file = path.join(__dirname,'data','db.xml');
console.log(file);
