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
        Todo.findAll({
            where:{
                UserId:decoded.id
            }
        }).then(allTodo=>{
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

router.put("/:id",(req,res)=>{
    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        Todo.findOne({
            where:{
                id:req.params.id,
            }
        }).then(foundTodo=>{
            if(!foundTodo){
                return res.status(404).json({msg:'no such todo'})
            } else if (foundTodo.UserId!==decoded.id){
                return res.status(403).json({msg:"not your todo"});
            } else {
                Todo.update(req.body,{
                    where:{
                        id:req.params.id
                    }
                }).then(editedTodo=>{
                    res.json(editedTodo)
                }).catch(err=>{
                    return res.status(500).json({msg:"womp womp womp",err})
                })
            }
        }).catch(err=>{
            return res.status(500).json({msg:"womp womp womp",err})
        })
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
})

router.delete("/:id",(req,res)=>{
    const token = req?.headers?.authorization?.split(" ")[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        Todo.findOne({
            where:{
                id:req.params.id,
            }
        }).then(foundTodo=>{
            if(!foundTodo){
                return res.status(404).json({msg:'no such todo'})
            } else if (foundTodo.UserId!==decoded.id){
                return res.status(403).json({msg:"not your todo"});
            } else {
                Todo.destroy({
                    where:{
                        id:req.params.id
                    }
                }).then(delTodo=>{
                    res.json(delTodo)
                }).catch(err=>{
                    return res.status(500).json({msg:"womp womp womp",err})
                })
            }
        }).catch(err=>{
            return res.status(500).json({msg:"womp womp womp",err})
        })
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
   
})

module.exports = router;