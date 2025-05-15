import axios from "axios"

const BASEURL = import.meta.env.VITE_APP_URI_API;

//!=========================================================
//? Base Url Setup For Axios
//!=========================================================
const API = axios.create({
    baseURL: BASEURL
})

//!=========================================================
//? Fetching All Product From Backend 
//!=========================================================
export const fetchAllProduct = async () => {
    try {
        const res = await API.get("/api/product/view")
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("Fetching All Product From Backend ", error)
    }
}


//!=========================================================
//? Fetching Single Product From Backend 
//!=========================================================
export const fetchSingleProduct = async (id) => {
    try {
        const res = await API.get(`/api/product/viewById/${id}`)
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("Fetching All Product From Backend ", error)
    }
}

//!==================================================
//?  Handle Delete Button
//!==================================================
export const DeleteProductById = async (id) => {
    console.log(id)

    try {
        const res = await API.delete(`/api/product/delete/${id}`)
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("Deleting Product By id From Backend ", error)
    }
}