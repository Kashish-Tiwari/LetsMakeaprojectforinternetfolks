const mongoose=require('mongoose');
const schoolSchema= new mongoose.Schema({
    name:{type:String, required:true},
    city:{type:String, required:true},
    state:{type:String, required:true},
    country:{type:String, required:true},
})
const School=mongoose.model('School', schoolSchema);
module.exports= School;
