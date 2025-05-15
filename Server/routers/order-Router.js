
const express = require("express")
const router = express.Router();

const { createOrder, readOrder } = require("../controllers/order-Controller")

const validate = require("../middlewares/validate-Middleware")
const { orderSchema } = require("../validators/order-Validator")


//!===================================================
//? Creating order Create & read routes
//!===================================================
// validate(orderSchema),
router.route("/create").post( createOrder)
router.route("/read").get(readOrder)

module.exports = router