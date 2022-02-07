const express = require("express")
const router = express.Router();
const good = require("../../../models/good");




router.get("/",async (req,res) => {
    const goods = await good.find();
    //console.log(JSON.stringify(goods));
    res.render("crud/good/list",{goods:goods});
    return;
});

router.get("/add",async (req,res) => {
    res.render("crud/good/add");
    return;
})

router.get("/:id",async (req,res) => {
    console.log(req.params.id);
    const g = await good.findById(req.params.id);
    res.render("crud/good/view",{good:g});
    return;
})

router.get("/edit/:id",async (req,res) => {
    console.log(req.params.id);
    const g = await good.findById(req.params.id);
    res.render("crud/good/edit",{good:g});
    return;
})

module.exports = router;