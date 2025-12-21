const express=require('express')
const userRouter=express.Router()
const {insertUser,getUser,updateUser,deleteUser}=require("../controllers/studentController")
userRouter.post("/insert-user",insertUser)
userRouter.get("/get-user",getUser)
userRouter.put("/update-user/:name",updateUser)
userRouter.delete("/delete-user/:name",deleteUser)
module.exports = userRouter;
