const mongoose=require("mongoose");

const userDetails=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
       
    },
    password:{
        type:String,
        required:true
    }
});

const User=mongoose.model("User",userDetails);
module.exports=User;