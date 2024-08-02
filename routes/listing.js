const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
    isLoggedIn,
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
 );


 router.get('/search', async (req, res) => {
    try {
        const query = req.query.query|| '';
        const listings = await Listing.find({
            $or: [
                { title: new RegExp(query, 'i') }, // Case-insensitive search
                { description: new RegExp(query, 'i') },
                { location: new RegExp(query, 'i') },
                { country: new RegExp(query, 'i') }
            ]
        });
        res.render('listings/index', { listings });
    } catch (err) {
        req.flash('error', 'Something went wrong.');
        res.redirect('/listings');
    }
});
 
// Add a default route to render all listings
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render('listings/index', { listings });
    } catch (err) {
        req.flash('error', 'Something went wrong.');
        res.redirect('/listings');
    }
});


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn, isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;