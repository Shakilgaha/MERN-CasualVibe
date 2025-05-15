import axios from "axios"
import { useState } from "react"
import { useAuth } from "../../store/Auth"
import { toast } from "react-toastify"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Error } from "./Error"
import { Loader } from "./Loader"
import { fetchAllReview } from "../../api/reviewApi"

import { RiDoubleQuotesL } from "react-icons/ri";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export const Review = () => {

    const [review, setReview] = useState("")

    const { BASEURL, AuthorizationToken, user } = useAuth()

    const queryClient = useQueryClient();


    const handleChange = (e) => {

        setReview(e.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${BASEURL}/api/user/review/create`, { review }, {
                headers: {
                    Authorization: AuthorizationToken
                }
            })
            res.status === 201 ? toast.success("Review Added Successfully") : toast.error(res.data.message || "Failed To Add Review")
            queryClient.invalidateQueries(["getAllProduct"]);
            setReview("")
        } catch (error) {
            toast.error(error.response.data.extraDetails || "Failed To Add Review")
            console.log("error from review ", error)
        }
    }


    const { data, isLoading, isError } = useQuery({
        queryKey: ["Reviews"],
        queryFn: fetchAllReview,
    })

    if (isLoading) return <Loader />
    if (isError) return <Error />


    return (
        <div className="">
            <div className="container">
                <section className="grid grid-cols-1 md:grid-cols-2 justify-between items-center">
                    <h1 className="text-4xl font-bold my-5" >
                        What Our Happy Customers Say
                    </h1>

                    {
                        !user ? "" : <form
                            onSubmit={handleFormSubmit}
                            className="  flex gap-3 w-full  lg:w-[30rem] items-center  justify-self-end ">
                            <input type="text"
                                name="review"
                                placeholder="Share Your Feedback"
                                value={review}
                                autoComplete="off"
                                onChange={handleChange}
                                className="input h-fit  " />
                            <button className="btn-violet btn-effect h-fit px-6 w-[10rem]">Submit</button>
                        </form>
                    }

                </section>

                <div>
                    <Swiper

                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={10}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            430: { slidesPerView: 2 },
                            750: { slidesPerView: 3 },
                            1200: { slidesPerView: 4 },
                            1536: { slidesPerView: 5 }
                        }}
                        className=' my-12 bg-transparent  '

                    >
                        <ul className=" gap-5 my-3 ">
                            {
                                data?.getAllReviews?.map((curElem, index) => {
                                    return (
                                        <SwiperSlide key={index} className="mt-[5rem] mb-10 md:mx-4 h-full   " >
                                            <li className="group  flex flex-col gap-5  w-[14rem] h-[14rem] bg-white hover:bg-violet-600 hover:text-white transition-all duration-700 shadow-lg hover:shadow-xl  p-4 py-5 justify-center items-center rounded-md hover:rounded-lg border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 ">
                                                <h1 className="flex flex-col text-center"> <span className="font-bold text-xl">  Name :</span>   {curElem?.userId?.username}  </h1>

                                                <span className="text-violet-600 text-3xl group-hover:text-white  transition-all duration-700 "> <RiDoubleQuotesL /></span>
                                                <p className="text-center flex"> {curElem?.review}  </p>
                                            </li>

                                        </SwiperSlide>
                                    )

                                })
                            }
                        </ul>
                    </Swiper>
                </div>
            </div>

        </div >
    )
}