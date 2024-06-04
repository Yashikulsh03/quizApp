const checkError=(err,req,res,next)=>{
    console.log(err.stack);
    if(err.name==='ValidationError'){
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ message: "Something went wrong! Please try again after some time" })
}
module.exports=checkError