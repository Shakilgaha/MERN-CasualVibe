
const errorMiddleware = async (err, req, res, next) => {

    try {
        //!===================================================
        //? Checking Errors
        //!===================================================
        const status = err.status || 500;
        const message = err.message || "Backend Error";
        const extraDetails = err.extraDetails || "Backend Error";

        return res.status(status).json({ message, extraDetails })

    } catch (error) {
        res.status(400).json({ message: error })
    }

}

module.exports = errorMiddleware;