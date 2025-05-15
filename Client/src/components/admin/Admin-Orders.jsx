import { useState } from "react"
import { useAuth } from "../../store/Auth";


import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOrderById, fetchAllOrders } from "../../api/adminApi";
import { Loader } from "../UI/Loader";
import { Error } from "../UI/Error";


import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";


export const AdminOrders = () => {
    const { BASEURL, AuthorizationToken } = useAuth();
    const [order, setOrder] = useState(null);
    const [isModel, setIsModel] = useState(false);

    const queryClient = useQueryClient();

    const status = ["pending", "processing", "shipped", "delivered", "cancelled"];
    const daysLeft = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];




    //!=========================================================
    //? Fetch orders
    //!=========================================================
    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: () => fetchAllOrders(AuthorizationToken),
    });

    if (isLoading) return <Loader />;
    if (isError) return <Error />;

    //!=========================================================
    //? Delete order
    //!=========================================================

    const handleDeleteBtn = async (id) => {
        try {
            await DeleteOrderById(id, AuthorizationToken);
            queryClient.invalidateQueries(["orders"]);
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    //!=========================================================
    //? Open edit modal
    //!=========================================================

    const handleEditBtn = (id) => {
        const selectedOrder = data?.allOrders?.find((curOrder) => curOrder._id === id);
        if (selectedOrder) {
            setOrder({ ...selectedOrder });
            setIsModel(true);
        }
    };

    //!=========================================================
    //? Update order
    //!=========================================================

    const handleUpdateBtn = async () => {
        try {
            const response = await fetch(`${BASEURL}/api/admin/orders/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthorizationToken,
                },
                body: JSON.stringify(order),
            });

            if (response.ok) {
                setIsModel(false);
                queryClient.invalidateQueries(["orders"]);
            } else {
                console.error("Failed to update order");
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    //!=========================================================
    //? Handle form input changes
    //!=========================================================
    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };


    // console.log("Data from order tanstack : ", data)

    return (
        <div className="px-3 py-4">
            <h2 className="text-2xl font-bold mb-4">Orders Details</h2>
            <h1 className="px-4 py-2 border-b-2 border-violet-500">All Orders: {data?.countAllOrders}</h1>

            <div className="overflow-x-auto bg-white dark:bg-zinc-800 rounded-lg shadow mt-4">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-zinc-700">
                            <th className="text-left px-4 py-2">Image</th>
                            <th className="text-left px-4 py-2">PName</th>
                            <th className="text-left px-4 py-2">Quantity</th>
                            <th className="text-left px-4 py-2">UserName</th>
                            <th className="text-left px-4 py-2">User Phone</th>
                            <th className="text-left px-4 py-2">Payment</th>
                            <th className="text-left px-4 py-2">Time Remaining</th>
                            <th className="text-left px-4 py-2">Status</th>
                            <th className="text-left px-4 py-2">Total</th>
                            <th className="text-left px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.allOrders?.map((curElem) => (
                            <>
                                <tr key={curElem._id} className="border-b hover:bg-gray-50 dark:hover:bg-zinc-700 ">
                                    <td className="px-4 py-2"> <img src={`${BASEURL}/uploads/${curElem.items[0]?.productId.imageURL}`} alt="" className="w-12 h-12 rounded-md" />  </td>
                                    <td className="px-4 py-2">{curElem.items[0]?.productId.pname}</td>
                                    <td className="px-4 py-2">{curElem.items[0]?.quantity}</td>
                                    <td className="px-4 py-2">{curElem.userId?.username}</td>
                                    <td className="px-4 py-2">{curElem.userId?.phone}</td>
                                    <td className="px-4 py-2">{curElem.payment}</td>
                                    <td className="px-4 py-2">{curElem.daysLeft}</td>
                                    <td className="px-4 py-2">{curElem.status}</td>
                                    <td className="px-4 py-2">{curElem.totalAmount}</td>
                                    <td className="px-4 py-2 flex gap-3">
                                        <button onClick={() => handleEditBtn(curElem._id)} className="btn-blue btn-effect rounded-full ">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteBtn(curElem._id)} className="btn-red btn-effect">
                                            Delete
                                        </button>
                                    </td>

                                </tr>

                            </>

                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isModel && order && (
                <div className="bg-black/35 fixed inset-0 flex justify-center items-center backdrop-blur-sm p-6">
                    <div className="bg-white dark:bg-zinc-900  dark:border-zinc-600 p-4 rounded-md w-[400px]">
                        <h3 className="text-lg font-bold mb-4">Edit Order</h3>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            {/* Status Selection */}
                            <div className="flex flex-wrap gap-2 border border-zinc-300 p-3 rounded-md dark:bg-zinc-900  dark:border-zinc-600 ">
                                <label className="font-bold">Status:</label>
                                {status.map((curStatus) => (
                                    <label key={curStatus} className="flex gap-2 items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            value={curStatus}
                                            checked={order.status === curStatus}
                                            onChange={handleChange}
                                            className="scale-125"
                                        />
                                        {curStatus}
                                    </label>
                                ))}
                            </div>

                            {/* Days Left Selection */}
                            <div className="flex flex-wrap gap-2 border border-zinc-300 p-3 rounded-md dark:bg-zinc-900  dark:border-zinc-600 ">
                                <label className="font-bold">Days Left:</label>
                                {daysLeft.map((curDays) => (
                                    <label key={curDays} className="flex gap-2 items-center">
                                        <input
                                            type="radio"
                                            name="daysLeft"
                                            value={curDays}
                                            checked={order.daysLeft === curDays}
                                            onChange={handleChange}
                                            className="scale-125"
                                        />
                                        {curDays}
                                    </label>
                                ))}
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => setIsModel(false)} className="btn-black btn-effect  w-full">
                                    Cancel
                                </button>
                                <button onClick={handleUpdateBtn} className="btn-violet btn-effect w-full">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
