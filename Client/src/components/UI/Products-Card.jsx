// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useQuery } from '@tanstack/react-query';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { fetchAllProduct } from '../../api/productApi';
import { Loader } from './Loader';
import { useAuth } from '../../store/Auth';
import { NavLink } from 'react-router-dom';
import { Error } from './Error';


export const ProductsCard = () => {

    const { BASEURL } = useAuth();
    const category = ["T-Shirt", "Pant", "Cap"]


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
    if (isError) return <Error />

    return (

        <div className=''>
            <div className='container py-5  '>

                <h1 className='text-4xl font-bold'>
                    Explore Our Latest Products
                </h1>

                {category?.map((curCategory, index) => {

                    return <div key={index}>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            breakpoints={{
                                320: { slidesPerView: 2 },
                                430 : {slidesPerView: 3} ,
                                664: { slidesPerView: 4 },
                                1200: { slidesPerView: 5 },
                                1536: { slidesPerView: 6 }
                            }}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            className=' my-12 bg-transparent border border-zinc-100 dark:border-zinc-700 rounded-md  '
                        >

                            <h2 className="absolute top-0 text-3xl font-bold  bg-violet-500 text-white py-2 w-full text-center">{curCategory}</h2>

                            {data?.getAllProduct?.map((curProduct,index) => {
                                if (curCategory === curProduct.category) {

                                    return <SwiperSlide key={index} className=" order-2 mt-[5rem] mb-10 md:mx-4" >

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
                                            key={curProduct._id} className="group overflow-hidden border border-zinc-200 w-fit h-fit bg-white hover:shadow-2xl  hover:scale-105 hover:transition hover:duration-1000 dark:bg-zinc-900 dark:border-zinc-700  ">
                                            <NavLink to={`/product/view/${curProduct._id}`}>
                                                <figure className="w-[10rem] h-[10rem] lg:w-[14rem] lg:h-[15rem] overflow-hidden  ">
                                                    <img src={`${BASEURL}/uploads/${curProduct.imageURL}`} alt={curProduct.pname} className="w-full h-full object-cover object-center hover:scale-105 hover:transition hover:duration-1000" />

                                                </figure>
                                            </NavLink>

                                            {/* Hover Text */}

                                            <div className="hidden group-hover:flex absolute right-2 top-2 text-sm bg-black/25 backdrop-blur-xl text-white rounded-full p-2 transition duration-500  ">
                                                <h1 className="">New</h1>
                                            </div>
                                            <div className="px-3 py-2 h-fit ">

                                                <h3 className="text-lg font-medium mt-2 max-w-[8rem] lg:max-w-[12rem] truncate block  ">{curProduct?.pname}</h3>
                                                <p className="text-gray-600"> Price : {curProduct?.price} <span className="text-gray-400 mx-3 line-through "> {curProduct.price + 100}  </span>  </p>

                                                <div className="w-full h-0 bottom-0 left-0 transition group-hover:h-[3px] group-hover:bg-violet-500 duration-500  absolute ">

                                                </div>

                                            </div>

                                        </motion.div>
                                    </SwiperSlide >
                                }
                                else return
                            })}

                        </Swiper >
                    </div>

                })}

            </div >
        </div >
    );

}