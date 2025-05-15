const productModel = require("../models/product-Model")
const cartModel = require("../models/cart-Model");

//? Both For Deleting Image From Folder
const fs = require("fs")
const path = require("path")


const createProduct = async (req, res, next) => {
    try {

        const { pname, description, price, category, stock,  size, color, gender } = req.body;

        // console.log("Product Details:", req.body)

        //!===================================================
        //? Checking product For Duplicate Entries
        //!===================================================

        const findProduct = await productModel.findOne({ pname })

        if (findProduct) {
            return res.status(400).json({ message: " Product Name Is Already Exist Use Unique Name " })
        }

        //!===================================================
        //? Getting userId For Who Created The product
        //!===================================================
        const userId = req.user._id;

        //!===================================================
        //? Creating product 
        //!===================================================
        const createProduct = await productModel.create({
            pname,
            description,
            price,
            category,
            stock,
            
            size,
            color,
            gender,
            addedBy: userId,

        })
        // console.log("Created Product :", createProduct)
        if (createProduct) {
            const productId = createProduct._id
            res.status(201).json({ message: " The Product Is Created ", productId })
            next();
        } else {
            res.status(400).json({ message: " Failed To Create Product " })
        }

    } catch (error) {
        next(error)
    }
}


const uploadImage = async (req, res, next) => {
    try {
        // const { productId } = req.body;
        const productId = req.params.productId;
        // console.log("produtId :", productId)
        const imageUrl = req.file.filename;

        if (imageUrl) {
            const uploadImg = await productModel.findByIdAndUpdate({ _id: productId }, {
                imageURL: imageUrl
            }, { new: true })

            if (uploadImage) {
                res.status(200).json({ message: "Product Uploaded Successfully", imageUrl, uploadImg })
            }
        } else {
            return res.status(400).json({ message: "Image is Not Provided" })
        }

    } catch (error) {
        next(error)
    }
}

const viewProduct = async (req, res, next) => {
    try {

        //!===================================================
        //? Fetching All Products
        //!===================================================

        const getAllProduct = await productModel.find().populate("addedBy")
        const countAllProduct = await productModel.countDocuments();

        if (getAllProduct) {
            res.status(200).json({ getAllProduct, countAllProduct })
        } else {
            res.status(401).json({ message: "Products Not Exists" })
        }

    } catch (error) {
        next(error)
    }
}

const viewProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
     
        const viewProduct = await productModel.findOne({ _id: id }).populate("addedBy")
        if (viewProduct) {
            res.status(200).json(viewProduct)
        } else {
            res.status(200).json({ message: "Product Not Found", id, viewProduct })
        }


    } catch (error) {
        next(error)
    }
}

const deleteProductById = async (req, res, next) => {

    try {
        const id = req.params.id;

        const deleteProduct = await productModel.findOneAndDelete({ _id: id })

        if (deleteProduct) {


            if (deleteProduct.imageURL) {
                const imagePath = path.join(__dirname, "../public/uploads", deleteProduct.imageURL)
                // console.log("Path : ", imagePath)
                if (fs.existsSync(imagePath)) {
                    // unLinkFile
                    // console.log("Path ex : ", imagePath)
                    fs.unlinkSync(imagePath); //? it delete the image from folder
                }
            }

            await cartModel.updateMany({}, { $pull: { items: { product_id: id } } })
            res.status(200).json({ message: "Deleted Product ", id, deleteProduct })

        } else {
            res.status(200).json({ message: "Product Not Found", id, deleteProduct })
        }


    } catch (error) {
        next(error)
    }
}


const updateProductById = async (req, res, next) => {

    try {
        const product = req.body;
        const { pid, pname, description, price, category, stock,  size, color, gender, } = req.body
        // console.log("req body from update product", product)

        const updateProduct = await productModel.findOneAndUpdate({ _id: pid },
            {
                pname, description, price, category, stock,  size, color, gender
            },
            { new: true }

        )
        if (updateProduct) {
            res.status(200).json({ message: "Product Updated Successfully" })
            // console.log("The Updated Product Is This", updateProduct)
        } else {
            res.status(400).json({ message: "Product Updated Failed" })
            // console.log("The Updated Product Is This", updateProduct)
        }

    } catch (error) {
        next(error)
    }
}



module.exports = { createProduct, uploadImage, viewProduct, viewProductById, deleteProductById,   updateProductById }