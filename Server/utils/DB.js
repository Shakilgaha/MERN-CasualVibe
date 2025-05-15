const mongoose = require("mongoose")

//!===================================================
//? Creating URL For Mongoose Connection 
//!===================================================
const URL = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connection is Success")
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

module.exports = connectDb;