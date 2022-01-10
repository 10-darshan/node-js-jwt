const mongoose=require('mongoose');
const url=`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.hf9iw.mongodb.net/Organisations?retryWrites=true&w=majority`;
//const url = process.env.DB_HOST;
mongoose.connect(url,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
       },(error)=>{
    if(!error)
        console.log('connected with mongodb ...');
    else
    console.log(error);
})
const Employee=require('./model/employee.model.js');
const Company=require('./model/company.model.js'); 
const Team=require('./model/team.model.js'); 