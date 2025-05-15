const userModel = require("../models/user-Model")
const addressModel = require("../models/address-Model")
const orderModel = require("../models/order-Model")
const contactModel = require("../models/contact-Model")
const { default: mongoose } = require("mongoose")

const reviewModel = require("../models/review-Model")



const userAuthCheck = async (req, res, next) => {
    try {

        const userId = req.user._id;
        const user = await userModel.findOne({ _id: userId }).populate("address")
        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}

const sendContact = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { username, email, subject, message } = req.body;

        // console.log("User From Send Contact : ", userId)
        // console.log("User From Send Contact body : ", req.body)


        //!===================================================
        //? If User Has Already Messaged 2 Times Than Return 
        //!==================================================
        const isUserExist = await userModel.findOne({ _id: userId })
        if (!isUserExist) {
            return res.state(401).json({ message: "User Is Not Exist" })
        }

        const isUserContactExist = await contactModel.countDocuments({ userId })

        if (isUserContactExist >= 2) {
            return res.status(400).json({ message: "You Can Only Send 2 Message" })
        }

        //!===================================================
        //? Send Contact Details To DB 
        //!==================================================
        const sendContact = await contactModel.create({
            userId,
            username,
            email,
            subject,
            message
        })

        if (sendContact) {
            res.status(200).json({ message: "The Contact Send Success", sendContact, username, email, subject, message })
        } else {
            res.status(500).json({ message: "Failed To Send Message" })
        }

    } catch (error) {
        next(error)
    }
}

const userProfileRead = async (req, res, next) => {
    try {
        const userId = req.user._id;
        // console.log("user From order History : ", userId)

        //!===================================================
        //? Fetching user Details
        //!===================================================
        const findUser = await userModel.findOne({ _id: userId }).select("-password").populate("address")
        const findOrder = await orderModel.find({ userId }).populate("items.productId")
        if (findUser) {
            res.status(200).json({ findUser, findOrder })
        } else {
            res.status(200).json({ message: "Failed Fetch Data" })
        }
    } catch (error) {
        next(error)
    }
}

const userProfileUpdate = async (req, res, next) => {
    try {
        const userId = req.user._id;
        // console.log("user From order History : ", userId)

        //!===================================================
        //? Fetching userData To Update
        //!===================================================
        const findUser = await userModel.findOne({ _id: userId })

        if (findUser) {
            const { username, password } = req.body;

            //!===================================================
            //? Updating The User 
            //!===================================================
            const updateUser = await userModel.findOneAndUpdate({ _id: findUser._id }, { username, password })
            res.status(200).json({ message: "User Profile", updateUser, username })

        } else {
            return res.status(200).json({ message: "Failed Fetch Data" })
        }
    } catch (error) {
        next(error)
    }
}

const createAddress = async (req, res, next) => {

    try {

        const user_Id = req.params.id;

        const { address, city, pinCode, subDistrict, district, state, } = req.body

        // console.log("UserId : ", user_Id)

        //!=====================================================
        //? Checking Is User Is Exist Or Not
        //!=====================================================

        if (!mongoose.Types.ObjectId.isValid(user_Id)) {
            return res.status(500).json({ message: "The Id Is Invalid" })
        }

        const isUserExist = await userModel.findOne({ _id: user_Id }).select("-password")
        // console.log(isUserExist)
        if (!isUserExist) {
            return res.status(401).json({ message: "The User Is Unauthorized" })
        }


        //!=====================================================
        //? Checking Is User Already Created The Address
        //!=====================================================

        const isAddressExist = await addressModel.findOne({ userId: user_Id })
        if (isAddressExist) {
            return res.status(200).json({ message: "Address Is Already Created , You can Update Address" })
        }

        //!=====================================================
        //? Create The Address
        //!=====================================================
        console.log("isUserExist : ", isUserExist)

        const createAddress = await addressModel.create({
            userId: user_Id,
            address,
            city,
            pinCode,
            subDistrict,
            district,
            state,
        })
        console.log("Created Address : ", createAddress)

        if (createAddress) {

            const addressId = createAddress._id;

            const user = await userModel.findById({ _id: user_Id });

            if (!user) {
                return res.status(404).json({ message: "User Not Found" })
            }


            //!=====================================================
            //? Add Address Id To the user Schema
            //!=====================================================

            user.address = addressId;

            await user.save(); //? it Will Save Address Into userModel 
            // console.log("id Exist : ", isUserExist)

            res.status(200).json({ message: "Address Created Successfully", createAddress })


        } else {
            res.status(401).json({ message: "Failed To Create Address", createAddress })
        }


    } catch (error) {
        next(error)
    }
}


const readAddress = async (req, res, next) => {
    try {

        const loggedUser = req.user;
        // console.log(loggedUser)

        //!=====================================================
        //? Checking Is User Is Logged Or Not
        //!=====================================================
        if (!loggedUser) {
            return res.status(401).json({ message: "Please Login To Read Address" })
        }

        //!=====================================================
        //? Checking Is User Is Exist Or Not
        //!=====================================================

        const getUserAddress = await addressModel.findOne({ userId: loggedUser._id })

        if (getUserAddress) {
            res.status(200).json({ message: "The Address is This", getUserAddress })
        } else {
            res.status(200).json({ message: "Address Is Not Created" })

        }

    } catch (error) {
        next(error)
    }
}

const userOrderHistory = async (req, res, next) => {

    try {
        const userId = req.user._id;
        // console.log("user From order History : ", userId)
        const findUser = await orderModel.find({ userId })

        if (findOrder.length > 0) {
            const countOrder = await orderModel.countDocuments();
            res.status(200).json({ message: "User Order History", findOrder, countOrder })
        } else {
            res.status(200).json({ message: "You have Not Ordered Anything" })
        }

    } catch (error) {
        next(error)
    }
}


const createReview = async (req, res, next) => {
    try {
        const comment = req.body
        const { review } = req.body;
        const userId = req.user._id;
        // console.log("Review Body : ", review, userId, comment)
        //!=====================================================
        //? Checking Is User Is Exist Or Not
        //!=====================================================

        const isUserExist = await userModel.findById(userId)
        if (!isUserExist) {
            return res.status(401).json({ message: "The User Is Unauthorized" })
        }



        //!=====================================================
        //? Checking Is User Already Reviewed The Same Product 
        //!=====================================================
        const isReviewExist = await reviewModel.countDocuments({ userId })

        // console.log("isReviewExist : ",isReviewExist)
        if (isReviewExist > 3) {
            return res.status(200).json({ message: "The User Can Review Only 4 Times" })
        }

        //!=====================================================
        //? Create The Review
        //!=====================================================

        const createReview = await reviewModel.create({
            userId,
            review
        })
        if (createReview) {
            res.status(201).json({ message: "Thanks For Review", createReview })
        }

    } catch (error) {
        next(error)
    }
}

const viewReview = async (req, res, next) => {
    try {

        const getAllReviews = await reviewModel.find().populate("userId", "-password");
        const countAllReviews = await reviewModel.countDocuments()

        if (getAllReviews.length > 0) {
            res.status(200).json({ getAllReviews , countAllReviews })
        } else {
            res.status(200).json({ message: "Review Not Found: " })

        }

    } catch (error) {
        next(error)
    }
}


module.exports = { userAuthCheck, sendContact, createAddress, readAddress, userOrderHistory, userProfileRead, userProfileUpdate, createReview, viewReview, };