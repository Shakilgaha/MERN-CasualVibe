const { z } = require("zod");

//!===================================================
//? Creating Address Schema
//!===================================================
const addressSchema = z.object({

    address: z
        .string({ required_error: "Address is Required" })
        .trim()
        .min(5, { message: "Address Must Be At Least Of 5 Character" })
        .max(100, { message: "Address Must Be Less Than 100 Character" }),

    city: z
        .string({ required_error: "City is Required" })
        .trim()
        .min(3, { message: "City Must Be At Least Of 3 Character" })
        .max(100, { message: "City Must Be Less Than 100 Character" }),

    pinCode: z
        .string({ required_error: "PinCode is Required" })
        .trim()
        .min(6, { message: "PinCode Must Be Of 6 Character" })
        .max(6, { message: "PinCode Must Be Of 6 Character" }),

    subDistrict: z
        .string({ required_error: "Sub-District is Required" })
        .trim()
        .min(3, { message: "Sub-District Must Be At Least Of 3 Character" })
        .max(100, { message: "Sub-District Must Be Less Than 100 Character" }),

    district: z
        .string({ required_error: "District is Required" })
        .trim()
        .min(3, { message: "District Must Be At Least Of 3 Character" })
        .max(100, { message: "District Must Be Less Than 100 Character" }),

    state: z
        .string({ required_error: "State is Required" })
        .trim()
        .min(5, { message: "State Must Be At Least Of 3 Character" })
        .max(20, { message: "State Must Be At Less Than 20 Character" }),

})

module.exports = { addressSchema }