const express = require('express');
const { path } = require('express/lib/application');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mongoose = require('mongoose');
let Company = mongoose.model('Company');

// get all teams as an array grouped within company object -
router.get("/team",async(req,res)=>{
    try{
        const company = await Company.find({},'name teams').populate('teams');
        res.send(company);
    }
    catch(e){
        res.status(400).send(e);
    }
});

// add a Company -
router.post("/",async(req,res)=>{
    try{
        const comapny = new Company(req.body);
        res.status(201).send(await comapny.save());
    }
    catch(e){
        res.status(400).send(e);
    }
});

// search a company by passing name as query parameter or get all companies sorted by their 
// name in ascending order -
router.get("/",async(req,res)=>{
    try{
        let company;
        if(req.query.name!=null)
        company = await Company.find({'name': req.query.name});
        else
        company = await Company.find({}).sort({"name":1});
        res.send(company);
    }
    catch(e){
        res.status(400).send(e);
    }
});

// search a company by _id -
router.get("/:id",async(req,res)=>{
    try{
        const company = await Company.findById(req.params.id);
        res.send(company);
    }
    catch(e){
        res.status(400).send(e);
    }
});

// update a company by _id -
router.patch("/:id",async(req,res)=>{
    try{
        const company = await Company.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });
        res.send(company);
    }
    catch(e){
        res.status(500).send(e);
    }
});

// delete a company by _id -
router.delete("/:id",async(req,res)=>{
    try{
        const company = await Company.findByIdAndDelete(req.params.id);
        res.send(company);
    }
    catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;