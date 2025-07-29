const express=require('express')
const cors=require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const app=express();
app.use(cors())
app.use(express.json())

const note=require('./Router/NoteRoute')
const PORT=process.env.PORT||7777;
app.use('/notes',note);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
const Dbcon=(async()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Successfully connected to the database")
    }
    catch(error)
    {
        console.log(error);
    }
})
Dbcon()

app.get('/',(req,res) => {
    res.json({message:" message"})
})
