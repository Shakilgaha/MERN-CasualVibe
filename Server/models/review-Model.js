
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    review: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const reviewModel = mongoose.model("review", reviewSchema);

module.exports = reviewModel;