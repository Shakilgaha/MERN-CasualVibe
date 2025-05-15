

import axios from "axios"

const BASEURL = import.meta.env.VITE_APP_URI_API;

//!=========================================================
//? Base Url Setup For Axios
//!=========================================================
const API = axios.create({
    baseURL: BASEURL
})

//!=========================================================
//? Fetching Cart Details From Backend 
//!=========================================================
export const fetchCartItems = async (AuthorizationToken) => {
    try {
        const res = await API.get("/api/cart/read", {
            headers: {
                Authorization: AuthorizationToken
            }
        })
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("Fetching All Product From Backend ", error)
    }
}














