
import { useAuth } from "../../store/Auth"
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteUserById, fetchAllUsers } from "../../api/adminApi";
import { Loader } from "../UI/Loader";
import { Error } from "../UI/Error";

export const AdminUsers = () => {

    const { AuthorizationToken, } = useAuth()

    const queryClient = useQueryClient();

    //!=========================================================
    //? Handle  Delete User
    //!=========================================================

    const handleDeleteBtn = async (id) => {
        console.log(id)
        try {
            const res = await DeleteUserById(id, AuthorizationToken)
            if (res === undefined) {
                toast.error("Failed To Delete User")
            }
            queryClient.invalidateQueries(["products"]);
        } catch (error) {
            console.log("error from User Delete :", error)
        }

    }


    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: () => fetchAllUsers(AuthorizationToken)
    })

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <Error/>
    }

    // console.log("Data from UswQuery All Users ", data)

    return (
        <div className="px-2 py-3 ">

            <div className="flex  justify-between ">
                <h2 className="text-3xl font-bold">Users Details</h2>
            </div>

            <div className="flex justify-between items-center my-4">
                <h1 className="text- px-4 py-1 border-b-2 border-violet-500">All Users  <span> : {data?.countAllUser} </span></h1>
            </div>



            {/* //!==================================================
            //?  Product Details Table
            //!================================================== */}

            <div className="overflow-x-auto bg-white dark:bg-zinc-800 rounded-lg shadow">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-zinc-700">
                            <th className="text-left px-4 py-2">username</th>
                            <th className="text-left px-4 py-2">Email</th>
                            <th className="text-left px-4 py-2">isAdmin</th>
                            <th className="text-left px-4 py-2">phone</th>
                            <th className="text-left px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.allUsers?.map((curElem) => {
                                return (
                                    <tr className="border-b hover:bg-gray-50  dark:hover:bg-zinc-700  items-center">
                                        <td className="px-4 py-2"> {curElem.username} </td>
                                        <td className="px-4 py-2 flex flex-wrap "> {curElem.email} </td>
                                        <td className="px-4 py-2"> {String(curElem.isAdmin)} </td>
                                        <td className="px-4 py-2"> {curElem.phone} </td>
                                        <td className="px-4 pt-4 flex gap-3 items-center  ">
                                            <button onClick={() => handleDeleteBtn(curElem._id)} className="btn-red btn-effect mb-3">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>


            </div>
        </div >
    )

}