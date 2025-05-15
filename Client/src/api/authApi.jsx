import axios from "axios"

const BASEURL = import.meta.env.VITE_APP_URI_API;

//!=========================================================
//? Base Url Setup For Axios
//!=========================================================
const API = axios.create({
    baseURL: BASEURL
})

//!=========================================================
//? User Authentication
//!=========================================================

export const fetchUser = async () => {
    try {
        const token = localStorage.getItem("Token")
        const AuthorizationToken = `Bearer ${token}`
       
        const res = await API.get("/api/user/auth", {
            headers: {
                Authorization: AuthorizationToken
            },
        })

        return res.status === 200 ? res.data : []

    } catch (error) {
        console.log("User Authentication : ", error)
    }
}

