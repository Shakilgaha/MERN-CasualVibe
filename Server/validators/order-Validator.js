const { z } = require("zod");


//!===================================================
//? Creating products Schema
//!===================================================
const itemsSchema = z.object({
    productId: z
        .string({ required_error: "Unknown Product" })
        .min(1, { message: "Product Id Is Required" })
        .trim(),

    quantity: z
        .string({ required_error: "quantity is Required" })
        .trim()
        .min(1, { message: "quantity Must Be At Least Of 1" })
        .max(10, { message: "quantity Must Be Less Than 10" }),

    price: z
        .string({ required_error: "price is Required" })
        .trim()
        .min(1, { message: "price Must Be Of 1 Character" })
        .max(10, { message: "price Must Be Of 10 Character" }),

})



//!===================================================
//? Creating Order Schema
//!===================================================
const orderSchema = z.object({

    items: z
        .array(itemsSchema)
        .min(1, { message: "At Least 1 Item Is Require To Place Order" })
        .max(5, { message: "You Can Only Order 5 Items Per Order" })
    ,

    totalAmount: z
        .string({ required_error: " totalAmount is Required" })
        .trim()
        .min(1, { message: " totalAmount Must Be At Least Of 1 Character" })
        .max(100, { message: " totalAmount Must Be Less Than 100 Character" }),


    shippingDetails: z
        .string({ required_error: "shippingDetails is Required" })
        .trim()

})

module.exports = { itemsSchema, orderSchema }