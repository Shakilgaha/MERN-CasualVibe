
const mongoose = require("mongoose");

const cartModel = require("../models/cart-Model")

const getAllCartItems = async (req, res, next) => {
    try {

        const user_id = req.user._id;
        // console.log(user_id)

        const allItems = await cartModel.findOne({ user_id }).populate("items.product_id");

        if (allItems) {
            res.status(200).json({allItems})
        } else {

            res.status(200).json({ message: "Your Cart Is Empty" })
        }

    } catch (error) {
        next(error)
    }
}

const addCartItems = async (req, res, next) => {
    try {
        const { user_id, items, subtotal, total } = req.body;

        //!==============================================
        //* Check if user_id and product_id are valid Obj
        //!==============================================ectIds
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items provided" });
        }

        //!==============================================
        //* Extract product details from the first item
        //!==============================================
        const { product_id, name, quantity, price,} = items[0];

        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }

        //!==============================================
        //* Check if the user already has a cart
        //!==============================================
        let userCart = await cartModel.findOne({ user_id });

        if (userCart) {
            //!==============================================
            //* Check if the product already exists in the cart
            //!==============================================
            const isProductExist = userCart.items.some(item => item.product_id.equals(product_id));

            if (isProductExist) {
                return res.status(400).json({ message: "Product Already Exists in Cart" });
            }

            //!==============================================
            //* Add new product to the cart
            //!==============================================
            const newProducts = items.map(curItem => ({
                product_id: curItem.product_id,
                name: curItem.name,
                price: curItem.price,
                total_price: curItem.quantity * curItem.price,
            }));

            userCart.items.push(...newProducts); //? it will push the new array after the prev array
            userCart.subtotal += subtotal;
            userCart.total += total;
            await userCart.save();

            return res.status(200).json({ message: "Product added to cart", cart: userCart });
        } else {

            //!==============================================
            //* If no cart exists, create a new cart
            //!==============================================
            const newCart = new cartModel({
                user_id,
                items: items.map(curItem => ({
                    product_id: curItem.product_id,
                    name: curItem.name,
                    quantity: curItem.quantity,
                    price: curItem.price,
                    total_price: curItem.quantity * curItem.price,
                })),
                subtotal,
                total,
            });

            await newCart.save();
            return res.status(201).json({ message: "New cart created with product", cart: newCart });
        }
    } catch (error) {
        // console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const deleteCartItemById = async (req, res, next) => {
    try {

        //!==============================================
        //* IFind Logged In user Id
        //!==============================================
        const user_id = req.user._id;

        //!==============================================
        //* Check Is User has Cart Items In user Id
        //!==============================================
        const findCart = await cartModel.findOne({ user_id }).select("items");

        if (findCart) {
            // console.log("FindCart item : ", findCart.items)

            const { product_id } = req.body;
            // console.log("product Id", product_id)

            //!==============================================
            //* If no product exists, than return
            //!==============================================
            const isProductExist = findCart.items.some(item => item.product_id.equals(product_id));
            // console.log("productExist : ", isProductExist)


            if (!isProductExist) {
                return res.status(400).json({ message: "Items Already Deleted" })
            }
            if (isProductExist) {

                //!==============================================
                //* Remove Item From Cart Using $pull
                //!==============================================
                const removeItem = await cartModel.findOneAndUpdate({ user_id }, {
                    $pull: {
                        items: {
                            product_id
                        }
                    }
                })

                return res.status(200).json({ message: "Items Deleted", removeItem })
            }
        }
        else {
            res.status(201).json({ message: "user Not Exist", })
        }

    } catch (error) {
        next(error)
    }
}


const updateItemQuantityById = async (req, res, next) => {
    try {

        const user_id = req.user._id;
        //console.log(user_id)

        const { newQuantity } = req.body;
        const { product_id } = req.params;

        // console.log("Quantity   ", product_id, newQuantity)

        //? Finding Cart Is It Exist
        const findCart = await cartModel.findOne({ user_id }).select("items");

        if (!findCart) {
            return res.status(400).json({ message: "Cart Not Found " })
        }

        const cartItems = findCart.items;
        // console.log("cartItems : ", cartItems)


        //? Find The Specific Product In The Cart

        let itemIndex = cartItems.findIndex(item => item.product_id.equals(product_id));
        if (itemIndex === -1) {
            return res.status(400).json({ message: "Product Does Not Exist" })
        }

        //? Update The Quantity And Total price Of The Product

        cartItems[itemIndex].quantity = newQuantity;
        cartItems[itemIndex].total_price = cartItems[itemIndex].price * newQuantity;

        //? Calculating New Cart Total 
        const newCartTotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);

        //? Update The DB With New Quantity And TotalPrice 
        const updatedCart = await cartModel.findOneAndUpdate({ user_id, "items.product_id": product_id },
            { $set: { "items.$.quantity": newQuantity, "items.$.total_price": cartItems[itemIndex].total_price, total: newCartTotal } } ,
            { new : true }
        )

        // console.log("updateQauntity : ", updatedCart)
        res.status(200).json({ message: "Item Quantity  Updated", updatedCart, cartItems, itemIndex })

    } catch (error) {
        next(error)
    }
}
module.exports = { getAllCartItems, addCartItems, deleteCartItemById, updateItemQuantityById }

