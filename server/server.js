const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/chatDB");

const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String
});

const User = new mongoose.model("user",userSchema) 



app.post("/register",(req,res)=>{
  const newUser = new User({
    username : req.body.username,
    email : req.body.email,
    password : req.body.password
  })
  newUser.save(function(err){
    if(err)
    console.log(err)
    else
    console.log("successfully added to db");
  })
})

app.post("/login",(req,res)=>{
  const mail = req.body.email;
  const password = req.body.password;
   User.findOne({email : mail},(err,founduser)=>{
     if(err)
       console.log(err);
      else{
        if(founduser){
          if(founduser.password === password){
            console.log("userfound");
          } else{
            console.log("invalid password");
          }
        }
        else{
          console.log("please register first");
        }
      }
   })
})










app.listen(5000, function() {
    console.log("Server started on port 5000");
  });