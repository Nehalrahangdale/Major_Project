// ==========================
// Environment
// ==========================

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


// ==========================
// DNS
// ==========================

const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);


// ==========================
// Packages
// ==========================

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const MongoStoreModule = require("connect-mongo");


// ==========================
// Models
// ==========================

const Listing = require("./model/listing.js");
const Review = require("./model/review.js");
const User = require("./model/user.js");


// ==========================
// Utils
// ==========================

const wrapasync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const {
  listingSchema,
  reviewSchema
} = require("./schema.js");


// ==========================
// Routers
// ==========================

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


// ==========================
// MongoStore
// ==========================

// Handles both CommonJS export styles
const MongoStore =
  MongoStoreModule.default || MongoStoreModule;


// ==========================
// MongoDB Atlas
// ==========================

const atlas_url = process.env.Atlas_Db;

if (!atlas_url) {
  console.log("ERROR: Atlas_Db is not defined in .env");
  process.exit(1);
}

async function main() {
  await mongoose.connect(atlas_url);
}

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });


// ==========================
// View Engine
// ==========================

app.set("view engine", "ejs");

app.set(
  "views",
  path.join(__dirname, "views")
);

app.engine("ejs", ejsMate);


// ==========================
// Middleware
// ==========================

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.use(
  methodOverride("_method")
);

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);


// ==========================
// MongoDB Session Store
// ==========================

const store = MongoStore.create({
  mongoUrl: atlas_url,
  touchAfter: 24 * 60 * 60
});

store.on("error", (err) => {
  console.log(
    "Error in session MongoStore:",
    err
  );
});


// ==========================
// Session
// ==========================

const sessionOption = {
  store: store,

  secret: process.env.SECRET,

  resave: false,

  saveUninitialized: true,

  cookie: {
    expires: new Date(
      Date.now() +
      7 * 24 * 60 * 60 * 1000
    ),

    maxAge:
      7 * 24 * 60 * 60 * 1000,

    httpOnly: true
  }
};

app.use(
  session(sessionOption)
);


// ==========================
// Flash
// ==========================

app.use(flash());


// ==========================
// Passport
// ==========================

app.use(
  passport.initialize()
);

app.use(
  passport.session()
);

passport.use(
  new LocalStrategy(
    User.authenticate()
  )
);

passport.serializeUser(
  User.serializeUser()
);

passport.deserializeUser(
  User.deserializeUser()
);


// ==========================
// Local Variables
// ==========================

app.use((req, res, next) => {

  res.locals.success =
    req.flash("success");

  res.locals.error =
    req.flash("error");

  res.locals.currUser =
    req.user;

  res.locals.GOOGLE_MAPS_API_KEY =
    process.env.GOOGLE_MAPS_API_KEY;

  next();
});


// ==========================
// Routes
// ==========================

app.use(
  "/listings",
  listingsRouter
);

app.use(
  "/listings/:id/reviews",
  reviewsRouter
);

app.use(
  "/",
  userRouter
);


// ==========================
// 404 Error
// ==========================

app.all(
  "/*splat",
  (req, res, next) => {

    next(
      new ExpressError(
        404,
        "Page Not Found"
      )
    );

  }
);


// ==========================
// Error Handler
// ==========================

app.use(
  (err, req, res, next) => {

    const {
      statusCode = 500,
      message = "Something is wrong!"
    } = err;

    res
      .status(statusCode)
      .render("error.ejs", {
        message
      });

  }
);


// ==========================
// Server
// ==========================

app.listen(8080, () => {

  console.log(
    "app is listening on port 8080"
  );

});