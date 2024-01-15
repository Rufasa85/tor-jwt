const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/",(req,res)=>{
    res.send("connect Ted!")
})

const userRoutes = require("./userControllers");
router.use("/api/users",userRoutes);

module.exports = router;