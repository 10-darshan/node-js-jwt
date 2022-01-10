const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mongoose = require('mongoose');
let Employee = mongoose.model('Employee');

router.post("/", async (req,res)=>{
    try{
        const employee = new Employee(req.body);
        //const token = await employee.generateAuthToken();
        res.status(201).send(await employee.save());
    }catch(e){
        res.status(400).send(e);
    }
});

router.get("/", async (req,res)=>{
    try{
        const employee = await Employee.find({}).sort({'username': 1});
        res.send(employee);
    }catch(e){
        res.status(400).send(e);
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        const employee = await Employee.findByIdAndDelete(req.params.id);
        res.send(employee);
    }
    catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;