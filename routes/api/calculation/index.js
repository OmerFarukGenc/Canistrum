const express = require("express")
const router = express.Router();
const good = require("../../../models/good");

router.post("/",async (req,res) => {
    const basket = req.body;
    var oldCost = 0;
    var newCost = 0;
    for(var i = 0;i < basket.length;i++){
        const b = basket[i];
        const amount = b.amount;
        const gId = b.id;
        const g = await good.findById(gId);
        var oldSubCost = amount * g.oldPrice;
        var newSubCost = amount * g.newPrice;
        oldCost += oldSubCost;
        newCost += newSubCost;
    }

    console.log("OLD COST " + oldCost);
    console.log("NEW COST " + newCost);

    if(oldCost == 0)
        res.send({inflation:0})
    else
        res.send({inflation:((newCost - oldCost) / oldCost) * 100});
    return;
});

module.exports = router;
