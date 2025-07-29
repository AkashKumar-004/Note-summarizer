const mongoose=require('mongoose')
const NoteModle=new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true   
    },
    summary:{
        type:String
    }
})
module.exports = mongoose.model('Note',NoteModle);