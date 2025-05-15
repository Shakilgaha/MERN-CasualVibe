import { useEffect, useState } from "react"
import { useAuth } from "../../store/Auth";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { IoCartOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import { fetchSingleProduct } from "../../api/productApi";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "./Loader";
import { ProductsCard } from "./Products-Card";
import { Error } from "./Error";

export const SingleProductPage = () => {

    const [isDetails, setIsDetails] = useState(false);

    const { BASEURL, AuthorizationToken, user, } = useAuth();

    const params = useParams()

    const navigate = useNavigate();

    //!=========================================================
    //? Add To Cart
    //!=========================================================
    const handleAddToCart = async (id) => {

        if (!user) return navigate("/login")

        try {
            const { _id, pname, price, } = data;
            const quantity = "1";
            const totalPrice = price;
            const subtotal = price;
            const total = price;

            const items = ({
                user_id: user._id,
                items:
                    [{
                        product_id: _id,
                        name: pname,
                        quantity: quantity,
                        price: price,
                        total_price: totalPrice
                    }]
                ,
                subtotal: subtotal,
                total: total
            })
        

            if (!items) {
                return <h1> Loading </h1>
            }
            if (items) {
                const response = await fetch(`${BASEURL}/api/cart/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: AuthorizationToken,
                    },
                    body: JSON.stringify(items)
                })

                const res_Data = await response.json();
                if (response.ok) {
                    toast.success("Item Added To Cart")
                } else {
                    toast.error(res_Data.extraDetails || res_Data.message)

                }

            }

        } catch (error) {
            console.log(error)
        }
    }

    //!=========================================================
    //? Order Button
    //!=========================================================
    const handleOrderBtn = async (id) => {
        handleAddToCart();
        navigate(`/cart`)
    }

    const handleGoBackBtn = () => {
        navigate(-1)
    }

    const id = params.id;
    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchSingleProduct(id),

    })

    //!==================================================
    //?  If Product Not Fetched Than SHow Loading
    //!==================================================

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <Error />
    }
    // console.log("Data Of UseQuery In Single product Data :", data)

    return (


        <div div className="py-6  flex flex-col gap-5  " >
            <div className=" bg-violet-50 dark:bg-zinc-800 py-12 text-4xl font-bold ">
                <h1 className="container">Product Details</h1>
            </div>

            <div className="container  div-center font-bold  backdrop-blur-2xl rounded-2xl px-5 ">

                <section className=" text-4xl text-black absolute top-1 left-8 ">
                    <button onClick={handleGoBackBtn}> <IoMdArrowRoundBack /> </button>
                </section>
                <div className="bg-transparent group grid grid-cols-1 lg:grid-cols-2  justify-between items-center gap-5 overflow-hidden w-full h-full hover:transition hover:duration-1000">

                    <div className="bg-transparent flex flex-col lg:flex-row  justify-center  items-center lg:py-[2rem]   ">
                        <figure id="singleProductImg" className="order-2 lg:order-1 w-fit flex  lg:flex-col justify-between gap-6 px-3 h-fit ">
                            <img src={`${BASEURL}/uploads/${data.imageURL}`} alt={data.pname} className=" " />
                            <img src={`${BASEURL}/uploads/${data.imageURL}`} alt={data.name} className="" />
                            <img src={`${BASEURL}/uploads/${data.imageURL}`} alt={data.name} className="" />
                        </figure>
                        <figure className="w-full  px-3 order-1 lg:order-2 flex  justify-center my-4">
                            <img src={`${BASEURL}/uploads/${data.imageURL}`} alt={data.pname} className="w-[30rem] h-[30rem] object-cover object-center shadow-2xl  hover:scale-105 hover:transition hover:duration-1000" />

                            <h1 className={` ${data.stock > 0 ? "bg-green-500" : "bg-red-500"}  absolute top-7 left-12  md:left-52 md:top-13 px-4 py-2 rounded-full text-white`} > {data.stock > 0 ? "In Stock" : "Out Of Stock"}  </h1>

                        </figure>
                    </div>


                    <ul className=" px-3 py-2 w-full h-full flex flex-col gap-2 justify-center  ">

                        <li className="text-4xl font-bold mt-2">{data.pname}</li>

                        <li> Review</li>

                        <li className="">{data.price} <span className="text-gray-500 mx-3 line-through ">  ₹ {data.price + 100}  </span></li>

                        <li> Colors :
                            <span >  {data.color} </span>
                        </li>

                        <li> Size :
                            {data?.size?.map((curSize, index) => {
                                return <span key={index}>  {curSize}, </span>
                            })}
                        </li>
                        <li> Gender : {data.gender}  </li>

                        <li>
                            Category :<span>  {data.category} </span>
                        </li>


                        <li className="w-full ">
                            {data.stock < 0 ? <p className="bg-white/50 backdrop-blur-2xl rounded-md w-fit px-7 py-2 border border-zinc-300 text-red-600 ">SoldOut </p> :
                                <>
                                    <p> Stock :<span>  {data.stock} </span></p>

                                    <div className="flex gap-5 my-3 w-full justify-between  ">
                                        <button onClick={() => handleAddToCart(data._id)} className="btn-black btn-effect gap-2 w-full "> <span className="text-2xl font-bold"> <IoCartOutline /> </span> Add To Cart</button>
                                        <button onClick={() => handleOrderBtn(data._id)} className="btn-violet btn-effect w-full">Order Now</button>
                                    </div>

                                </>
                            }
                        </li>
                        <li className=" rounded-md border border-zinc-300 dark:border-zinc-700 p-2 flex flex-col" >
                            <section className="flex justify-between  " onClick={() => setIsDetails(!isDetails)}>
                                See Addition Details
                                <button className="text-2xl "  > {
                                    isDetails ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />} </button>
                            </section>

                            <ul className={`${isDetails ? "flex" : "hidden"}  py-2 flex flex-col`}>
                                <li className="border-t border-zinc-400 py-1 px-1"> Description : <span>  {data.description} </span></li>
                                <li className="border-t border-zinc-400 py-1 px-1">Brand : Casual Vibe</li>
                                <li className="border-t border-zinc-400 py-1 px-1">Sold By : {data?.addedBy?.username} </li>
                                {/* <li className="border-t border-zinc-400 py-1 px-1"></li> */}
                                <li className="flex gap-2 items-center border-t border-zinc-400 py-1 px-1 "> <span className="text-2xl">  <TbTruckDelivery /> </span> Free Delivery On Every Order </li>

                            </ul>
                        </li>
                        <li>

                        </li>
                    </ul>

                </div>
            </div>

            <div>

                <ProductsCard />

            </div>
        </div >
    )
}