
const userModel = require("../models/user-Model")
const JWT = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {

    try {
        //!=====================================================
        //? Checking Is Token Is provided Or Not
        //!=====================================================

        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized User Token Not Found" })
        }
        // console.log("\nAuthorization Token : ", token)
        //!=====================================================
        //? replacing the Extra Value from token
        //!=====================================================

        const JWTToken = token.replace("Bearer", "").trim();
        // console.log("\nAuthorization JWTToken: ", JWTToken)

        //!=====================================================
        //? Checking Is User Token Is Verified Or Not
        //!=====================================================

        const verifyToken = JWT.verify(JWTToken, process.env.SECRETE_KEY)
        // console.log("\nAuthorization verifyToken : ", verifyToken)

        if (verifyToken) {

            //!=====================================================
            //? if All Is Correct Than Find The LoggedIn User
            //!=====================================================
            const findUser = await userModel.findOne({ _id: verifyToken.userId }).select("-password")
            // res.status(200).json({ findUser })
            // console.log("\nAuthorization FindUser: ", JWTToken)
            if (findUser) {
                req.user = findUser;
                req.token = JWTToken;
                next()
            } else {
                return res.status(401).json({ message: "The User Is Not Found" })
            }

        } else {
            res.status(401).json({ message: "User Is Unauthorized" })
        }

        // 
        //  res.status(200).json({ message: "Welcome : ", token, JWTToken, verifyToken })

    } catch (error) {
        next(error)
    }
}


module.exports = authMiddleware;