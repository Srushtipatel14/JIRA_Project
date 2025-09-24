const express=require("express");
const router=express.Router();
const signUp=require("../controllers/auth/signUp");
const signIn =require("../controllers/auth/signin")

router.post("/signin",signIn);
router.post("/signup",signUp);

module.exports=router;