import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "./Loader";
import { fetchCartItems } from "../../api/cartApi";
import axios from "axios";
import { Error } from "./Error";


export const OrderPage = () => {

    const { BASEURL, AuthorizationToken, user } = useAuth();
    const navigate = useNavigate();


    const [payment, setPayment] = useState("COD")
    const [order, setOrder] = useState({
        userId: "",
        totalAmount: "",
        shippingDetails: "",
        items: "",
    })

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        setPayment(value)

    }

    // const handlePayBtn = () => {
    //     // alert("Payment Done")
    // }

    useEffect(() => {
        window.location.reload;
    }, [])

    const { data, isLoading, isError } = useQuery({
        queryKey: ["cartItems"],
        queryFn: () => fetchCartItems(AuthorizationToken)
    })

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <Error />
    }

    // console.log("Data from UswQuery Cart Items ", data)



    const handleOrderBtn = async (e) => {

        setOrder({
            userId: data?.allItems?.user_id,
            totalAmount: data?.allItems?.total,
            shippingDetails: user?.address,
            items: data?.allItems?.items,
            payment: payment,

        })

        if (order.userId) {
            try {
                const response = await axios.post(`${BASEURL}/api/order/create`, order, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: AuthorizationToken,
                    },
                });

                // console.log("response order:", response);

                if (response.status === 200) {
                    toast.success("Order Successful");
                    navigate("/orderConfirm")
                } else {
                    toast.error("Order Failed");
                }

                // console.log("Response Data:", response.data);
            } catch (error) {
                toast.error("Order Failed");
                console.error("Error:", error);
            }
        } else {
            setOrder({
                userId: data?.allItems?.user_id,
                totalAmount: data?.allItems?.total,
                shippingDetails: user?.address,
                items: data?.allItems?.items,
                payment: payment,

            })
        }

    }







    return (
        <div>
            <div className="container py-3 flex flex-col  gap-6">
                <section id="Products-Details" className=" px-5 py-4 border border-zinc-300 dark:border-zinc-700 rounded-lg" >
                    <h1 className="w-full border-b border-zinc-300 dark:border-zinc-700 text-2xl font-bold"> Order Items :  </h1>

                    <ul>

                        {
                            data?.allItems?.items?.map((curProduct, index) => {

                                return (
                                    <li key={index} className="border border-zinc-300 dark:border-zinc-700 w-full rounded-lg my-5 p-2 flex gap-4">
                                        <figure className=" w-fit rounded-md ">
                                            <img src={`${BASEURL}/uploads/${curProduct?.product_id?.imageURL}`} alt="" className="w-25 h-25 rounded-md " />
                                        </figure>
                                        <section className="flex justify-between w-full">
                                            <section>
                                                <h1 className="text-2xl"> {curProduct?.product_id?.pname} </h1>
                                                <p> Color : {curProduct?.product_id?.color} </p>
                                                <p> Price : {curProduct?.price} </p>
                                                <p> Total_Price : {curProduct?.total_price} </p>
                                            </section>

                                        </section>

                                    </li>
                                )
                            })
                        }
                    </ul>
                    <h1 className="border-t pt-4 font-bold text-2xl"> Total :  {data?.allItems.total} </h1>
                </section>

                {/* 
                //!=====================================
                //? Address Details
                //!=====================================

                */}


                <section id="Address-Details" className="  p-4 border rounded-lg border-zinc-300 dark:border-zinc-700" >
                    <h1 className="text-2xl font-bold mb-3 border-b border-zinc-300 dark:border-zinc-700 ">Address</h1>

                    {!user?.address?.address ? <NavLink to="/profile" className="btn-blue"> Add Address</NavLink> : <>


                        <ul className="text-xl font-bold  [&>li>span]:text-gray-900 dark:[&>li>span]:text-gray-300 [&>li>span]:font-normal ">
                            <li> Address :  <span>    {user?.address?.address}</span></li>
                            <li> City : <span> {user?.address?.city} </span></li>
                            <li> PinCode : <span> {user?.address?.pinCode} </span></li>
                            <li> Sub-District : <span> {user?.address?.subDistrict}</span> </li>
                            <li> District : <span> {user?.address?.district} </span></li>
                            <li> State : <span>  {user?.address?.state} </span></li>
                            <li> Country : <span> {user?.address?.country} </span></li>
                        </ul>
                    </>}
                </section>
                <section id="Payment-Details" className="  p-4 border rounded-lg border-zinc-300 dark:border-zinc-700" >
                    <h1 className="text-2xl font-bold mb-3 border-b border-zinc-300 dark:border-zinc-700">Payment Method </h1>

                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col py-5 gap-5">
                        <div className="w-full flex gap-4">
                            {/* <h1 className="text-red-500">Select Any One </h1> */}
                            <span>

                                <input
                                    type="radio"
                                    name="payment"
                                    required
                                    value="COD"
                                    onChange={handleChange}
                                    checked={payment === "COD"}
                                    className=" scale-150 mx-2"
                                />Cash On Delivery
                            </span>
                            {/* <span>

                                <input
                                    type="radio"
                                    name="payment"
                                    required
                                    value="online"
                                    checked={payment === "online"}
                                    onChange={handleChange}
                                    className=" scale-150 mx-2"
                                />Online
                            </span> */}

                        </div>



                        {/* {
                            payment ? "" : <>
                                {payment === "COD" ? "" : <>
                                    <button onClick={() => handlePayBtn()} className="btn-blue w-fit">
                                        Make Payment
                                    </button>
                                </>}
                            </>
                        } */}
                        <section className="">
                            <button type="submit" onClick={() => handleOrderBtn()} className="btn-blue btn-effect">
                                Order
                            </button>
                        </section>
                    </form>


                </section>




            </div>
        </div>

    )
}