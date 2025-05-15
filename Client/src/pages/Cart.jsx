import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCartItems } from "../api/cartApi";
import { Loader } from "../components/UI/Loader";

import { Error } from "../components/UI/Error";

export const Cart = () => {

    const { BASEURL, AuthorizationToken, user } = useAuth();

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    //!=========================================================
    //?  Update Quantity
    //!=========================================================
    const updateQuantity = (change, id, curQuantity) => {

        let newQuantity = curQuantity + change;

        if (newQuantity < 1) {
            return newQuantity = 1;
        }

        if (newQuantity >= 6) {
            return newQuantity = 5;
        }

        updateItemsQuantity(newQuantity, id)

    }

    //!=========================================================
    //?  Update Item Quantity
    //!=========================================================
    const updateItemsQuantity = async (newQuantity, id) => {
        try {
            const response = await fetch(`${BASEURL}/api/cart/update-quantity/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthorizationToken,
                },
                body: JSON.stringify({ newQuantity })
            })


            const res_Data = await response.json();

            if (response.ok) {
                queryClient.invalidateQueries(["cartItems"]); // ✅ Refetch cart data
            }
            else {
                console.log("Res_Data Failed : ", res_Data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    //!=========================================================
    //?  Remove item
    //!=========================================================
    const handleRemoveItem = async (product_id) => {

        const response = await fetch(`${BASEURL}/api/cart/remove`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: AuthorizationToken,
            },
            body: JSON.stringify({ product_id })
        })

        // console.log("response : ", response)
        const res_Data = await response.json();

        if (response.ok) {
            queryClient.invalidateQueries(["cartItems"]); // ✅ Refetch cart data
            // console.log("Quantity Updated : ", res_Data)

        }
        else {
            console.log("Res_Data Failed : ", res_Data)
        }
    };

    //!=========================================================
    //? Order Button
    //!=========================================================
    const handleOrderBtn = (id) => {
        // console.log("Id : ", id)
        navigate(`/order`)

    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])

    //!=========================================================
    //? Using React/Tanstack Query For Fetching Cart Items
    //!=========================================================

    const { data, isLoading, isError } = useQuery({
        queryKey: ["cartItems"],
        queryFn: () => fetchCartItems(AuthorizationToken)
    })

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <Error/>
    }



    if (!data) return <h1> You Have Not Added Any Item To The Cart </h1>

    if (data) {

        return (
            <div className="bg-violet-50 dark:bg-zinc-950  py-4 min-h-screen  ">
                <div className="container grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* Cart Items Section */}
                   <div className="md:col-span-2 bg-white dark:bg-zinc-900 h-fit p-4 rounded-lg shadow">
                        <h2 className="text-lg font-bold border-b pb-2">Your Cart Details</h2>

                        <div className=" max-h-[35rem] overflow-scroll">
                            {data?.allItems?.items?.length < 1 ?
                                <h1 className="py-9 text-2xl text-center">Your Cart Is Empty</h1> : ""
                            }
                            {
                                data?.allItems?.items && (


                                    data?.allItems?.items?.map((curItem) => {
                                        // console.log("map", curItem, curItem.product_id._id);
                                        return (
                                            <div
                                                key={curItem._id}
                                                className="flex  flex-row  items-center justify-between p-4 border-b ">

                                                <div className="flex flex-col gap-2">
                                                    <NavLink to={`/product/view/${curItem?.product_id?._id}`}>
                                                        <img src={`${BASEURL}/uploads/${curItem?.product_id?.imageURL}`} alt={curItem.name} className="w-20 h-20 rounded-md object-cover" />
                                                    </NavLink>
                                                    <div className="flex sm:hidden items-center space-x-2 border  rounded-full px-3 text-2xl">
                                                        <button onClick={() => updateQuantity(-1, curItem.product_id._id, curItem.quantity)} className="rounded-full border-zinc-500 "
                                                        >-</button>
                                                        <span className="text-lg font-semibold rounded-md px-1 py-1 ">{curItem.quantity}</span>
                                                        <button onClick={() => updateQuantity(1, curItem.product_id._id, curItem.quantity)} className=" disabled:bg-amber-50  
                                                     rounded-full"
                                                        >+</button>

                                                    </div>

                                                </div>

                                                <div className="flex-1 px-4">
                                                    <h3 className="text-md font-semibold">{curItem?.product_id?.pname}</h3>
                                                    <p className="text-gray-600">Size: {curItem?.product_id?.size},</p>
                                                    <div className="text-xl font-bold text-green-600">₹{curItem.total_price} <span className="text-zinc-400 line-through text-xl"></span></div>
                                                </div>

                                                {/* total_price */}
                                                {/* Quantity Controls */}
                                                <div className="hidden sm:flex items-center gap-2 mx-5  rounded-full text-3xl">
                                                    <button onClick={() => updateQuantity(-1, curItem.product_id._id, curItem.quantity, curItem.price)} className="px-3  border  rounded-full border-zinc-400 ">-</button>
                                                    <span className="text-lg font-semibold border rounded-md px-5 py-1 border-zinc-400  ">{curItem.quantity}</span>
                                                    <button onClick={() => updateQuantity(1, curItem.product_id._id, curItem.quantity)} className="px-3  border  border-zinc-400  rounded-full">+</button>
                                                </div>

                                                {/* Buttons */}
                                                <div className="flex flex-col space-y-2 mt-3 sm:mt-0">
                                                    {/* <button className="text-blue-600">Save for Later</button> */}
                                                    <button onClick={() => handleRemoveItem(curItem.product_id._id)} className="btn-red btn-effect ">Remove</button>
                                                </div>
                                            </div>

                                        )
                                    }
                                    )

                                )}
                        </div>

                    </div>

                    {/* Price Details Section */}
                    <div
                        className="bg-white  dark:bg-zinc-900 p-4 rounded-lg shadow md:col-span-1 md:self-start md:sticky top-4">
                        <h3 className="text-lg font-bold border-b pb-2">PRICE DETAILS</h3>
                        <p className="flex justify-between text-gray-700 dark:text-zinc-300"><span>Total :</span> <span>₹{data?.allItems?.total || 0} </span></p>
                        <p className="flex justify-between text-green-600"><span>Discount</span> <span>  ₹50 </span></p>
                        <p className="flex justify-between text-gray-700 dark:text-zinc-300"><span>Platform Fee</span> <span className="text-green-600">₹0</span></p>
                        <p className="flex justify-between text-green-600"><span>Delivery Charges</span> <span>Free</span></p>
                        <hr className="my-2" />
                        <p className="flex justify-between text-lg font-bold"><span>Total Amount</span> {
                            data?.allItems && (
                                <span>₹{data?.allItems?.total - 50 || 0}</span>
                            )
                        }
                        </p>
                        <p className="text-green-600 text-sm">You will save 50 on this order</p>
                        <div>

                            <button onClick={() => handleOrderBtn(data.allItems._id)} className={` w-full mt-4 py-2 btn-violet btn-effect disabled:bg-violet-200 `}
                                disabled={data.allItems?.items?.length < 1}

                            >Place Order</button>

                        </div>
                    </div>
                </div>

            </div >
        );
    }

};
