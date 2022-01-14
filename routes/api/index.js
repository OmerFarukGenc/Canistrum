const express = require("express")
const router = express.Router();


const path = require("path");
const fs = require("fs");
fs.readdirSync(__dirname,{withFileTypes: true})
.filter(dirent => dirent.isDirectory())
.forEach(
    file => {console.log("FILE " + file.name);}
);



router.get("/",(req,res) => {
    res.send("api route")
});

module.exports = router;