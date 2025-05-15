import { useEffect, useRef, useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

import axios from "axios";
import { motion, useAnimation } from "framer-motion"
import emailjs from '@emailjs/browser';
import { Loader } from "../components/UI/Loader";


export const Contact = () => {

    const { AuthorizationToken, user, isLoggedIn } = useAuth();

    const [contactData, setContactData] = useState({
        username: "",
        email: "",
        subject: "",
        message: "",
    })
    const [userData, setUserData] = useState(true);


    const form = useRef();

    useEffect(() => {
        if (isLoggedIn && user) {
            setContactData({
                username: user.username,
                email: user.email,
                subject: "",
                message: "",
            })
            setUserData(false)
        }
        else {
            setContactData({
                username: "",
                email: "",
                subject: "",
                message: "",
            })
        }
    }, [user, isLoggedIn])



    // console.log(token)

    //!--------------------------------
    //* Handle input Change
    //!--------------------------------

    const handleInput = (e) => {
        try {
            let name = e.target.name;
            let value = e.target.value;



            setContactData({
                ...contactData,
                [name]: value
            })

        } catch (error) {
            console.log(error)
        }
    }





    //! ==================================================
    //* Handle Send Email to Gmail
    //! ==================================================

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    const sendEmail = () => {
        // e.preventDefault();

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
            publicKey: PUBLIC_KEY,
        })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error);
                },
            );
    };


    //!=================================
    //* Handle Form Submit
    //!=================================
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!isLoggedIn) {
                return toast.error("You Need To Login First");
            }
            sendEmail();
            const response = await axios.post(
                "http://localhost:5000/api/user/contact/send",
                contactData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: AuthorizationToken,
                    }
                }
            );

            toast.success("Message Send Success");

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.extraDetails || error.response.data.message);
            } else if (error.request) {
                toast.error("No response from server. Please try again.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    //!--------------------------------
    //* Contact Info Object
    //!--------------------------------
    const contactInfo = [
        {
            id: 1,
            icon: "📧",
            title: "E-Mail",
            details: "casualvibe@store.com",
        },
        {
            id: 2,
            icon: "📍",
            title: "Address",
            details: "20 Margaret St, London, Great Britain, 3NM98-LK",
        },
        {
            id: 3,
            icon: "🛠",
            title: "Support Forum",
            details: "For over 24hr",
        },
        {
            id: 4,
            icon: "🚚",
            title: "Free Shipping",
            details: "Free standard shipping on all orders",
        },
    ];


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


    return (
        <div className="  py-16  flex flex-col gap-[5rem]">
            {/* Header */}
            <div className="container text-center mb-12">
                <h2 className="text-3xl font-bold text-violet-600">Information About Us </h2>
                <p className=" mt-3 max-w-2xl mx-auto">
                    At CasualVibe, we are committed to providing top-notch fashion and excellent customer service. Whether you have inquiries about our products, need assistance with an order, or simply want to connect, we are here to help.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="bg-violet-50 dark:bg-zinc-800 px-6 lg:px-16  py-12">
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
                        delay: 0.4
                    }}
                    viewport={{
                        once: true
                    }} className="container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-12">
                    {/* Left Section - Form */}
                    <div>
                        <h3 className="text-2xl font-semibold text-violet-700 mb-4 ">Get in Touch</h3>
                        <p className="text-gray-600 dark:text-zinc-400 mb-6">
                            Have a question, suggestion, or need support? Fill out the form below, and we’ll get back to you as soon as possible.
                        </p>
                        <form ref={form} id="form" onSubmit={handleFormSubmit} className="space-y-4 py-6 px-1 rounded-lg">
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="username"
                                value={contactData.username}
                                onChange={handleInput}
                                autoComplete="off"
                                required
                                className=""
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your E-mail"
                                value={contactData.email}
                                onChange={handleInput}
                                autoComplete="off"
                                required

                                className=""
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={contactData.subject}
                                onChange={handleInput}
                                autoComplete="off"
                                required

                                className=""
                            />
                            <textarea
                                placeholder="Type your message"
                                name="message"
                                rows="4"
                                value={contactData.message}
                                onChange={handleInput}
                                autoComplete="off"
                                required

                                className=""
                            />
                            <button type="submit" className="btn-violet btn-effect w-full rounded-full">
                                Send Mail
                            </button>
                        </form>
                    </div>

                    {/* Right Section - Contact Info */}
                    <div>
                        <h3 className="text-2xl font-semibold text-violet-700  mb-4">Contact Way</h3>
                        <div className="space-y-6 grid grid-cols-2 gap-5">
                            {contactInfo.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <span className={`text-2xl ${item.color}`}>{item.icon}</span>
                                    <div>
                                        <p className="font-bold">{item.title}</p>
                                        <p className="text-gray-600 dark:text-zinc-400 ">{item.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Side Image */}
                        <div className="mt-8">
                            <img
                                src="./contactUsImg.webp"
                                alt="Support Team"
                                className="w-full max-w-sm mx-auto"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );

}