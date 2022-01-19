const express = require("express")
const router = express.Router();
const user = require("../../../models/user");

router.get("/whoami",async (req,res) => {
    if(req.auth == false){
        res.status(401)
        res.send({username:null});
        return;
    }

    var u = null;
    try{
        u = await user.find({username:req.username});
    }catch(err){
        req.status(400);
        res.send({username:null});
        return
    }

    if(u.length == 1){
        res.status(200);
        res.send({username: req.username});
        return
    }
});

module.exports = router;