
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pinCode: {
        type: Number,
        required: true,
        min: 6,
        // max: 7
    },
    subDistrict: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "India"
    }

})

const addressModel = mongoose.model("address", addressSchema)

module.exports = addressModel;