const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/WrapAsync.js");

const listingController = require("../controllers/listing.js");

const {
    isLoggedIn,
    isowner,
    validateListing
} = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudconfig.js");

const upload = multer({ storage });


// =====================
// INDEX
// =====================
router.get(
    "/",
    wrapAsync(listingController.index)
);


// =====================
// NEW
// =====================
router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm
);


// =====================
// CREATE
// =====================
router.post(
    "/",
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.create)
);


// =====================
// SHOW
// =====================
router.get(
    "/:id",
    wrapAsync(listingController.show)
);


// =====================
// EDIT
// =====================
router.get(
    "/:id/edit",
    isLoggedIn,
    isowner,
    wrapAsync(listingController.edit)
);


// =====================
// UPDATE
// =====================
router.put(
    "/:id",
    isLoggedIn,
    isowner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.update)
);


// =====================
// DELETE
// =====================
router.delete(
    "/:id",
    isLoggedIn,
    isowner,
    wrapAsync(listingController.delete)
);


module.exports = router;