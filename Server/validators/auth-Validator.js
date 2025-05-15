const { z } = require("zod");



//!===================================================
//? Creating Login Schema
//!===================================================
const loginSchema = z.object({
    phone: z
        .string({ required_error: "phone Is Required" })
        .trim()
        .min(10, { message: "phone Must be At Least Of 10 Character" })
        .max(10, { message: "phone Must Be Less Than 10 Characters" }),
    password: z
        .string({ required_error: "password Is Required" })
        .min(6, { message: "Password Must be At Least Of 6 Character" })
        .max(20, { message: "password Must be Less Than 20 Character" })

})

//!===================================================
//? Creating Register Schema
//!===================================================
const registerSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Username Is Required" })
        .trim()
        .min(3, { message: "Name Must be AtLeast Of 3 Character" })
        .max(100, { message: "Name Must Be Less Than 100 Characters" }),
    email: z
        .string({ required_error: "Email Is Required " })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(3, { message: "The Email Must be At Least Of 3 Character" })
        .max(100, { message: "The Email Must be Less Than 100 Character " }),


});


//!===================================================
//? Creating Login Schema
//!===================================================
const userUpdateSchema = z.object({
    username: z
        .string({ required_error: "Username Is Required" })
        .trim()
        .min(3, { message: "Name Must be AtLeast Of 3 Character" })
        .max(100, { message: "Name Must Be Less Than 100 Characters" }),
    password: z
        .string({ required_error: "password Is Required" })
        .min(6, { message: "Password Must be At Least Of 6 Character" })
        .max(20, { message: "password Must be Less Than 20 Character" })

})



//!===================================================
//? Creating Contact Schema
//!===================================================
const contactSchema = z.object({
    username: z
        .string({ required_error: "Username Is Required" })
        .trim()
        .min(3, { message: "Name Must be AtLeast Of 3 Character" })
        .max(100, { message: "Name Must Be Less Than 100 Characters" }),
    email: z
        .string({ required_error: "Email Is Required " })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(3, { message: "The Email Must be At Least Of 3 Character" })
        .max(100, { message: "The Email Must be Less Than 100 Character " }),

    subject: z
        .string({ required_error: "Subject Is Required" })
        .trim()
        .min(3, { message: "Subject Must be At Least Of 3 Characters " })
        .max(30, { message: "Subject Must be Less Than 30 Characters " }),

    message: z
        .string({ required_error: "Message Is Required" })
        .trim()
        .min(10, { message: "Message Must be At Least Of 10 Characters " })
        .max(300, { message: "Message Must be Less Than 300 Characters " }),
})






module.exports = { loginSchema, registerSchema, contactSchema,userUpdateSchema }