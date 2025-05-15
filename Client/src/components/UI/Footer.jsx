import { motion } from "framer-motion"


export const Footer = () => {
    const categories = [
        "T-Shirts",
        "Pants",
        "Night Wears",
        "Caps",
        "Fashion",
    ];

    const customerCare = ["My Account", "Discount", "Returns", "Orders History", "Order Tracking"];

    const pages = ["Home", "About", "Product &Cart", "Profile", "Register & Login"];

    return (
        <footer className="bg-violet-100 mt-9 dark:bg-zinc-800  ">

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
                }} className="container pt-20  pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-0 ">

                {/* Categories */}
                <div className="">
                    <h3 className="text-lg font-semibold">Categories</h3>
                    <ul className="mt-4 space-y-2 text-gray-600 dark:text-zinc-300 ">
                        {categories.map((item, index) => (
                            <li key={index} className="hover:text-black dark:hover:text-white cursor-pointer">{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Customer Care */}
                <div>
                    <h3 className="text-lg font-semibold">Customer Care</h3>
                    <ul className="mt-4 space-y-2 text-gray-600 dark:text-zinc-300">
                        {customerCare.map((item, index) => (
                            <li key={index} className="hover:text-black dark:hover:text-white cursor-pointer">{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Pages */}
                <div>
                    <h3 className="text-lg font-semibold">Pages</h3>
                    <ul className="mt-4 space-y-2 text-gray-600 dark:text-zinc-300">
                        {pages.map((item, index) => (
                            <li key={index} className="hover:text-black dark:hover:text-white cursor-pointer">{item}</li>
                        ))}
                    </ul>
                </div>


                {/* Brand & Contact */}
                <div>
                    <h2 className="text-xl font-bold"> CasualVibe </h2>
                    <div className="mt-4 flex  rounded-md  border border-zinc-300 dark:border-zinc-500 w-fit    ">
                        <input
                            type="text"
                            placeholder=""
                            className="px-3 py-4 outline-none h-full  w-full  "
                        />
                        <button className="btn-violet btn-effect w-[5rem]  ">Send</button>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-zinc-300 text-sm">
                        17 Princess Road, London, Greater London NW1 8JR, UK
                    </p>
                </div>
            </motion.div>

            {/* Copyright */}
            <div className="text-center bg-violet-500 text-white mt-12 py-6">
                © 2025 CasualVibe – All Rights Reserved
            </div>
        </footer>
    );
};

