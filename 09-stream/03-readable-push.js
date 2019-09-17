#!/usr/bin/node

const Read = require('stream').Readable;

var r = new Read();

r.push('hello\n');
r.push('world!');
r.push(null);

r.pipe(process.stdout);

