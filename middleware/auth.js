const jwt = require('jsonwebtoken');
const Employee = require('../model/employee.model');

const auth = async (req,res,next)=> {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        const employee = await Employee.findOne({_id: verifiedToken._id});
        req.token = token;
        req.employee = employee;
        next();
    }catch(error){
        res.status(401).send(error)
    }
}

module.exports = auth;