import { useEffect, useState } from "react";

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { ProductsCard } from "../components/UI/Products-Card";
import { NavLink } from "react-router-dom";
import { Products } from "./Products";

import { motion } from "framer-motion"
import { Review } from "../components/UI/Review.jsx";



export const Home = () => {

    const images = [
        "/SliderImg/img1.jpg",
        "/SliderImg/img2.jpg",
        "/SliderImg/img3.jpg",
       
    ];

    const [curIndex, setCurIndex] = useState(0);


    const handlePrevBtn = () => {
        setCurIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
    }

    const handleNextBtn = () => {
        setCurIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
    }

    useEffect(() => {
        const interval = setInterval(handleNextBtn, 3000);
        return () => clearInterval(interval)
    }, []);


    return (
        <div className="bg-white dark:bg-zinc-900  ">
            <div className="bg-[#F2F0FF] dark:bg-zinc-800  josefin-sans tracking-wide mb-12  ">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
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
                    className="container grid grid-cols-1 lg:flex justify-between gap-5 ">

                    <section className=" flex flex-col w-full gap-6 justify-center h-full">
                        <figure className=" flex w-full justify-center items-center md:justify-start ">
                            <img src="/lamp.webp" alt="" className="w-[8rem] lg:w-[10rem]  " />
                        </figure>

                        <div className=" py-3 lg:pb-[6rem] flex flex-col gap-5  ">
                            <h1 className="text-xl lg:text-2xl text-violet-600 font-bold">
                                Best Collection For Your Style....
                            </h1>
                            <h1 className="text-3xl lg:text-5xl flex flex-col gap-5 font-bold">
                                New Fashion Collection <br /> <span> Trends in 2025 </span>
                            </h1>
                            <p className="text-[#8480ca]">
                                Welcome to CasualVibe, your go-to destination for trendy and comfortable fashion. We believe that style should be effortless, and our collection is designed to help you express yourself with confidence.

                            </p>
                            <NavLink to="/product" >  <button className="btn-violet btn-effect w-fit">
                                Shop Now
                            </button></NavLink>
                        </div>
                    </section>

                    <section className=" relative w-full flex justify-center lg:justify-end">
                        <figure className="relative mb-12 lg:my-[6rem] rounded-3xl shadow-md  hover:shadow-2xl border-violet-600 w-[30rem] h-[25rem] md:h-[30rem] flex items-center overflow-hidden transition-all duration-1000  ">
                            {/* Slider Images  */}
                            <img src={`${images[curIndex]}`} alt="" className="transition-all duration-1000 hover:rotate-y-3 object-cover object-center h-full w-full scale-105 hover:scale-110 md:h-[35rem] transform " />

                            {/* Hover Buttons  */}
                            <section className="absolute w-full flex justify-between px-5">
                                <button onClick={handlePrevBtn} className=" w-fit h-fit flex rounded-full p-2 items-center bg-white opacity-25 text-black">  <GrPrevious /> </button>
                                <button onClick={handleNextBtn} className="w-fit h-fit flex rounded-full p-2 items-center bg-white opacity-25 text-black">  <GrNext /> </button>
                            </section>
                            <section className="absolute bottom-4 right-0 left-0">
                                <div className="  flex gap-3 justify-center items-center">

                                    {
                                        images.map((_, i) => {
                                            return <div key={i} className={` p-2 bg-purple-500 rounded-full  ${curIndex === i ? "p-3" : "opacity-40"} `} />
                                        })
                                    }
                                </div>
                            </section>

                        </figure>

                    </section>
                </motion.div>
            </div>
            <ProductsCard />
            <Review/>
        </div>
    )
}