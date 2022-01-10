require('dotenv').config();
const express=require('express');
const app=express();
const connection=require('./connection.js');
const companyRouter=require('./router/company.router.js');
const teamRouter=require('./router/team.router');
const registerRouter=require('./router/register.router');
const bodyParser = require("body-parser");
const req = require('express/lib/request');
const res = require('express/lib/response');
const port = process.env.PORT || 9000;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let Employee = mongoose.model('Employee');
const auth = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });


app.use(express.json());

app.get('/',(req,res)=> {
    res.send('<h1 style="text-align:center">Welcome</h1>');
});

app.post('/login', async (req,res)=> {
    try{
        const employee = await Employee.findOne({username:req.body.username});
        const match = await bcrypt.compare(req.body.password,employee.password);
        if(match){
            const token = await employee.generateAuthToken();
            //console.log(token);
            res.send(employee);
        }
        else
        res.send("Invalid Credientials!");
    }catch(error){
        res.status(400).send(error);
    }
});

// for removing all tokens of current employee from database -
app.get('/deleteToken', auth, async (req, res)=> {
    try{
        // for logout from single device -
        // req.employee.tokens = req.employee.tokens.filter((currElement)=> {
        //     currElement.token != req.token;
        // });
        // for logout from all devices -
        req.employee.tokens = [];
        await req.employee.save();
        res.send("Tokens Deleted");
    }catch(error) {
        res.status(500).send(error);
    }
})

app.use('/register',registerRouter);
app.use('/company',auth ,companyRouter);
app.use('/team',auth ,teamRouter);



app.listen(port,()=> {
    console.log(`server running on port ${process.env.PORT} ...`);
});