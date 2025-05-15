import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth"
import { toast } from "react-toastify";
import { useEffect } from "react";

export const Logout = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    const handleCancelBtn = () => {
       navigate(-1)
    }

    return <div className="bg-black/30 inset-0 fixed backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white dark:bg-black dark:border-zinc-700 rounded-md border border-zinc-300 w-fit p-5 flex flex-col justify-center items-center  gap-3">
            <h1 className="text-2xl "> Are You Sure ? , Logout ? </h1>

            <button className="btn-black btn-effect w-full" onClick={handleCancelBtn}  >Cancel</button>
            <button onClick={() => logoutUser()} className="btn-red btn-effect w-full">Logout</button>
        </div>

    </div>

}