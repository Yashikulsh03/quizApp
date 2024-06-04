const jwt=require("jsonwebtoken");

const isAuthenticated=(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user=user;
        console.log("req.user: " + req.user + "user: " + user);
        next();
    } catch (error) {
        res.status(401).json({message:error.message});
        
    }
}
module.exports=isAuthenticated