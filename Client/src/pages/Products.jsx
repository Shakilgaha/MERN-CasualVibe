import { NavLink } from "react-router-dom";
import { useAuth } from "../store/Auth";

import { fetchAllProduct } from "../api/productApi";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/UI/Loader";

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react";
import { SearchFilter } from "../components/UI/Search&Filter";

export const Products = () => {

    const { BASEURL } = useAuth();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all")

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: fetchAllProduct,
    })
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.4,
            },
        });
    }, [controls]);


    if (isLoading) return <Loader />
    if (isError) return <h1> Error.... {isError} </h1>



    const searchProducts = (product) => {

        if (search) {
            return product.pname.toLowerCase().includes(search.toLowerCase())
        } else {
            return product
        }
    }

    const filterProducts = (product) => {

        if (filter === "all") return product
        return product.category === filter
      
    }


    const filteredProducts = data?.getAllProduct?.filter((product) =>
        searchProducts(product) && filterProducts(product)
    )

 



    return (

        <div className="py-12 ">
            <div className="container div-center flex-col ">

                <SearchFilter
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                />

                <div className="mb-7 scroll-smooth">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5 h-fit ">
                        {filteredProducts?.map((product) => (

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 50
                                }}
                                animate={controls}
                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2
                                }}
                                viewport={{
                                    once: true
                                }}
                                key={product._id} onClick={() => handleProductClick(product._id)} className="group overflow-hidden border border-zinc-200 w-fit h-fit bg-white hover:shadow-2xl  hover:scale-105 hover:transition hover:duration-1000  dark:bg-zinc-900 dark:border-zinc-700 ">
                                <NavLink to={`view/${product._id}`}>
                                    <figure className="w-[10rem] h-[10rem] lg:w-[15rem] lg:h-[15rem] overflow-hidden  ">
                                        <img src={`${BASEURL}/uploads/${product.imageURL}`} alt={product.pname} className="w-full h-full object-cover object-center hover:scale-105 hover:transition hover:duration-1000" />

                                    </figure>
                                </NavLink>

                                {/* Hover Text */}

                                <div className="hidden group-hover:flex absolute right-2 top-2 text-sm bg-black/25 backdrop-blur-xl text-white rounded-full p-2 transition duration-500  ">
                                    <h1 className="">New</h1>
                                </div>
                                <div className="px-3 py-2 h-fit ">

                                    <h3 className="text-lg font-medium mt-2 max-w-[8rem] lg:max-w-[14rem] truncate block  ">{product?.pname}</h3>
                                    <p className=""> Price : {product?.price} <span className="text-gray-400 mx-3 line-through "> {product.price + 100}  </span>  </p>

                                    <div className="w-full h-0 bottom-0 left-0 transition group-hover:h-[3px] group-hover:bg-violet-500 duration-500  absolute ">

                                    </div>

                                </div>

                            </motion.div>
                        ))}
                    </div>
                </div>
               
            </div>
        </div >


    )
}