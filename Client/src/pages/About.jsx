import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react";


export const About = () => {

    const features = [
        {
            id: 1,
            icon: "🚚",
            title: "Fast & Free Shipping",
            description: "Get your orders delivered swiftly with no extra cost.",
        },
        {
            id: 2,
            icon: "💰",
            title: "Affordable Prices",
            description: "Trendy fashion at pocket-friendly prices for everyone.",
        },
        {
            id: 3,
            icon: "🏆",
            title: "High Quality",
            description: "Our products are made from premium materials with care.",
        },
        {
            id: 4,
            icon: "📞",
            title: "24/7 Support",
            description: "Our customer support is available round the clock.",
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
        <div className="bg-white dark:bg-zinc-950 dark:text-white ">
            {/* Header Section */}
            <div className=" py-12">
                <div className="container px-6 lg:px-8 text-center">
                    <h2 className="text-indigo-600 font-semibold text-lg">
                        Get to Know Us
                    </h2>
                    <h1 className="text-4xl font-bold  mt-2">
                        About CasualVibe
                    </h1>
                    <p className=" mt-4 max-w-2xl mx-auto">
                        CasualVibe is all about effortless fashion and comfortable styling.
                        We create trendy outfits that reflect confidence, quality, and
                        affordability.
                    </p>
                </div>
            </div>

            {/* About Content Section */}
            <div
                className="bg-violet-50 dark:bg-zinc-800 dark:text-white ">
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
                    }} className="max-w-6xl mx-auto px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="w-fit h-fit overflow-hidden  rounded-lg  ">
                        <img
                            src="./AboutImg/img1.jpg"
                            alt="Fashion Style"
                            className="w-full object-cover shadow-lg hover:scale-105 transition-all duration-1000"
                        />
                    </div>

                    {/* Text Content */}
                    <div>
                        <h2 className="text-3xl font-bold ">
                            Who We Are
                        </h2>
                        <p className="text-gray-600 dark:text-zinc-400 mt-4">
                            At CasualVibe, we are passionate about bringing you stylish and
                            comfortable clothing. Our collections are curated to fit your
                            everyday fashion needs while ensuring top-notch quality.
                        </p>

                        <h3 className="text-2xl font-semibold  mt-6">
                            Our Mission
                        </h3>
                        <p className="text-gray-600 dark:text-zinc-400 mt-2">
                            We strive to create a brand that speaks to individuals who value
                            both comfort and trend. Our mission is to provide high-quality,
                            trendy outfits at an affordable price.
                        </p>

                        <h3 className="text-2xl font-semibold  mt-6">
                            Why Choose Us?
                        </h3>
                        <ul className="text-gray-600 dark:text-zinc-400 mt-2 list-disc list-inside">
                            <li>Premium quality materials</li>
                            <li>Trendy and comfortable designs</li>
                            <li>Affordable fashion for everyone</li>
                            <li>Customer-focused shopping experience</li>
                        </ul>
                    </div>
                </motion.div>

                {/* Our Features */}
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
                        delay: 0.4
                    }}
                    viewport={{
                        once: true
                    }}
                    className=" max-w-6xl mx-auto px-6 pb-12 lg:px-8 text-center ">
                    <h2 className="text-3xl font-bold text-violet-600">Our Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition duration-500  dark:border dark:border-zinc-700 "
                            >
                                <div className="text-5xl">{feature.icon}</div>
                                <h3 className="text-lg font-bold mt-4">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-zinc-400 mt-2">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>


            </div>




            {/* Call to Action */}
            <div className="text-center py-10 px-4 my-5">
                <h2 className="text-2xl font-semibold ">
                    Join the CasualVibe Community
                </h2>
                <p className="text-gray-600 dark:text-zinc-400 mt-2">
                    Stay updated with the latest trends and exclusive offers.
                </p>
                <a
                    href="/product"
                    className="mt-4 btn-violet btn-effect"
                >
                    Shop Now
                </a>
            </div>
        </div >
    );
};

