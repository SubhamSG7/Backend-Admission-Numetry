const mongoose=require('mongoose');

const studentschema=mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    dob:{type:String,require:true},
    address:{type:String,require:true},
    gender:{type:String,require:true},
    course:{type:String,require:true},
})
module.exports=mongoose.model('user_Student',studentschema);