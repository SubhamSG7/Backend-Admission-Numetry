const mongoose=require('mongoose');

const memberschema=new mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    phone:{type:String,require:true},
    facultyId:{type:Number,require:true},
    deptId:{type:Number,require:true},
    faculty:{type:String,require:true},
    password:{type:String,require:true}
})
module.exports=mongoose.model('user_member',memberschema);