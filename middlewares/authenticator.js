const dotenv = require("dotenv")
dotenv.config()

const jwt = require("jsonwebtoken")
const user = require("../models/user")

const authenticator = (req,res,next) => {
    if(req.cookies.token == null){
        req.auth = false;
        next();
        return;
    }

    const token = req.cookies.token;

    jwt.verify(token,process.env.TOKEN_SECRET, async (err,username) => {
        if(err){
            console.log("ERROR IN AUTHENTICATOR")
            console.log(err)
            req.auth = false
            next()
            return
        }else{
            var u = null;
            try{
                u = await user.find({username:username}).exec();
            }catch(err){
                req.auth = false;
                console.log(err);
                next();
                return;
            }

            if(u.length != 1){
                req.auth = false;
                next();
                return;
            }

            if(u[0].username != username){
                req.auth = false;
                next();
                return;
            }
            

            req.auth = true;
            req.username = username;
            next()
            return;
        }

    })
}

module.exports = authenticator;