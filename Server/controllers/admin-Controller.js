
const userModel = require("../models/user-Model")
const contactModel = require("../models/contact-Model")
const orderModel = require("../models/order-Model")

const getAdminData = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({ message: "The Admin Is : ", user })

    } catch (error) {
        next(error)
    }
}

const readAllUserData = async (req, res, next) => {
    try {

        const allUsers = await userModel.find().select("-password");
        const countAllUser = await userModel.countDocuments();

        if (allUsers) {
            res.status(200).json({ countAllUser, allUsers })
        } else {
            res.status(401).json({ message: "Failed To Fetch Users" })
        }
    } catch (error) {
        next(error)
    }
}

const deleteUserById = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (id) {

            const checkIsAdmin = await userModel.findOne({ _id: id }).select("isAdmin");

            // console.log(checkIsAdmin.isAdmin, "IS Admin")

            if (checkIsAdmin.isAdmin) {
                return res.status(400).json({ message: "Admin Cannot Be Deleted" })
            }

            const deleteOne = await userModel.findOneAndDelete({ _id: id })

            if (deleteOne) {
                res.status(200).json({ message: "The User Deleted Successfully" })
            }
            else {
                res.status(400).json({ message: "Failed To Delete The User " })
            }
        }
        else {
            res.status(404).json({ message: "Contact id Is Not Recved " })
        }
    } catch (error) {
        // console.log("error from contact delete :", error)
        next(error)
    }
}


const readAllOrderData = async (req, res, next) => {
    try {

        const allOrders = await orderModel.find().populate("items.productId").populate("userId").populate("shippingDetails")
        const countAllOrders = await orderModel.countDocuments()

        if (allOrders) {
            res.status(200).json({ countAllOrders, allOrders })
        } else {
            res.status(401).json({ message: "Failed To Fetch Orders" })
        }
    } catch (error) {
        next(error)
    }
}

const deleteOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;

        // console.log("Delete Order Id : ", id)

        const deleteById = await orderModel.findOneAndDelete({ _id: id })

        if (deleteById) {
            res.status(200).json({ message: "Order Deleted Successfully" })
        } else {
            res.status(404).json({ message: "Order Not Found" })
        }


    } catch (error) {

    }
}

const editOrderById = async (req, res, next) => {
    try {
        const order = req.body;
        const { daysLeft, status, _id } = req.body;

        // console.log("Order Details Update Order ", _id, order)
        // console.log("Order Details Update Order 2 ", daysLeft, status)

        const updateOrder = await orderModel.findOneAndUpdate({ _id },
            { $set: { "status": status, "daysLeft": daysLeft } },
            { new: true }
        )

        // console.log("Order Details Update Order 3 ", updateOrder)
        if (updateOrder) {
            res.status(200).json({ message: "The Details Are Updated" })
        } else {
            res.status(400).json({ message: "The Details Not Updated" })
        }

    } catch (error) {
        // console.log("error", error)
        next(error)
    }
}

const readAllContactData = async (req, res, next) => {
    try {
        const allMessage = await contactModel.find();
        const countAllMessage = await contactModel.countDocuments();

        if (allMessage) {
            res.status(200).json({ countAllMessage, allMessage })
        } else {
            res.status(401).json({ message: "Failed To Fetch Users" })
        }

    } catch (error) {
        next(error)
    }
}


const deleteContactById = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (id) {

            const deleteOne = await contactModel.findOneAndDelete({ _id: id })

            if (deleteOne) {
                res.status(200).json({ message: "The Message Deleted Successfully" })
            }
            else {
                res.status(400).json({ message: "Failed To Delete The Message " })
            }
        }
        else {
            res.status(404).json({ message: "Contact id Is Not Recved " })
        }
    } catch (error) {
        // console.log("error from contact delete :", error)
        next(error)
    }
}


module.exports = { getAdminData, readAllContactData, deleteContactById, readAllUserData, deleteUserById, readAllOrderData, deleteOrderById, editOrderById }