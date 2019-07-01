// express框架
const express = require("express"),
      app = express();
// 引用bodyParser
const bodyParser = require("body-parser");

// 端口
const port = process.env.PORT || 9999;
// 数据库引用，以及链接数据库
const sql = require("mysql");
      Keys = require("./config/keys");
	  pool = sql.createPool(Keys.sqlKey);
// 时间
const times = require("silly-datetime");
	  time = times.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

const passport = require("passport");
// 使用bodyParser中间间
app.use(bodyParser.urlencoded({extended:true}));

// passport初始化
app.use(passport.initialize());
require("./config/passprot")(passport);


// 路由器
app.use('/api/users',require("./router/api/users"));


// 当前页面
app.use('/',(req,res)=>{
	res.send("Hello World!");
});

// 启动
app.listen(port,()=>{
    console.log(`服务器启动成功端口号为： ${port}`);
});



