const express=require("express");
const router=express.Router();
const User=require("../model/user");
const wrapasync=require("../utils/WrapAsync.js");
const passport = require("passport");
const{saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/user.js")

router.get("/singup",userController.renderSingup);

router.post("/singup", wrapasync(userController.singup));

 router.get("/login",userController.renderlogin);
    
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);

router.get("/logout",userController.logout)
module.exports=router;