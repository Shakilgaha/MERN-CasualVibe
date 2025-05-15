const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", required: true
    },
    quantity: {
        type: Number,
        required: true, min: 1,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    }
});

const CartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", required: true
    },
    items: [CartItemSchema],
    total: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
//? Automatically update 'updated_at' field before saving
CartSchema.pre("save", function (next) {
    this.updated_at = Date.now();
    next();
});

const cartModel = mongoose.model("Cart", CartSchema);

module.exports = cartModel;

