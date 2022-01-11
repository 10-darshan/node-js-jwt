const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mongoose = require('mongoose');
let Team = mongoose.model('Team');
let Company = mongoose.model('Company');

// add a team -
// router.post("/",async(req,res)=>{
//     try{
//         const team = new Team(req.body);
//         res.status(201).send(await team.save());
//     }
//     catch(e){
//         res.status(400).send(e);
//     }
// });

// add a team with company _id in url -
router.post("/:id",async(req,res)=>{
    try{
        const company =await Company.findById(req.params.id);
        const team = new Team(req.body);
        team.companyID = req.params.id;
        res.status(201).send(await team.save());
    }
    catch(e){
        res.status(400).send(e);
    }
});

// get list of all teams  sorted by team UUID in ascending order -
router.get("/",async(req,res)=>{
    try{
        const team = await Team.find({}).sort({"UUID":1});
        res.send(team);
    }
    catch(e){
        res.status(400).send(e);
    }
});

// search a team with team _id -
router.get("/:id",async(req,res)=>{
    try{
        const team = await Team.findById(req.params.id);
        res.send(team);
    }
    catch(e){
        res.status(400).send(e);
    }
});

// update a team with team _id -
router.patch("/:id",async(req,res)=>{
    try{
        const team = await Team.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });
        res.send(team);
    }
    catch(e){
        res.status(500).send(e);
    }
});

// delete a team with team _id -
router.delete("/:id",async(req,res)=>{
    try{
        const team = await Team.findByIdAndDelete(req.params.id);
        res.send(team);
    }
    catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;