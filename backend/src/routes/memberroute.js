const express=require("express");
const router=express.Router();
const {getAccessToMember}=require("../middlewares/authorization/authMember");
const getTaskAssignToMember=require("../controllers/member/gettaskassigntomember");
const editassignTask=require("../controllers/member/editassigntask");

router.get("/gettaskassigntomember",getAccessToMember,getTaskAssignToMember)
router.patch("/editassigntask",getAccessToMember,editassignTask)


module.exports=router;