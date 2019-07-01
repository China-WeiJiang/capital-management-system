const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require("./keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secreOrKey;



module.exports = passport =>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        pool.getConnection((err,con)=>{
            if (err) throw err;
            con.query("select * from user where id='"+jwt_payload.id+"'",(err,data)=>{
               if (err) throw err;
               return done(null,data);
            });
            con.release();
        })
    }));
};