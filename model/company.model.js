const { Date } = require('mongoose');
const mongoose = require('mongoose');
Schema = mongoose.Schema
const companySchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    CEO: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    inceptionDate: {
        type: Date,
        required: true
    }
});

 companySchema.virtual('teams', {
        ref: 'Team',
        localField: '_id',
        foreignField: 'companyID'
      });

companySchema.set('toObject', { virtuals: true });
companySchema.set('toJSON', { virtuals: true });

module.exports=mongoose.model('Company',companySchema);