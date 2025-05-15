import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api/userApi";
import { Loader } from "../components/UI/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export const Profile = () => {
    const { user, BASEURL, AuthorizationToken } = useAuth();

    const [userProfile, setUserProfile] = useState(null);
    const [userAddress, setUserAddress] = useState({
        address: "",
        city: "",
        pinCode: "",
        subDistrict: "",
        district: "",
        state: ""
    });

    const [isModel, setIsModel] = useState(false);

    const navigate = useNavigate();


    //!==================================================
    //?  Handle Add / Edit Address
    //!==================================================
    const handleAddAddressBtn = async () => {
        try {
            if (!userProfile?._id) {
                toast.error("User ID is missing!");
                return;
            }

            const id = userProfile._id;

            const response = await axios.post(
                `${BASEURL}/api/user/address/create/${id}`,
                userAddress,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: AuthorizationToken
                    }
                }
            );

            // console.log("Address Added Successfully:", response.data);
            toast.success(response.data.message || "Address added successfully!");

        } catch (error) {
            console.error("Error from handleAddAddressBtn:", error.response?.data || error.message);

            if (error.response?.status === 400 || error.response?.status === 404) {
                toast.error("Address could not be added. Please try again.");
            } else {
                toast.error(error.response?.data?.message || "Something went wrong.");
            }
        } finally {
            setIsModel(false);
        }
    };

    //!==================================================
    //? Handle Input Change for Address Form
    //!==================================================
    const handleInput = (e) => {
        try {
            const { name, value } = e.target;
            setUserAddress({
                ...userAddress,
                [name]: value
            });
        } catch (error) {
            console.error("Error from handleInput:", error);
        }
    };

    //!==================================================
    //? Handle Form Submit (Currently Unused)
    //!==================================================
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    };

    //!==================================================
    //? Fetch User Profile Using React Query
    //!==================================================
    const { data, isLoading, isError } = useQuery({
        queryKey: ["userProfiles"],
        queryFn: () => fetchUserProfile(AuthorizationToken),
    });

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }

        if (data && data.findUser) {
            setUserProfile(data.findUser);
            setUserAddress(data.findUser.address || {}); // Set empty object if no address exists
        }
    }, [data]);

    //!==================================================
    //?  Show Loading or Error Message
    //!==================================================
    if (isLoading) return <Loader />;
    if (isError) return <h1 className="text-center text-red-500"> Error loading profile... </h1>;


    //!==================================================
    //?  Return JSX
    //!==================================================
    return (
        <div id="profile">
            <div className="container">
                <section className="p-3 flex flex-col gap-3">
                    <h1 className="text-3xl">Profile</h1>

                    <div className=" rounded-2xl p-5 flex flex-col lg:flex-row justify-between border border-zinc-300 dark:border-zinc-700 gap-12">
                        <section className="flex gap-12 items-center flex-col lg:flex-row">
                            <figure className="w-[7rem] rounded-full overflow-hidden ">
                                <img src="./UserProfileImage.jpeg" alt="User Profile" className="object-cover scale-150" />
                            </figure>
                            <section className="space-y-2">
                                <h1> <span className="font-bold">User Name:</span> {userProfile?.username} </h1>
                                <p> <span className="font-bold">Email:</span> {userProfile?.email} </p>
                                <p> <span className="font-bold">Phone:</span> {userProfile?.phone} </p>
                                <p> <span className="font-bold">Joined At:</span> {userProfile?.createdAt?.split("T")[0]} </p>
                            </section>
                        </section>

                        <section className=" h-full flex justify-end ">
                            <button onClick={() => setIsModel(true)} className="btn-blue btn-effect">
                                {userAddress?.address ? "View" : "Add"} Address
                            </button>
                        </section>
                    </div>

                    {/* Order History */}
                    <div

                        className=" rounded-2xl border border-zinc-300 dark:border-zinc-700 p-3 flex flex-col gap-1">
                        <h1 className="text-3xl ps-3 ">Order History</h1>
                        <section className="max-h-[40rem] overflow-y-scroll">
                            <ul className="flex flex-col gap-3 p-2">
                                {
                                    // console.log("Shakil Gaha", data.findOrder)
                                }
                                {!data?.findOrder ? <h1>You Have Not Ordered Anything</h1> : ""}

                                {data?.findOrder?.map((curOrder, index) => {

                                    return <li key={index} className="flex flex-col gap-2  p-4 border border-zinc-300 dark:border-zinc-700 rounded-sm  ">
                                        {curOrder?.items?.map((curItem, index) => (
                                            <div key={index} className="flex gap-5 border-b pb-2   min-w-[23rem]">
                                                <figure className="w-[4rem] h-fit rounded-md overflow-hidden ">
                                                    <img src={`${BASEURL}/uploads/${curItem.productId.imageURL}`} alt="" className="object-cover" />
                                                </figure>
                                                <div className="flex gap-12 w-full text-start items-start">
                                                    <div>
                                                        <h1 className="text-2xl">{curItem?.productId.pname}</h1>
                                                        <p> Price :  {curItem?.productId.price}</p>
                                                        <p> Color : {curItem?.productId.color}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex gap-5">
                                            <h1 className=""> <span className="md:text-xl font-bold"> Status :  </span>{curOrder?.status}</h1>
                                            <h1 className=""> <span className="md:text-xl font-bold"> DaysLeft :  </span>{curOrder?.daysLeft}</h1>
                                        </div>
                                    </li>
                                })}




                            </ul>
                        </section>
                    </div>
                </section>

                {/* Address Modal */}
                {isModel && (
                    <div id="Model" className="fixed inset-0 flex items-center justify-center bg-black/35 backdrop-blur-2xl p-12">
                        <div className="bg-white dark:bg-zinc-800 rounded-md border border-zinc-300 dark:border-zinc-700 p-5">
                            <h1 className="text-2xl text-center font-bold">Add Address</h1>
                            <form id="form" onSubmit={handleFormSubmit} className="mt-6 space-y-4 max-w-[33rem]">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    autoComplete="off"
                                    required
                                    value={userAddress.address || ""}
                                    onChange={handleInput}
                                    className="border p-2 rounded-md w-full"
                                />

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    autoComplete="off"
                                    required
                                    value={userAddress.city || ""}
                                    onChange={handleInput}
                                    className="border p-2 rounded-md w-full"
                                />

                                <input
                                    type="number"
                                    name="pinCode"
                                    placeholder="Pin Code"
                                    autoComplete="off"
                                    required
                                    value={userAddress.pinCode || ""}
                                    onChange={handleInput}
                                    className="border p-2 rounded-md w-full"
                                />

                                <input
                                    type="text"
                                    name="subDistrict"
                                    placeholder="Sub-District "
                                    autoComplete="off"
                                    required
                                    value={userAddress.subDistrict || ""}
                                    onChange={handleInput}
                                    className="border p-2 rounded-md w-full"
                                />

                                <input
                                    type="text"
                                    name="district"
                                    placeholder="District"
                                    autoComplete="off"
                                    required
                                    value={userAddress.district || ""}
                                    onChange={handleInput}
                                    className="border p-2 rounded-md w-full"
                                />

                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    autoComplete="off"
                                    required
                                    value={userAddress.state || ""}
                                    onChange={handleInput}
                                    className="border p-2 rounded-md w-full"
                                />

                                <section className="flex gap-5">
                                    <button type="button" onClick={() => setIsModel(false)} className="btn-black btn-effect w-full">Cancel</button>
                                    <button type="button" onClick={handleAddAddressBtn} className="btn-violet btn-effect w-full"> Add
                                    </button>



                                </section>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
