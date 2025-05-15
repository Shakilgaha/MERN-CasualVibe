
const userModel = require("../models/user-Model")
const bcrypt = require("bcryptjs")


const userRegister = async (req, res, next) => {
    try {
        const userData = req.body;

        const { username, email, password, phone } = userData;

        // console.log(userData)
        //!===================================================
        //? Checking is User Already Exist        
        //!===================================================

        const findUser = await userModel.findOne({ $or: [{ email }, { phone },] }).select("-password");
        // console.log("User ", findUser)

        if (findUser) {
            return res.status(400).json({ message: "User is Already Exist" })
        }

        //!===================================================
        //? Registering User
        //!===================================================

        const createdUser = await userModel.create({
            username,
            email,
            password,
            phone
        });
        // console.log("User c", createdUser)
        if (createdUser) {

            //!===================================================
            //? Generate The JWT Token For Authorization
            //!===================================================
            const token = await createdUser.generateToken();
            res.status(201).json({ createdUser, token })
        } else {
            res.status(400).json({ message: "Failed To Register User , Please Try Again.. " })
        }

    } catch (error) {
        // console.log("user register error : ", error)
        next(error)
    }
}


const userLogin = async (req, res, next) => {
    try {

        const { phone, password } = req.body;

        //!===================================================
        //? Check In DB For Is User Exist
        //!===================================================
        const isUserExist = await userModel.findOne({ phone });

        if (!isUserExist) {
            return res.status(400).json({ message: " Invalid Email Or Password " })
        }

        //!===================================================
        //? Compare The User Password  In DB 
        //!===================================================
        const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password)

        if (isPasswordCorrect) {

            //!===================================================
            //? Generate The JWT Token For Authorization
            //!===================================================
            const token = await isUserExist.generateToken();

            res.status(200).json({ phone, password, token })
        } else {
            res.status(401).json({ message: " Invalid Email Or Password " })
        }

    } catch (error) {
        next(error)
    }
}


module.exports = { userRegister, userLogin }