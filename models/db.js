const mongoose=require('mongoose');

const url="mongodb://localhost:27017/EmployeeDB";

//connect method of mongoose

mongoose.connect(url,{useNewUrlParser:true},(err) =>{
    if (!err) {
        console.log("DB Connected Succesfully");
        
    }
    else{
        console.log("An error ocurred in connectin Database"+ err);
        
    }
})

//include the employee model

require('./employee.model');