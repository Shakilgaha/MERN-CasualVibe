import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

export const authContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("Token"))
    const [user, setUser] = useState("");
    
    const AuthorizationToken = `Bearer ${token}`

    const BASEURL = import.meta.env.VITE_APP_URI_API;

    const API = axios.create({
        baseURL: BASEURL
    })

    //!=====================================================
    //? Set Token In Local Storage
    //!=====================================================
    const setTokenInLS = (userToken) => {
        setToken(userToken)
        return localStorage.setItem("Token", userToken)
    }

    //!=====================================================
    //? Logout User
    //!=====================================================
    const logoutUser = () => {
        setToken("");
        setUser("")
        localStorage.removeItem("Token")
        window.location.reload()
        return window.location.href = "/login"
    }

    let isLoggedIn = !!token;

    //!=====================================================
    //? User Authentication 
    //!=====================================================
    const fetchUser = async () => {
        if (!token) return;
        try {
            const res = await API.get("/api/user/auth", {
                headers: {
                    Authorization: AuthorizationToken
                },
            })
            res.status === 200 ? setUser(res.data) : setUser([])

        } catch (error) {
            setUser(null)
            console.log("User Authentication : ", error)
        }
    }




    useEffect(() => {
        fetchUser();
    }, [])


    return <authContext.Provider value={{

        fetchUser,

        BASEURL,
        AuthorizationToken,
        setTokenInLS,
        user,

        logoutUser,
        isLoggedIn,


    }} >

        {children}

    </authContext.Provider>
}


export const useAuth = () => {
    const authContextValue = useContext(authContext);

    if (!authContextValue) {
        throw new Error("useAuth User Outside The Provider");
    }

    return authContextValue;

}