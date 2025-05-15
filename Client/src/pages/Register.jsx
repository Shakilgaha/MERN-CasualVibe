import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";


import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";


import { motion, useAnimation } from "framer-motion"

export const Register = () => {

    const [isPasswordView, setIsPasswordView] = useState(false)

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })



    const { setTokenInLS } = useAuth()

    const navigate = useNavigate();

    //!--------------------------------
    //* Handle input Change
    //!--------------------------------

    const handleInput = (e) => {
        try {
            let name = e.target.name;
            let value = e.target.value;

            setUserData({
                ...userData,
                [name]: value
            })

        } catch (error) {
            console.log(error)
        }
    }
    //!--------------------------------
    //* Handle Form Submit
    //!--------------------------------

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            // console.log("User DAta : ", userData, userData.confirmPassword, userData.password)


            //!============================================
            //? Confirm Password
            //!============================================
            if (userData.confirmPassword !== userData.password) {
                return toast.error("Confirm Password Not Matched")
            }


            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })

            // console.log(response)
            const res_Data = await response.json();
            if (response.status === 201) {
                setTokenInLS(res_Data.token)
                setUserData({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: ""
                })
                toast.success("User Register Success")
                navigate("/")

                // console.log("user Registered Success", res_Data)
            } else {
                toast.error(res_Data.extraDetails || res_Data.message)

                // console.log("user Register Failed", res_Data)

            }

        } catch (error) {
            console.log(error)
        }
    }

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
        <div className="bg-violet-50 dark:bg-zinc-800 lg:px-4 py-12 lg:py-9 ">
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
                }}
                className="w-full container  bgamber-50 rounded-lg flex flex-col justify-center items-center lg:grid lg:grid-cols-2 gap-10 ">
                {/* Left Section (Form) */}
                <div className="w-full flex flex-col justify-center bg-aber-400 items-center">
                    <h2 className="text-2xl font-bold text-indigo-600">Create an Account</h2>
                    <p className="text-gray-600 dark:text-zinc-300 mt-2">
                        Sign up to start shopping and exploring amazing fashion trends.
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={handleFormSubmit}
                        id="" className="mt-6 space-y-4 max-w-[33rem] ">
                        <input
                            type="text"
                            name="username"
                            placeholder="Full Name"
                            autoComplete="off"
                            required
                            value={userData.username}
                            onChange={handleInput}
                            className="input"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            autoComplete="off"
                            required

                            value={userData.email}
                            onChange={handleInput}
                            className="input"
                        />
                        <input
                            type="number"
                            name="phone"
                            placeholder="phone"
                            autoComplete="off"
                            required

                            value={userData.phone}
                            onChange={handleInput}
                            className="input"
                        />

                        <div className="input flex w-full justify-between">
                            <input
                                type={isPasswordView ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                autoComplete="off"
                                required

                                value={userData.password}
                                onChange={handleInput}
                                className="w-full px-2  rounded-md focus:outline-none "
                            />
                            <button type="button" onClick={() => setIsPasswordView(!isPasswordView)} >
                                {
                                    isPasswordView ? <IoEyeOff /> : <IoEye />
                                }
                            </button>

                        </div>
                        <div className="input flex w-full justify-between">
                            <input
                                type={isPasswordView ? "text" : "password"}
                                
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                autoComplete="off"
                                required

                                value={userData.confirmPassword}
                                onChange={handleInput}
                            
                                className="w-full px-2  rounded-md focus:outline-none "
                            />
                            <button type="button" onClick={() => setIsPasswordView(!isPasswordView)} >
                                {
                                    isPasswordView ? <IoEyeOff /> : <IoEye />
                                }
                            </button>

                        </div>


                        <button type="submit" className="btn-violet btn-effect w-full">
                            Register
                        </button>
                        <span>  Already Have An Account ?<NavLink to="/login">  Login  </NavLink></span>
                    </form>
                </div>

                {/* Right Section (Additional Info) */}
                <div className="w-full p-0 bg-amber-00 flex justify-center items-center">
                    <div className=" w-[35rem] h-fit ">
                        <img
                            src="./SignUpImg.svg"
                            alt="Register Illustration"
                            className="w-full h-fit rounded-lg"
                        />
                    </div>
                </div>
            </motion.div>
        </div >
    );

}