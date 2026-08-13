const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        filename: {
            type: String,
            default: "listingimage",
        },

        url: {
            type: String,
            default:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxA5CaOFeNoVBxW8S2-Z1r0LkZVYl1amgwTQ&s",
        },
    },

price: Number,
    location: String,
    country: String,

    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ["Point"], // 'location.type' must be 'Point'
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

// post mongoose code for deletion handling of listing
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;