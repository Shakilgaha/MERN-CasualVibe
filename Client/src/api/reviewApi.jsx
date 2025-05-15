
import axios from "axios"

const BASEURL = import.meta.env.VITE_APP_URI_API;

//!=========================================================
//? Base Url Setup For Axios
//!=========================================================
const API = axios.create({
    baseURL: BASEURL
})

export const fetchAllReview = async () => {

    try {
        const res = await API.get("/api/user/review/view");
        return res.status === 200 ? res.data : []

    } catch (error) {
        console.log("error from Fetch Review ")
    }

}