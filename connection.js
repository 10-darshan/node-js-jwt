const mongoose=require('mongoose');
// for connecting to mongodb atlas online-
const url=`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.hf9iw.mongodb.net/Organisations?retryWrites=true&w=majority`;
// for connecting to local mongodb -
//const url = "mongodb://localhost:27017/demodb";
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