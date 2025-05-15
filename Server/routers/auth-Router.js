const express = require("express");
const router = express.Router()
const { userRegister, userLogin } = require("../controllers/auth-Controller");
const { loginSchema, registerSchema } = require("../validators/auth-Validator");
const validate = require("../middlewares/validate-Middleware");


//!===================================================
//? Creating user Auth routes
//!===================================================
router.route("/register").post(validate(registerSchema), userRegister);

router.route("/login").post(validate(loginSchema), userLogin);



module.exports = router;