const mongoose= require('mongoose');
const bcrypt=require('bcrypt');
const { ObjectId } = require('bson');

 
  const userSchema= new mongoose.Schema({
   id:{type:String,unique:true},
   name:{type:String,unique:true},
   email:{type:String},
   mobile:{type:Number},
   password:{type:String},
   confirmpassword: {type:String},
   roleid:[{type:'ObjectId',ref:'Role'}]
  })

  userSchema.pre("save",async function(next){

   if(this.isModified("password")){
   this.password= await bcrypt.hash(this.password, 10);

   this.confirmpassword= undefined;
   }
   next();
  })
 
 const User=mongoose.model('User', userSchema);
 module.exports=User;