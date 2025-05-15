
const express = require("express")
const router = express.Router();

const { userAuthCheck, sendContact, createAddress, readAddress, userOrderHistory, userProfileRead, userProfileUpdate, createReview, viewReview } = require("../controllers/user-Controller")
const validate = require("../middlewares/validate-Middleware")
const { contactSchema , userUpdateSchema } = require("../validators/auth-Validator")
const { addressSchema } = require("../validators/user-Validator")

const authMiddleware = require("../middlewares/auth-Middleware");
const { reviewSchema } = require("../validators/review-Validator");



router.route("/auth").get(authMiddleware, userAuthCheck);

//!===================================================
//? Creating Contact routes
//!===================================================
router.route("/contact/send").post(authMiddleware, validate(contactSchema), sendContact);


//!===================================================
//? Creating profile routes
//!===================================================
router.route("/profile/read").get(authMiddleware, userProfileRead);
router.route("/profile/update").patch(validate(userUpdateSchema)  ,authMiddleware, userProfileUpdate);


//!===================================================
//? Creating address routes 
//!===================================================
router.route("/address/create/:id").post(validate(addressSchema), createAddress);
router.route("/address/read").get(authMiddleware, readAddress);

//!===================================================
//? Creating order routes
//!===================================================
router.route("/order/history").get(authMiddleware, userOrderHistory);
router.route("/order/status").get(authMiddleware, userOrderHistory);


//!===================================================
//? Creating Product - Review routes
//!===================================================

router.route("/review/create").post(authMiddleware, validate(reviewSchema), createReview)
router.route("/review/view").get(viewReview)


module.exports = router;