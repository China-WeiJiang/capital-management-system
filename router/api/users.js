// 登录和注册
const express = require("express"),
      router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// 测试接口 地址: /api/users/text
// 类型 GET
// 返回json数据
// 公开的接口
router.get("/text",(req,res)=>{
    res.json({msg:"成功！"})
});

// 注册接口 地址:/api/users/register
// 类型 POST
// 返回json数据
// 公开的接口
router.post("/register",(req,res)=>{
    // 链接数据库成功！
    pool.getConnection((err,con)=>{
        if(err) throw err;
        con.query("select email from user where email= '"+req.body.email+"'",(err,data)=>{
            if (err) throw err;
            if (!data){
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(req.body.password,salt,(err,hash)=>{
                        if (err) throw err;
                        con.query("insert into user (user,email,password,create_time) values ('"+req.body.user+"','"+req.body.email+"','"+hash+"','"+time+"')",(err,data)=>{
                            if (err) throw err;
                            res.status(200).json({message:'注册成功！',data:data})
                        })
                    });
                });
            } else{
                res.status(400).json({message:'注册失败，邮箱号已经存在！'})
            }
        })
    });
});

// 登录接口 地址:/api/users/login
// 类型 POST
// 返回json数据
// 公开的接口
router.post("/login",(req,res)=>{
    pool.getConnection((err,con)=>{
        if (err) throw err;
        con.query("select * from user where email='"+req.body.email+"'",(err,data)=>{
            if (err) throw err;
            if (!data){
                res.status(404).json({message:'邮箱不存在!'});
            }else{
                bcrypt.compare(req.body.password,data[0].password).then(isMath=>{
                    if (isMath){
                        const rule = {id:data[0].id,name:data[0].user};
                        jwt.sign(rule,Keys.secreOrKey,{expiresIn:3600},(err,token)=>{
                            if (err) throw err;
                            res.json({success:200,token:"Bearer "+token})
                        })
                    } else{
                        return res.status(400).json({message:"密码错误!"});
                    }
                })
            }
        });
        con.release();
    })
});

// 验证token 地址:/api/users/current
// 类型 get
// 返回json数据
// 私密的接口
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json(req.user[0]);
});


module.exports = router;
