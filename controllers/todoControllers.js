const express = require('express');
const router = express.Router();
const {User,Todo} = require('../models');
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    console.log('==============================')
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        Todo.findAll().then(allTodo=>{
            return res.json(allTodo)
        }).catch(err=>{
            return res.status(500).json({msg:"womp womp womp",err})
        })
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
   
})
router.post("/",(req,res)=>{
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    console.log('==============================')
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        Todo.create({
            task:req.body.task,
            priority:req.body.priority,
            UserId: decoded.id
        }).then(newTodo=>{
            return res.json(newTodo)
        }).catch(err=>{
            return res.status(500).json({msg:"womp womp womp",err})
        })
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
   
})

module.exports = router;