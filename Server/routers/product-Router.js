const express = require("express")
const router = express.Router();


const validate = require("../middlewares/validate-Middleware")
const authMiddleware = require("../middlewares/auth-Middleware")

const { productSchema, } = require("../validators/product-Validator")


const { createProduct, uploadImage, viewProduct, viewProductById, deleteProductById, updateProductById } = require("../controllers/product-controller")

const multer = require('multer')
const crypto = require("crypto")
const path = require("path")
//!===================================================
//? Uploading File In Folder Using Multer
//!===================================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file)
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, bytes) => {
            if (err) return cb(err)
            const fn = bytes.toString("hex") + path.extname(file.originalname)
            cb(null, fn)
        })
    }

})
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }
})

const uploadSingle = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.log("Upload Error : ", err)
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: "File Size Should Be Less Than 2MB" })
            }
            return res.status(500).json({ message: "File Upload Error ", err })
        }
        if (!req.file) {
            return res.status(400).json({ message: "No File provided" })
        }
        next()
    })
}

//!===================================================
//? Creating Product Add routes
//!===================================================
router.route("/create").post(authMiddleware, createProduct)
router.route("/create/:productId/upload").post(authMiddleware, uploadSingle, uploadImage)




//!===================================================
//? Creating Product Read routes
//!===================================================
router.route("/view").get(viewProduct)
router.route("/viewById/:id").get(viewProductById)


//!===================================================
//? Creating Product Delete & Update routes
//!===================================================
router.route("/delete/:id").delete(deleteProductById)

router.route("/update").patch(updateProductById)


module.exports = router;