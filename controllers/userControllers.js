const express = require('express');
const router = express.Router();
const {User,Todo} = require('../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/",(req,res)=>{
    User.create(req.body).then(newser=>{
        const token = jwt.sign({
            id:newser.id,
            email:newser.email
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        console.log('token', token)
        res.json({
            token:token,
            user:newser
        })
    }).catch(err=>{
        res.status(500).json({msg:"uh oh spagetti-ohs!",err})
    })
})

router.post("/login",(req,res)=>{
    console.log(req.body)
    User.findOne({
        where:{
            email:req.body.email
        },
        include:[Todo]
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid login"})
        }
        else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login"})
        } else {
            const token = jwt.sign({
                id:foundUser.id,
                email:foundUser.email
            },process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            console.log('token', token)
            res.json({
                token:token,
                user:foundUser
            })
        }
    })
})

router.get("/datafromtoken",(req,res)=>{
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    console.log('==============================')
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        User.findByPk(decoded.id,{
            include:[Todo]
        }).then(foundUser=>{
            res.json(foundUser)
        })
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
})

module.exports = router;