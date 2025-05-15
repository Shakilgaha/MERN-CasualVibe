
const IsAdminMiddleware = (req, res, next) => {
    try {
        const user = req.user;
        // console.log(user)

        if (user.isAdmin === true) {
            req.user = user;
            next();
            // res.status(200).json({ message: "The User is Admin" })

        } else {
            return res.status(401).json({ message: "The User Is Not Admin" })
        }


    } catch (error) {
        next(error)
    }
}

module.exports = IsAdminMiddleware;