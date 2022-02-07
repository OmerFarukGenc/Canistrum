const express = require("express")
const router = express.Router();
const good = require("../../../../models/good");


router.get("/", async (req, res) => {
    res.send(await good.find());
})

router.get("/:id", async (req, res) => {
    res.send(await good.findById(req.params.id));
})

router.post("/", async (req,res) => {
    console.log(req.body);
    const newGood = new good(req.body);
    await newGood.save();
    res.sendStatus(200);
})

router.put("/:id",async (req,res) => {
    await good.findByIdAndUpdate(req.params.id,req.body);
    res.sendStatus(200);
})


router.delete("/:id",async (req,res) => {
    await good.deleteOne({_id:req.params.id});
    res.sendStatus(200);
})



module.exports = router;

