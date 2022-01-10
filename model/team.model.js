const mongoose = require('mongoose');
Schema = mongoose.Schema
const teamSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: true,
        unique: true
    },
    companyID: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    leadName: {
        type: String,
        required: true
    }
});
module.exports=mongoose.model('Team',teamSchema);