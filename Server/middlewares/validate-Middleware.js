
const validate = (schema) => async (req, res, next) => {

    try {
        //!===================================================
        //? Passing Validation Data To Zod 
        //!===================================================
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;

        // console.log("Validate",parseBody , req.body)
        next();
    } catch (err) {

        //!===================================================
        //? Checking product For Duplicate Entries
        //!===================================================
        const status = 422;
        const message = "All Field Should Be Filed Properly"
        const extraDetails = err?.errors?.[0]?.message || "Unknown Error Occurred"

        // console.log("err : ",err.errors[0].message )

        const error = {
            status,
            message,
            extraDetails
        }
        // console.log(error)
        next(error)
    }
}

module.exports = validate;