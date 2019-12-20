#!/usr/bin/node
const mysql = require('mysql'),
      con = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'ddd',
        database : 'test'
      });
con.connect();

//增

/*con.query('insert into books(book_id , title , status) values(?,?,?)',['103','wangding',0],(err , result )=>{
  if(err){
    console.log(err.message);
    process.exit(1);
  }
});*/


//删
/*con.query('delete from books where book_id = ?',['103','wangding',0],(err , result )=>{
  if(err){
    console.log(err.message);
    process.exit(1);
  }
  process.exit(1);
});*/


//改
/*con.query('update books set title = ? where book_id = ?',['hello world',102],(err , result )=>{
  if(err){
    console.log(err.message);
    process.exit(1);
  }
});*/

//查
con.query('select * from books',(err , result )=>{
  if(err){
    console.log(err.message);
    process.exit(1);
  }
})

