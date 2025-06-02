import express from "express";
import { connectDB } from "./config/db.js";
import Note from "./models/notes.js";
import cors from "cors";

const app =express();
const PORT=3000;
app.use(cors());


await connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/notes",async(req,res) => {
    const notes=await Note.find();
    res.json(notes);
    
})

app.post("/api/notes",async(req,res) => {
    const {desc}=req.body;
    const note=new Note({desc});
    await note.save();
    res.json(note);

});

app.put("/api/notes/:id",(req,res) => {
    const {id}=req.params;
    const {desc}=req.body;
    Note.findByIdAndUpdate(id,{desc},{new:true}).then((note) => {
        res.json(note);
    })
});

app.delete("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.json({ success: true });
});





app.listen(PORT,() => {
    console.log(`Server listening on  http://localhost:${PORT}`)
})