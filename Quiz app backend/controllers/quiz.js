const Quiz=require("../models/quiz");
const mongoose=require("mongoose");

const createQuiz= async(req,res)=>{
    try {
        const {quizOwnerId, quizName, quizType,questionSets,timer} = req.body;
         
        if(questionSets.length>5){
            res.status(400).json({message:"Maximum 5 questions are allowed"});
        }
        let invalidOptions = questionSets.filter(q => q.optionSets.filter(o => o.isCorrectAnswer).length === 0);
        console.log("invalidOptions= " + invalidOptions.length);
        if (quizType === "Q&A" && invalidOptions.length > 0) {
            return res.status(400).json({ message: "Correct answer must be selected for Q&A" });
        }
        const newQuiz=await Quiz.create({quizOwnerId, quizName, quizType,questionSets,timer});

        res.status(200)
        .json({
            message:"Quiz created sucessfully",
            quizId: newQuiz._id

        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Something went wrong"});
        
    }
}

const updateQuiz= async(req,res)=>{
    try {
        
        const{id}=req.params;
        const{questionSets}=req.body;

        const quiz= await Quiz.findByIdAndUpdate(id, { questionSets });

        if(!quiz){
            return res.status(400)
            .json({
                status:"NOT_FOUND",
                message:"No quiz exist"
            });

        }
        res.json({
            status:"SUCCESS",
            message:"Quiz updated sucessfully",
            quiz
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Something went wrong"})
        
    }
}

const deleteQuiz= async(req,res)=>{
    try {
        
        const{id}=req.params;

        await Quiz.findByIdAndDelete(id);

        res.status(200)
        .json({
            status:"SUCCESS",
            message:"Quiz deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Something went wrong"});
        
    }
}

const getAllQuizByUserId= async(req,res)=>{
    try {

        const{quizOwnerId}=req.params;

        const dashboardQuizzes= await Quiz.find({ quizOwnerId, totalImpressions: { $gt: 10 } })
        .sort({totalImpressions: -1});

        const analyticsQuizzes= await Quiz.find({quizOwnerId}).sort({createdAt:1});
         
        res.status(200)
        .json({
            status:"SUCCESS",
            dashboardQuizzes,
            analyticsQuizzes
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
        
    }
}

const getQuizById=async(req,res)=>{
    try {
        const {id}=req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const quiz=await Quiz.findById(id);
        if(!quiz){
            return res.status(404).json({message:"No quiz exist"});
        }  
        res.status(200).json({
            status:"SUCCESS",
            quiz
        })

              
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

const getQuizByIdAndIncreaseImpressionsByOne= async(req,res)=>{
    try{
        const{id}=req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const quiz=await Quiz.findById(id);
        if(!quiz){
            res.status(400).json({message:"No quiz exist"});
        }  
        quiz.totalImpressions=quiz.totalImpressions+0.5;
        await quiz.save();

        res.status(200).json({
            status: "SUCCESS",
            quiz
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

module.exports={createQuiz,updateQuiz,deleteQuiz,getQuizByIdAndIncreaseImpressionsByOne,getQuizById,getAllQuizByUserId};
          

  