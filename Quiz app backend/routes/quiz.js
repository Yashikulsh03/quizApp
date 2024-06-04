const express = require("express");
const { createQuiz,updateQuiz,deleteQuiz,getAllQuizByUserId,getQuizByIdAndIncreaseImpressionsByOne,getQuizById } = require("../controllers/quiz");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

router.get("/getAllQuiz/:quizOwnerId",isAuthenticated,getAllQuizByUserId);
router.get("/:id", isAuthenticated, getQuizById);
router.get("/playQuiz/:id",getQuizByIdAndIncreaseImpressionsByOne);
router.post("/",isAuthenticated,createQuiz);
router.put("/:id",isAuthenticated,updateQuiz);
router.put("/playQuiz/:id",updateQuiz);
router.delete("/:id",isAuthenticated,deleteQuiz);

module.exports = router