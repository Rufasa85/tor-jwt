const express = require('express');
const router = express.Router();
const {User,Todo} = require('../models');
const bcrypt = require("bcrypt")

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
            return res.status(403).json({msg:"invalid login"})
        }
        else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(403).json({msg:"invalid login"})
        } else {
            res.json(foundUser)
        }
    })
})

module.exports = router;