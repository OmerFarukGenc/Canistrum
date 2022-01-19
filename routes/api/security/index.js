const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const router = express.Router();
const user = require("../../../models/user");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

router.post("/login",async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await user.find({username:username}).exec();

    if(result.length != 1){
        res.send("username error");
        return
    }


    const compare = await bcrypt.compare(password,result[0].password);

    if(compare){
        const token = jwt.sign(req.body.username,process.env.TOKEN_SECRET);
        jwt.sign
        res.status(200);
        res.send({token:token});
        return        
    }
    res.status(401);
    res.send({token:null});

});

router.post("/register",async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const result = await user.find({username:username}).exec();

    if(result.length != 0){
        res.send("username exists");
        return
    }
    
    try{
        const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))

        const u = await (new user({username:username,password:hashedPassword})).save()
        res.send(u);
        return
    }catch(err){
        res.send(JSON.stringify(err));
        return
    }

});

module.exports = router;