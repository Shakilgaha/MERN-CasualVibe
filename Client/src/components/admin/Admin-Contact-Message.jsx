import { useAuth } from "../../store/Auth"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteMessageById, fetchAllMessages } from "../../api/adminApi";
import { Loader } from "../UI/Loader";
import { Error } from "../UI/Error";


export const AdminContactMessage = () => {

    const { AuthorizationToken } = useAuth()

    const queryClient = useQueryClient();

    const handleDeleteBtn = async (id) => {

        try {
            DeleteMessageById(id, AuthorizationToken)
            queryClient.invalidateQueries(["messages"]);
        } catch (error) {
            console.log("error from contactDelete :", error)
        }
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ["messages"],
        queryFn: () => fetchAllMessages(AuthorizationToken)
    })

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <Error/>
    }


    return (
        <div className="px-2 py-3">

            <div className="flex  justify-between ">
                <h2 className="text-3xl font-bold">User Messages </h2>
            </div>

            <div className="flex  items-center my-4">
                <h1 className="text- px-4 py-1 border-b-2 border-violet-500">All Message   <span> : {data?.countAllMessage} </span></h1>
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
                            <th className="text-left px-4 py-2">Subject</th>
                            <th className="text-left px-4 py-2">Message</th>
                            <th className="text-left px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.allMessage?.map((curElem) => {
                                return (
                                    <tr key={curElem._id} className="border-b hover:bg-gray-50  dark:hover:bg-zinc-700  items-center">
                                        <td className="px-4 py-2"> {curElem.username} </td>
                                        <td className="px-4 py-2 flex flex-wrap "> {curElem.email} </td>
                                        <td className="px-4 py-2"> {curElem.subject} </td>
                                        <td className="px-4 py-2"> {String(curElem.message)} </td>
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

