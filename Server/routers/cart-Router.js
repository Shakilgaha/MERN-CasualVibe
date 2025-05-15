const express = require("express")

const router = express.Router();

const { getAllCartItems, addCartItems, deleteCartItemById, updateItemQuantityById } = require("../controllers/cart-Controller")
const authMiddleware = require("../middlewares/auth-Middleware")

//!===================================================
//? Creating Cart Read routes
//!===================================================
router.route("/read").get(authMiddleware, getAllCartItems)


//!===================================================
//? Creating Cart Add Remove routes
//!===================================================
router.route("/add").post(authMiddleware, addCartItems)

router.route("/remove").patch(authMiddleware, deleteCartItemById)


//!===================================================
//? Creating Cart Update Quantity routes
//!===================================================

router.route("/update-quantity/:product_id").patch(authMiddleware, updateItemQuantityById)



module.exports = router;