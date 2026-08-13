# Map Feature Implementation Checklist

1. [x] Add `geometry` field to Listing model (`model/listing.js`)
2. [x] Create Nominatim geocoding helper (`utils/geocoding.js`)
3. [x] Geocode on create & update in controller (`controllers/listing.js`)
4. [x] Add map section + Google Maps script to Show page (`view/listings/Show.ejs`)
5. [x] Pass Google Maps API key securely via `res.locals` (`app.js`)
6. [x] Add map CSS (`public/css/style.css`)
7. [x] Add geometry coords to seed data (`init/data.js` + `init/index.js`)
8. [x] Verify app still works
