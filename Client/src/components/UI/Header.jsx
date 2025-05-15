import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../store/Auth";
import { IoCartOutline } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";

export const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));

    const setTheme = () => {

        setDarkMode(!darkMode)
        if (darkMode) {
            localStorage.setItem("darkMode", true)
            document.documentElement.classList.add('dark');
        } else {
            localStorage.removeItem("darkMode")
            document.documentElement.classList.remove('dark')
        }

    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const { user, isLoggedIn } = useAuth()


    return (
        <header className="">
            <div id="Info-Header" className=" bg-violet-500 text-white w-full flex justify-between ">
                <div className="container flex justify-between py-2 ">
                    <section className="flex gap-5 justify-between w-full md:w-fit">
                        <h1>
                            casualvibe@gmail.com
                        </h1>
                        <h1 className="hidden md:flex">
                            1234567890
                        </h1>
                    </section>
                    <section id="Cart" className="flex gap-12 justify-between">
                        <h1 > <NavLink to="/cart" className="flex gap-1 items-center justify-center text-center "> <span className="text-2xl">   <IoCartOutline />  </span>   </NavLink> </h1>
                        <button onClick={() => setTheme()} > <MdLightMode /> </button>
                        
                    </section>
                </div>
            </div>

            <div id="Nav-Header" className="  container flex justify-between  py-3 items-center">
                <section className="text-3xl font-bold">
                    CasualVibe
                </section>

                <ul id="header" className="hidden  lg:flex gap-8 ">
                    <li> <NavLink to="/"> Home </NavLink> </li>
                    <li> <NavLink to="/about"> About </NavLink> </li>
                    <li> <NavLink to="/product"> Products </NavLink> </li>
                    <li> <NavLink to="/contact"> Contact </NavLink> </li>

                    {
                        isLoggedIn ? <>
                            <li> <NavLink to="/profile"> Profile </NavLink> </li>
                            {user?.isAdmin ? <li> <NavLink to="/admin"> Admin </NavLink> </li> : ""}
                            <li> <NavLink to="/logout"> Logout </NavLink> </li>
                        </> : <>

                            <li> <NavLink to="/register"> Register </NavLink> </li>
                            <li> <NavLink to="/login"> Login </NavLink> </li>

                        </>
                    }

                   


                </ul>
                {/* Menu Button  */}
                <section id="mobile-menu-btn" className="lg:hidden text-2xl ">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {
                            isMenuOpen ? <IoClose /> : <TiThMenu />
                        }

                    </button>
                </section>
            </div>

            <div id="mobile-menu" className={`${isMenuOpen ? "flex translate-y-0" : "hidden -translate-y-full"} bg-white dark:bg-black w-full absolute h-fit overflow-hidden  lg:hidden`}>
                <ul id="header-mobile" className=" container flex flex-col py-5">
                    <NavLink to="/" ><li>  Home  </li></NavLink>
                    <NavLink to="/about"><li>  About  </li></NavLink>
                    <NavLink to="/product"> <li>  Products  </li></NavLink>
                    
                    <NavLink to="/contact"><li>  Contact  </li></NavLink>

                    {
                        isLoggedIn ? <>
                            <NavLink to="/profile"><li> Profile  </li></NavLink>
                            {user?.isAdmin ? <NavLink to="/admin"><li> Admin  </li></NavLink> : ""}
                            <NavLink to="/logout"><li> Logout  </li></NavLink>
                        </> : <>
                            <NavLink to="/register"><li>  Register  </li></NavLink>
                            <NavLink to="/login"><li> Login  </li></NavLink>

                        </>
                    }



                    

                </ul>
            </div>

           
        </header>
    )
}