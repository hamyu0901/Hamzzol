const mongoose = require('mongoose');

const textSchema = mongoose.Schema({
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String
    },
    time : {
        type: String,
        // default:new Date()
    }
})

const Text = mongoose.model('Text',textSchema)
module.exports={Text}