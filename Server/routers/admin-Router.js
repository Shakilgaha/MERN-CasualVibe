
const express = require("express")
const router = express.Router();

const IsAdminMiddleware = require("../middlewares/admin-Middleware")
const authMiddleware = require("../middlewares/auth-Middleware")
const { getAdminData, readAllUserData, deleteContactById, readAllContactData, deleteUserById ,readAllOrderData ,deleteOrderById ,editOrderById } = require("../controllers/admin-Controller")


//!===================================================
//? Creating Admin routes
//!===================================================
router.route("/").post(authMiddleware, IsAdminMiddleware, getAdminData)

//!===================================================
//? Creating Admin Users read  & Delete routes
//!===================================================
router.route("/users/read").get(authMiddleware, IsAdminMiddleware, readAllUserData)
router.route("/users/delete/:id").delete(authMiddleware, IsAdminMiddleware, deleteUserById);

//!===================================================
//? Creating Admin Orders Read Edit Delete routes
//!===================================================
router.route("/orders/read").get(authMiddleware, IsAdminMiddleware, readAllOrderData)
router.route("/orders/delete/:id").delete(authMiddleware, IsAdminMiddleware, deleteOrderById)
router.route("/orders/edit").post(authMiddleware, IsAdminMiddleware, editOrderById)



//!===================================================
//? Creating Admin Contacts Read And Delete routes
//!===================================================
router.route("/contacts/read").get(authMiddleware, IsAdminMiddleware, readAllContactData)
router.route("/contact/delete/:id").delete(authMiddleware, IsAdminMiddleware, deleteContactById);


module.exports = router;