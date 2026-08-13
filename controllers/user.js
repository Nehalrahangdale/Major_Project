const User=require("../model/user");

module.exports.renderSingup=(req,res)=>{
    res.render("User/singup.ejs");
}

module.exports.singup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
    const newUser= new User({email,username});
    const registerUser=await User.register(newUser,password);
    req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
         req.flash("success","Welcome To Wanderlust!");
         res.redirect("/listings");
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/singup");
    }

}

module.exports.renderlogin=(req,res)=>{
        res.render("User/login.ejs");

    }

    module.exports.login=async (req, res) => {
        req.flash("success", "Welcome back To Wanderlust!");
let redirectUrl = res.locals.redirectUrl || "/listings";

req.flash("success","Welcome back To Wanderlust!");
res.redirect(redirectUrl);    
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
        return  next(err);
        }
        req.flash("success","you have logged out");
        res.redirect("/listings");
    })
}