const mongoose = require("mongoose")

const goodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    oldPrice: {type:Number,required:true},
    newPrice: {type:Number,require:true}
})

module.exports = mongoose.model("Good",goodSchema)