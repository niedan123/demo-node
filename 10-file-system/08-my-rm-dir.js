#!/usr/bin/node

const fs = require('fs'),
      dir = process.argv[2] || __dirname;
fs.rmdirSync(dir);
