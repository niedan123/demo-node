#!/usr/bin/node

const log = console.log;

var buf1 = new Buffer(256);
buf1[0] = 0x11;

log('buf1 length:',buf1.length);
log('\nbuf1:',buf1);

//通过循环，来初始化buffer中的每个字节
for(var i = 0;i<buf1.length;i++){
  buf1[i] = i;
}
log('\nbuf1',buf1);

buf1.fill (0,0,256);
log('buf1',buf1);

var buf2 = buf1.slice(250,256);
log('buf2',buf2);
log('buf2',buf2.toJSON());

log('buf2',JSON.stringify(buf2));

var arr = ['a',0xba,0xdf,0x00,255,10];
var buf3 = new Buffer(arr);
log('buf3',buf3);

var buf4 = new Buffer('Hello World!');
log('buf4',buf4);

buf4.copy(buf3,0,0,buf3.length);
log('buf3',buf3);

var str = '你好 niedan';
var buf5 = new Buffer(str,'utf8');
log('\nbuf5 length',buf5.length);
log('buf5 content:',buf5);
log('string length',str.length);
