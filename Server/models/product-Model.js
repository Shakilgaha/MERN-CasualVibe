
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    imageURL: {
        type: String,
    },
    pname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        default: "CasualVibe"
    },
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: [String],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    gender: {
        type: String, enum: ["Men", "Women", "Unisex"]
    },
    ratings: {
        average: {
            type: Number, default: 0,
            min: 0,
            max: 5
        },
        total_reviews: { type: Number, default: 0 }
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

//!===================================================
//? Creating product Model To Export
//!===================================================
const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

