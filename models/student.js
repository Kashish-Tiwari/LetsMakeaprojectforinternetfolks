
const mongoose= require('mongoose');
const {ObjectId}=require('bson');
const StudentSchema= new mongoose.Schema ({
    name:{type:String, required: true,unique:true},
    userid:[{type:ObjectId, ref: 'User'}],
    schoolid:[{type:ObjectId, ref: 'School'}]
 })
 const Student=mongoose.model('Student', StudentSchema);
 module.exports=Student;