const productModel = require("../models/product-Model")
const orderModel = require("../models/order-Model")

const createOrder = async (req, res, next) => {

    try {

        const { userId, items, totalAmount, shippingDetails, payment } = req.body;

        // console.log("heyy Order Is There", req.body)


        // const findProduct = await productModel.find 


        //!===================================================
        //? Creating order
        //!===================================================
        if (req.body) {
            const createOrder = await orderModel.create({
                userId,
                items:
                    items?.map((curItem) => {
                        const { product_id, quantity, price, } = curItem;
                        const { _id } = product_id;

                        // console.log("CurItem : ", curItem);
                        return {
                            productId: _id,
                            quantity,
                            price,
                        }
                    })
                ,
                totalAmount,
                payment,
                shippingDetails,
            })
            // console.log("Created Order IN Shakil Log : ", createOrder)

            if (createOrder) {

                //!=================================================
                //? Decrease Product Stock By Order Quantity
                //!=================================================

                for (const item of createOrder.items) {
                    const { productId, quantity } = item;
                    // console.log("id And Quantity : ", productId, quantity)

                    await productModel.updateOne({ _id: productId },
                        { $inc: { stock: -quantity } }
                    )

                    // console.log("Stock Updated Successfully", productId)

                }

            }

            res.status(200).json({ message: "Order Created", createOrder });
        }

    } catch (error) {
        next(error)
    }
}


const readOrder = async (req, res, next) => {
    try {

        const readOrder = await orderModel.find();

        if (readOrder.length > 0) {
            res.status(200).json({ message: "All Orders : ", readOrder })
        } else {
            res.status(401).json({ message: "No Order Found" })
        }

    } catch (error) {
        next(error)
    }
}

module.exports = { createOrder, readOrder };