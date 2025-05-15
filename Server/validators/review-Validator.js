const { z } = require("zod");


//!===================================================
//? Creating Review Schema
//!===================================================
const reviewSchema = z.object({

    review: z
        .string()
        .trim()
        .min(5, { message: "Review Must Be At Least Of 5 Character" })
        .max(400, { message: "Review Must Be Less Than 400 Character" })

})

module.exports = { reviewSchema }