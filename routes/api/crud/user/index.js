const express = require("express")
const router = express.Router();
const user = require("../../../../models/user");


router.get("/",async (req,res) => {
    res.send(await user.find())
})


module.exports = router;

