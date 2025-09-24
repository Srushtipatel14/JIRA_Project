const express=require("express");
const router=express.Router();
const createproject=require("../controllers/admin/projects/addproject");
const updateproject=require("../controllers/admin/projects/updateproject");
const getSingleProject =require("../controllers/admin/projects/getsingleproject");
const getAllProject=require("../controllers/admin/projects/getallproject");
const addTask=require("../controllers/admin/tasks/addtask");
const updateTask=require("../controllers/admin/tasks/updatetask");
const getSingleTask =require("../controllers/admin/tasks/getsingletask");
const getAllTaskByProject=require("../controllers/admin/tasks/getalltaskbyproject");
const getAllUser=require("../controllers/admin/users/getalluser")
const {getAccessToAdmin}=require("../middlewares/authorization/authAdmin");


router.post("/createproject",getAccessToAdmin,createproject);
router.post("/createtask",getAccessToAdmin,addTask);

router.put("/updateproject",getAccessToAdmin,updateproject);
router.put("/updatetask",getAccessToAdmin,updateTask);

router.get("/getsingleproject/:id",getAccessToAdmin,getSingleProject)
router.get("/getallproject",getAccessToAdmin,getAllProject)
router.get("/getsingletask/:id",getAccessToAdmin,getSingleTask)
router.get("/getalltaskbyproject/:id",getAccessToAdmin,getAllTaskByProject)
router.get("/getalluser",getAccessToAdmin,getAllUser)

module.exports=router;