
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    items: [{
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
    }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"], //? This Will Ensure The Other value Cannot be saved In DB
        default: "pending"
    },
    payment : {
        type : String ,
        enum  : ["COD" , "online"] ,
        required : true
    },
    daysLeft: {
        type: String,
        enum: ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], //? This Will Ensure The Other value Cannot be saved In DB
        default: "7"
    },
    shippingDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true,
    },
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel;