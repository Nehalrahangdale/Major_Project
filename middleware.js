
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema }=require("./schema.js");
const Listing=require("./model/listing");
const Review=require("./model/review");



module.exports. validateListing=(req,res,next)=>{
   let{error}=listingSchema.validate(req.body);
  if(error){
let errmsg = error.details.map((el) => el.message).join(",");   
 throw new ExpressError(400,errmsg);
  }else{
    next();
  }
}

module.exports. validateReview=(req,res,next)=>{
   let{error}=reviewSchema.validate(req.body);
  if(error){
let errmsg = error.details.map((el) => el.message).join(",");   
 throw new ExpressError(400,errmsg);
  }else{
    next();
  }
}

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listings");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}

module.exports.isowner = async (req, res, next) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.isReviewAuthor=async(req,res,next)=>{
  let {id,reviewId}=req.params;
  let review=await Review.findById(reviewId);

  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","do not authorioty to delete this review");
      return res.redirect(`/listings/${id}`);
  }
  next();
}