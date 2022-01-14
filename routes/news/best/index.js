const express = require("express")
const router = express.Router();


router.get("/",(req,res) => {
    res.send("news best route");
});

module.exports = router;