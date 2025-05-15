const { z } = require("zod");


//!===================================================
//? Creating Product Schema
//!===================================================
const productSchema = z.object({

    pname: z
        .string({ required_error: "pname Is Required " })
        .trim()
        .min(3, { message: "The pname Must be At Least Of 3 Character" })
        .max(100, { message: "The pname Must be Less Than 100 Character " }),

    description: z
        .string({ required_error: "description Is Required" })
        .min(20, { message: "description Must be At Least Of 20 Character" })
        .max(500, { message: "description Must be Less Than 500 Character" }),

    price: z
        .string({ required_error: "price Is Required " })
        .min(1, { message: "The price Must be At Least Of 1 Character" })
        .max(10, { message: "The price Must be Less Than 10 Character " }),
        
    category: z
        .string({ required_error: "category Is Required" })
        .min(3, { message: "category Must be At Least Of 3 Character" })
        .max(10, { message: "category Must be Less Than 10 Character" }),

    stock: z
        .string({ required_error: "stock Is Required " })
        .min(1, { message: "The stock Must be At Least Of 1 Character" })
        .max(10, { message: "The stock Must be Less Than 10 Character " }),

    // color: z
    //     .string({ required_error: "color Is Required" })
    //     .trim()
    //     .min(3, { message: "color Must be At Least Of 3 Character" })
    //     .max(50, { message: "color Must be Less Than 50 Character" }),

    // size: z
    //     .string({ required_error: "size Is Required" })
    //     .trim()
    //     .min(1, { message: "size Must be At Least Of 1 Character" })
    //     .max(10, { message: "size Must be Less Than 10 Character" }),

    gender: z
        .string({ required_error: " gender Is Required" })
        .trim()
        .min(3, { message: " gender Must be At Least Of 3 Character" })
        .max(10, { message: " gender Must be Less Than 10 Character" }),
    

});



module.exports = { productSchema }
