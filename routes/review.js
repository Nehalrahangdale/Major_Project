const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync=require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review=require("../model/review.js");
const Listing = require("../model/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/review.js");

// review post route
router.post("/", 
   isLoggedIn,
   validateReview, wrapasync(reviewController.createReview));

// delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapasync(reviewController.destroyReview));
module.exports=router;