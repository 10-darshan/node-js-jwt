const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// generating token -
employeeSchema.methods.generateAuthToken = async function() {
    try{
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY, { expiresIn: '600s'});
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error){
        res.send(error);
    }
}

// converting password into hash -
employeeSchema.pre("save", async function(next) {
    if(this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

module.exports=mongoose.model('Employee',employeeSchema);