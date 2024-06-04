const express=require("express");
const router=express.Router();
const { health, register, login } = require("../controllers/user");

router.get("/health",health);
router.post("/register",register);
router.post("/login",login);

module.exports=router;
