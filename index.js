const express= require('Express');
const app= express();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const bodyParser= require ('body-parser');
const mongoose= require('mongoose')
const User= require('./models/user');
const Role = require('./models/role');
const Student = require('./models/student');
const School = require('./models/school');
 const db= mongoose.connect("mongodb://localhost:27017/studentdb");



app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get('/user',(req,res)=> {
    User.find()
.then(stu=> {
    res.send(User);
})
.catch(err=>{
    res.send("Error Found")
})
})
 
app.get('/user/:id',(req,res)=>{
 const auser= User.find(auser=>
    auser.id===Number(req.params.id))

.then(res.json({ confirmation:'true', data:auser}))
.catch(err=>{
    res.status(404).send("error found")})
})

app.post('/user/register', async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){

            const registeruser= new User({
                id:req.body.id,
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                password:password,
                confirmpassword: cpassword,
                roleid:req.body.roleid

            })
            const userRegistered = await registeruser.save();
            res.status(201).send("User registered sucessfully");
        }else{
            res.send("Passwords are not matching");
        }
    } catch(error){
        res.status(400).send(error);
    }


})
app.post("/user/login",async(req,res)=>{
    try{
        
        const email= req.body.email;
        const password=req.body.password;
        const useremail =await User.findOne({email:email});

        const isMatch= await bcrypt.compare(password,useremail.password);


        if(isMatch){
            res.status(201).send("user logged in sucessfully");
        }else{
            res.send("Invalid details");
        }
    }catch(error){
        res.status(400).send("Invalid login details");

    }
    
})
//generating token via jwt//
const createToken =async()=>{
    const token= await jwt.sign({id:"343654798809"},"theverysecretekeyofmine")
    console.log(token);

   //verifying token// 
   const userVer= await jwt.verify(token,"theverysecretekeyofmine");
   console.log(userVer);

}
 createToken();


//Roles//
 app.get("/role",(req,res)=>{
    res.send(Role);
 })
app.post("/role",async(req,res)=>{
    const newrole= new Role({
        name:req.body.name,
        scopes:req.body.scopes
    })
    const savedNewRole= await newrole.save();
    res.status(201).send("role added sucessfully");
})




app.get("/student",(req,res)=>{
    res.send(Student);
})
app.post("/student",async(req,res)=>{
    const newstudent= new Student({
        name:req.body.name,
    userid:req.body.userid,
    schoolid:req.body.schoolid
    })
    const savedNewStudent= await newstudent.save();
    res.status(201).send("student added sucessfully");
})



    app.get("/school",(req,res)=>{
     res.send(School);

    })
    app.get("/school/:id",(req,res)=>{
        const aschool= Student.find(aschool=>
            aschool.id===Number(req.params.id))
        
        .then(res.json({ confirmation:'true', data:aschool}))
        .catch(err=>{
            res.status(404).send("error found")})
        })
        app.post("/school",async(req,res)=>{
            const newSchool=new School({
                name:req.body.name,
                city:req.body.city,
                state:req.body.state,
                country:req.body.country

            })
            const createdSchool= await newSchool.save();
            res.status(201).send("School created sucessfully");
        })
    
 app.listen('5000', ()=>
 console.log("Server started at porta 5000"));
