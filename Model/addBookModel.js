const mongoose= require("mongoose")

const addBookSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"bookappusers"
    },
    title:{
        type:String,
    },
    ISBN:{
        type:String,
    },
    author:{
        type:String
    },
    description:{
        type:String
    },
    published_date:{
        type:String
    },
    publisher:{
        type:String
    }
})

module.exports= mongoose.model('addnewbooks', addBookSchema)