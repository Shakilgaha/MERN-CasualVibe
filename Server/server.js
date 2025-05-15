const express = require("express");
const app = express();

const cors = require('cors')

require("dotenv").config();

const connectDb = require("./utils/DB")
const errorMiddleware = require("./middlewares/error-Middleware");

const authRoute = require("./routers/auth-Router");
const productRoute = require("./routers/product-Router")
const orderRoute = require("./routers/order-Router")
const userRoute = require("./routers/user-Router")
const adminRoute = require("./routers/admin-Router")
const cartRoute = require("./routers/cart-Router")

//!===================================================
//? Creating Cors SetUp To Connect React & Express
//!===================================================
var corsOptions = {
    origin: 'http://localhost:5173',
    methods : "GET , PUT , PATCH , DELETE , PUT , HEAD",
    Credentials : true,
}
app.use(cors(corsOptions))

//!===============================
//? Creating basic Express Setup
//!===============================
app.use(express.json());
app.use('/uploads',express.static('public/uploads'))
app.use(express.urlencoded({ extended: true }))


//!========================
//? Creating Main Routes
//!========================
app.use("/api/auth", authRoute)
app.use("/api/product", productRoute)
app.use("/api/order", orderRoute)
app.use("/api/user", userRoute)
app.use("/api/admin", adminRoute)
app.use("/api/cart", cartRoute)


//!================================
//? Creating Main Error Middleware
//!================================
app.use(errorMiddleware)


//!========================
//? Creating Server Port
//!========================
const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server is Running At :", PORT)
    })
}) 