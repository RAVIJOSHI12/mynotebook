const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body,validationResult } = require('express-validator')

//ROUTER-1,GET All The Notes using : GET:"/api/notes/fetchallnotes". login required. 
router.get('/fetchallnotes' , fetchUser, async (req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id}); 
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

//ROUTER-2,Add a new notes using : POST:"/api/notes/addnotes". login required. 
router.post('/addnotes' , fetchUser, [
    body('title','Enter the valid title.').isLength({ min: 3 }),
    body('description','description must be at least 5 characters.').isLength({ min: 5 }),
], async (req,res)=>{
    try {
        const {title,description,tag} = req.body;
        //If there are errors, return Bad request and the erroes
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title,description,tag,user: req.user.id
        })
        const savedNotes = await note.save()
        res.json(savedNotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

//ROUTER-3,Update an existing Note using : PUT:"/api/notes/updatenote". login required.
router.put('/updatenote/:id' , fetchUser, async (req,res)=>{
    try {
                const{ title, description, tag}=req.body;
        //Create a newnote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Note not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})   

//ROUTER-4,delete an existing Note using : DELETE:"/api/notes/deletenote". login required.
router.delete('/deletenote/:id' , fetchUser, async (req,res)=>{
    try {
                //Find the note to be deleted and deleted it.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Note not Found")}

        //Allow deletion  only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})   

module.exports = router;