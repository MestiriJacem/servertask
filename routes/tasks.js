const express =require ('express')
const Task = require('../models/Task')
const router = express.Router()

//Get all tasks 
router.get('/',async (req,res)=>{
    try {
        const tasks= await Task.find();
        res.json(tasks);
    }
    catch (err){
        res.status(500).json({error:err.message})
    }
});
// create a new task 
router.post ('/',async(req,res)=>{
    try {
        const {title,completed}=req.body
        const newTask = new Task ({title,completed});
        await newTask.save();
        res.status(201).json(newTask)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
module.exports=router;
