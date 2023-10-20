const mongoose=require('mongoose');

const adminschema=new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true}
})
module.exports=mongoose.model('admin_schema',adminschema);