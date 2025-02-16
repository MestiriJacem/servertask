const express =require ("express");
const bcrypt =require("bcryptjs")
const jwt= require("jsonwebtoken")
const User = require ("../models/User")
const router = express.Router();

//User Registration
router.post("/register",async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const hashedPassword= await bcrypt.hash(password,10)
        const user = new User({username,email,password:hashedPassword});
        await user.save();
        res.status(201).json ({message:"user registered successfully"})

    } catch(err){
        res.status(500).json ({error:'Error registreing user'})
    }
});

//user Login
router.post ('/login', async(req,res)=>{
    try{
        const {email,passwore}=req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(400).json ({error:"user not found"})
            const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch)return res.status(400).json ({error:"invalid credenttials"});
        const token =jwt.sign ({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:"1d"
        })
        res.json ({token ,userId:user._id,username:user.username})
    }catch (err){
        res.status(500).json({error:"login failed"})
    }
    
})
module.exports=router