import axios from "axios"

const BASEURL = import.meta.env.VITE_APP_URI_API;

//!=========================================================
//? Base Url Setup For Axios
//!=========================================================
const API = axios.create({
    baseURL: BASEURL
})

//!=========================================================
//? Fetching User Profile Details From Backend 
//!=========================================================
export const fetchUserProfile = async (AuthorizationToken) => {
    try {
        const res = await API.get("/api/user/profile/read", {
            headers: {
                Authorization: AuthorizationToken
            }
        })
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("Fetching User Profile Details From Backend ", error)
    }
}




