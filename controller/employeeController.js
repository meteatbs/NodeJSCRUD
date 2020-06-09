const express=require('express');

const mongoose=require('mongoose');

// const employeeModel=require('Employee');

const Employee=mongoose.model('Employee');

const router=express.Router();

router.get('/',(req,res)=>{
    res.render('employee/addOrEdit.hbs',{
        viewTitle:'Insert Employee'
    })
})
//handle the post request

router.post('/',(req,res)=>{
    //creating a custom function 
    //just check if this post is for the creation of the record of the update

    if (req.body._id=="") {
        insertRecord(req,res);
    }else{
        updateRecord(req,res);
    }

    
})
function insertRecord(req,res){


    var employee=new Employee();

    employee.fullName=req.body.fullName;

    employee.email=req.body.email;

    employee.city=req.body.city;

    employee.mobile=req.body.mobile;

    

    //checking for validation

    if (employee.fullName=="" || employee.email==""||employee.city==""||employee.mobile=="") {
        res.render('employee/addOrEdit',({
            viewTitle:'Insert Employee',
            error:'Enter all the details',
            employee:req.body
        }));
        return;
    }

    employee.save((err,doc)=>{
        //if no error
        if (!err) {
            res.redirect('employee/list');
        }else{
            if (err.name=="ValidationError") {
                handleValidationError(err,req.body);

                res.render('employee/addOrEdit',({
                    viewTitle:'Insert Employee',
                    employee:req.body
                }))
            }

            //if error
            console.log("An error during insertion records" + err);
            
        }

    });
}

//create a route for displaying all the user

router.get('/list',(req,res)=>{
    Employee.find((err,docs)=>{
        if (!err) {

            res.render('employee/list',{
                list:docs
            })
        }
    }).lean()
})

router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,doc)=>{
        //check for the error
        if (!err) {
            res.render('employee/addOrEdit',({
                viewTitle:'Update Employee',
                employee:doc
            }))
        }
    }).lean()
})

router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if (!err) {
            res.redirect('/employee/list');
        }
        else{
            console.log("An error ocurred during delete"+ err);
            
        }
    })
})


function handleValidationError(err,body) {
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError']=err.errors[field].message;
                break;
            case 'email':
                body['emailError']=err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


function updateRecord(req,res) {
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        //if no error
        if (!err) {
            res.redirect('employee/list');
        }
        else{
            //if any error is there
            if (err.name=="ValidationError") {
                handleValidationError(err,req.body);
                res.render('employee/addOrEdit',{
                    viewTitle:'Update Employee',
                    employee:req.body
                })
            }
            else{
                console.log("Error ocurred Updating the record"+ err);
                
            }
        }
    }).lean()
}

module.exports=router;