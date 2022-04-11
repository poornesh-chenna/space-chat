const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// app.get("/",(req,res)=>{
//     res.sendFile("E:/chatApplication/chat-app/public/index.html")
// })

app.post("/register",(req,res)=>{
  res.send({message:"sucessfull"})
})

app.get("/api",(req,res)=>{
  res.json([
    {
      id:"1",name:"poornesh"
    },
    {
      id:"2",name:"balu"
    }
  ])
})










app.listen(5000, function() {
    console.log("Server started on port 5000");
  });