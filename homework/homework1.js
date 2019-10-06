#!/usr/bin/node


const fs  = require('fs'),
dir = process.argv[2];
var args = process.argv.splice(2);
if(typeof(dir) === 'undefined'){
  console.log("未输入任何参数，请重新输入！");
  process.exit(1);
}
if(args == 'list'){
  try {
    var fileName = fs.readdirSync(__dirname);
    console.log("[");
    for(var i = 0 ;i<fileName.length;i++){
      var a = __dirname+"/"+fileName[i];
      console.log("{fileName:"+fileName[i]+",fileSize:"+fs.statSync(a).size+"}");
     
    }
    console.log("]");
   
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }

}

if (args[0]=='mkdir'){

  if(typeof(args[1]) === 'undefined') {
      console.error('没有指定要创建的目录名称！');
        process.exit(1);

  }
  
  fs.mkdirSync(args[1]);


}
