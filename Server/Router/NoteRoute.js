const express=require('express')
const router=express.Router();
const Note=require('../Model/NoteModel')
const {getSummary, getcontent}=require('../utils/gemini')
router.post('/add', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const note = new Note({ title, content });
    await note.save();

    res.status(201).json({ message: "Note added successfully", note });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/',async(req,res)=>
{
    const note=await Note.find().sort({createdAt:-1})
    res.json(note)
})

router.post('/content',async(req,res)=>{
  try{
    const {title} = req.body;
    const content = await getcontent({title})
    res.json({content});
  }
  catch(error)
  {
    console.log(error)
  }
})

router.delete('/delete',async(req,res)=>{
  try{
    await Note.deleteMany({});
    res.json({message : "Deleted"})
  }
  catch(error)
  {
    console.error(error)
  }
})

router.delete('/delete/:id',async(req,res)=>{
  try{
    const id=req.params.id;
    await Note.findByIdAndDelete(id)
    res.status(200).json({message:"success"})
  }
  catch(error)
  {
    console.log(error)
  }
})

router.post('/summary/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    const summary = await getSummary(note.content);
    note.summary = summary;
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    console.error("Error summarizing note:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

module.exports=router;
