const Listing = require("../model/listing");
const { geocode } = require("../utils/geocoding.js");


// =====================
// INDEX
// =====================
module.exports.index = async (req, res) => {

    const allListings = await Listing.find({});

    res.render("listings/index.ejs", {
        allListings
    });
};


// =====================
// NEW
// =====================
module.exports.renderNewForm = (req, res) => {

    res.render("listings/new.ejs");
};


// =====================
// SHOW
// =====================
module.exports.show = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        });

    if (!listing) {
        req.flash(
            "error",
            "Listing you requested does not exist!"
        );

        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", {
        listing
    });
};


// =====================
// CREATE
// =====================
module.exports.create = async (req, res) => {

    const newListing = new Listing(req.body.listing);

    // Set owner
    newListing.owner = req.user._id;

    // Upload image
    if (req.file) {

        const url = req.file.path;
        const filename = req.file.filename;

        newListing.image = {
            url,
            filename
        };
    }

    // Geocode location
    const geometry = await geocode(
        req.body.listing.location,
        req.body.listing.country
    );

    if (geometry) {
        newListing.geometry = geometry;
    }

    await newListing.save();

    req.flash(
        "success",
        "New listing created!"
    );

    res.redirect("/listings");
};


// =====================
// EDIT
// =====================
module.exports.edit = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {

        req.flash(
            "error",
            "Listing you requested does not exist!"
        );

        return res.redirect("/listings");
    }

    let originalimageurl = listing.image.url;

    originalimageurl = originalimageurl.replace(
        "/upload",
        "/upload/h_100,w_150"
    );

    res.render("listings/edit.ejs", {
        listing,
        originalimageurl
    });
};


// =====================
// UPDATE
// =====================
module.exports.update = async (req, res) => {

    const { id } = req.params;

    // Update basic listing information
    const listing = await Listing.findByIdAndUpdate(
        id,
        {
            ...req.body.listing
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!listing) {

        req.flash(
            "error",
            "Listing you requested does not exist!"
        );

        return res.redirect("/listings");
    }

    // Update location coordinates
    const geometry = await geocode(
        req.body.listing.location,
        req.body.listing.country
    );

    if (geometry) {
        listing.geometry = geometry;
    }

    // Update image if new image uploaded
    if (req.file) {

        const url = req.file.path;
        const filename = req.file.filename;

        listing.image = {
            url,
            filename
        };
    }

    await listing.save();

    req.flash(
        "success",
        "Listing updated!"
    );

    res.redirect(`/listings/${id}`);
};


// =====================
// DELETE
// =====================
module.exports.delete = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {

        req.flash(
            "error",
            "Listing you requested does not exist!"
        );

        return res.redirect("/listings");
    }

    req.flash(
        "success",
        "Listing deleted!"
    );

    res.redirect("/listings");
};
