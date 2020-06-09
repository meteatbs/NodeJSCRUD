require('./models/db')

const express=require('express');

const bodyParser=require('body-parser');

const path=require('path');

const expressHandlebars=require('express-handlebars');

const employeeController=require('./controller/employeeController');


var app=express();


//Configure middleware

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json())//it will converting all the request data to json format
//configuring the view of the application
app.set('views',path.join(__dirname,'/views/'));

app.engine('hbs',expressHandlebars({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname + '/views/layouts/'
}))

app.set('view engine','hbs');//succesfully configured the express handlebars


app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(5000,()=>{
    console.log("Server is listening on Port 5000");
    
})

app.use('/employee',employeeController);