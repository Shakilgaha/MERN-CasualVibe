import axios from "axios";
import { toast } from "react-toastify";

const BASEURL = import.meta.env.VITE_APP_URI_API;

const API = axios.create({
    baseURL: BASEURL,
})



//!=================================================
//? Fetching All Orders For Admin 
//!=================================================
export const fetchAllOrders = async (AuthorizationToken) => {
    try {
        const res = await API.get("/api/admin/orders/read", {
            headers: {
                Authorization: AuthorizationToken,
            }
        })
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("Fetching All Orders For Admin ", error)

    }
}

//!==================================================
//?  Handle Delete Order
//!==================================================
export const DeleteOrderById = async (id, AuthorizationToken) => {
    console.log(id)

    try {
        const res = await API.delete(`/api/admin/orders/delete/${id}`, {
            headers: {
                Authorization: AuthorizationToken
            }
        })
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("Deleting Order By id From Backend ", error)
    }
}




//!=================================================
//? Fetching All Users For Admin 
//!=================================================
export const fetchAllUsers = async (AuthorizationToken) => {
    try {
        const res = await API.get("/api/admin/users/read", {
            headers: {
                Authorization: AuthorizationToken,
            }
        })
        return res.status === 200 ? res.data : []

    } catch (error) {
        console.log("Fetching All Users For Admin ", error)
    }
}


//!==================================================
//?  Handle Delete Users
//!==================================================
export const DeleteUserById = async (id, AuthorizationToken) => {
    console.log(id)

    try {
        const res = await API.delete(`/api/admin/users/delete/${id}`, {
            headers: {
                Authorization: AuthorizationToken
            }
        })
        toast.success("User Deleted Successfully")
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("Deleting User By id From Backend ", error)
    }
}


//!=================================================
//? Fetching All Messages For Admin 
//!=================================================
export const fetchAllMessages = async (AuthorizationToken) => {
    try {
        const res = await API.get("/api/admin/contacts/read", {
            headers: {
                Authorization: AuthorizationToken,
            }
        })
        return res.status === 200 ? res.data : []

    } catch (error) {
        console.log("Fetching All Messages For Admin ", error)
    }
}

//!==================================================
//?  Handle Delete Message
//!==================================================
export const DeleteMessageById = async (id, AuthorizationToken) => {
    console.log(id)

    try {
        const res = await API.delete(`/api/admin/contact/delete/${id}`, {
            headers: {
                Authorization: AuthorizationToken
            }
        })
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("Deleting Message By id From Backend ", error)
    }
}