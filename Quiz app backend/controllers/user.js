const User=require("../models/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const health=(req,res)=>{
    res.status(200).json({
        server:req.headers.host,
        service:"Quiz App",
        status:Active,
        time:new Date()
    })
}

const register = async(req , res)=>{
    try {
        const {name,email,password,confirmPassword}=req.body;

        if(!name||!email||!password||!confirmPassword){
            return res.status(400).json({message: "All fields are mandatory"});
        }

        if(password!=confirmPassword){
            return res.status(400).json({message: "Password does not match with confirm password"});

        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            res.status(400).json({message:"User already exists"});
        }

        const encryptedPassword= await bcrypt.hash(password,10);
        await User.create({name,email,password:encryptedPassword})

        res.status(200).json({
            status:"SUCCESS",
            message:"You are registered sucessfully. Please login to proceed",
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({message:"Something went wrong"});
        
    }
}

const login= async(req,res,next) =>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            res.status(400).json({message:"Both fields are required"});
        }

        const user = await User.findOne({ email });
        if(user){
            const passwordMatch= await bcrypt.compare(password,user.password);
            if (passwordMatch) {
             const jwtToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 60 })
            res.status(200)
            .json({
                status: "SUCCESS",
                name: user.name,
                id:user._id,
                message: "You are Logged In Successfully",
                jwtToken
            })
        }
        else
        res.status(400).json({message:"Invalid Credentials"});

        }
        else
        res.status(400).json({message:"Invalid Credentials"});

        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Invalid Credentials"})
        
    }
}
module.exports={health,register,login};