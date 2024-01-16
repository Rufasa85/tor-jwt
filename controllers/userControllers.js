const express = require('express');
const router = express.Router();
const {User,Todo} = require('../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/",(req,res)=>{
    User.create(req.body).then(newser=>{
        res.json(newser)
    }).catch(err=>{
        res.status(500).json({msg:"uh oh spagetti-ohs!",err})
    })
})

router.post("/login",(req,res)=>{
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

module.exports = router;