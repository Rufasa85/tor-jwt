const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
    res.send("connect Ted!")
})

//TODO: protecc
router.get("/secretclub",(req,res)=>{
    console.log("headers")
    console.log(req.headers)
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    console.log('==============================')
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
       return res.send("welcome to the secret club!")
    } catch(err){
       return  res.status(403).json({msg:"invalid token!"})
    }
})

const userRoutes = require("./userControllers");
router.use("/api/users",userRoutes);
const todoRoutes = require("./todoControllers");
router.use("/api/todos",todoRoutes);

module.exports = router;