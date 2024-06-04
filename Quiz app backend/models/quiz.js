const mongoose=require("mongoose");
const User=require("./user");

const quizSchema= new mongoose.Schema({

    quizOwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        require:true
    },

    quizName:{
        type:String,
        required:true
    },

    quizType:{
        type:String,
        required:true,
        enum:["Q&A","Poll Type"]
    },

    questionSets:[
        {
            pollQuestion:{
                type:String,
                required:true
            },
            optionType:{
                type:String,
                required:true,
                enum:["Text","Image URL","Text & Image URL"],
                default:"Text"
            },


            optionSets:[{
                optionText:{
                    type:String,
                },

                optionImgUrl:{
                   type:String,
                },

                optionPollCount:{
                    type:Number,
                    default:0
                },

                isCorrectAnswer:{
                    type:Boolean,
                    default:false
                }
            }],
            totalAttempted:{
                type:Number,
                default:0
            },

            totalCorrect:{
                type:Number,
                default:0
            },

            totalIncorrect:{
                type:Number,
                default:0
            }

        }
    ],

    timer:{
        type:Number,
        default:0
    },

    totalImpressions:{
        type:Number,
        default:0
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Quiz=mongoose.model("Quiz",quizSchema);
module.exports=Quiz;