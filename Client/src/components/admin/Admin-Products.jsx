import { useEffect, useState } from "react"
import { useAuth } from "../../store/Auth"
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteProductById, fetchAllProduct } from "../../api/productApi";
import { Loader } from "../UI/Loader";
import axios from "axios";
import { Error } from "../UI/Error";


export const AdminProducts = () => {

    const { BASEURL, AuthorizationToken, } = useAuth();

    const [isModelOpen, setIsModelOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const queryClient = useQueryClient();


    const [productDetails, setProductDetails] = useState({
        pid: "",
        pname: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        size: [],
        color: [],
        gender: "",

    });

    const [image, setImage] = useState("")

    const category = ["T-Shirt", "Pant", "Cap"]
    const size = ["L", "M", "XL", "XXL",];
    const gender = ["Men", "Women", "Unisex"];
    const colors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Orange", "Brown", "Maroon",]


    //!==================================================
    //?  Handle Input Change
    //!==================================================
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductDetails((prev) => {
            //!==================================================
            //? if The Type is CheckBox Than Store Array Value
            //!==================================================
            if (type === "checkbox") {
                return {
                    ...prev, [name]: checked ? [...prev[name], value] : prev[name].filter((item) => item !== value)
                }
            } else {
                return { ...prev, [name]: value }
            }
        });
    };

    //!==================================================
    //?  Handle Image Change
    //!==================================================
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    //!==================================================
    //? Handle Form Submit Button
    //!==================================================


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!isEditing) {
                //!==================================================
                //? Insert Product Details To Database
                //!==================================================
                const response = await axios.post(`${BASEURL}/api/product/create`,
                    {
                        ...productDetails,
                        size: productDetails.size || [],
                        color: productDetails.color || []
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: AuthorizationToken
                        }
                    }
                );

                if (response.status === 201) {
                    const product_id = response.data.productId;

                    //? Upload Image
                    const formData = new FormData();
                    formData.append("image", image);

                    const imageResponse = await axios.post(
                        `${BASEURL}/api/product/create/${product_id}/upload`,
                        formData,
                        {
                            headers: {
                                Authorization: AuthorizationToken
                            }
                        }
                    );

                    if (imageResponse.status === 200) {
                        toast.success(response.data.message);

                        //  Refresh Product List using TanStack Query
                        queryClient.invalidateQueries(["getAllProduct"]);

                        setIsModelOpen(false);  //  Close modal
                    } else {
                        toast.error(imageResponse.data.extraDetails || imageResponse.data.message);
                    }

                } else {
                    toast.error(response.data.extraDetails || response.data.message);
                }
            }

            if (isEditing) {
                // console.log("You are editing");

                const response = await axios.patch(`${BASEURL}/api/product/update`,
                    productDetails,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: AuthorizationToken
                        }
                    }
                );

                if (response.status === 200) {
                    toast.success(response.data.message);

                    //  Refresh Product List using TanStack Query
                    queryClient.invalidateQueries(["getAllProduct"]);

                    setIsModelOpen(false);  //  Close modal
                } else {
                    toast.error(response.data.extraDetails || response.data.message);
                }
            }

        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleAddProductBtn = () => {
        try {
            setProductDetails({
                pid: "",
                pname: "",
                description: "",
                price: "",
                category: "",
                stock: "",

                size: [],
                color: "",
                gender: "",
            })
            setIsModelOpen(true)
            setIsEditing(false)
        } catch (error) {
            console.log(error)
        }
    }

    //!==================================================
    //?  Handle Delete Button
    //!==================================================
    const handleDeleteBtn = async (id) => {
        console.log(id)

        try {
            DeleteProductById(id)
            queryClient.invalidateQueries(["products"])
            toast.success("Product Deleted Successfully")
        } catch (error) {
            console.log(error)
        }

    }

    //!==================================================
    //?  Handle Edit Button
    //!==================================================
    const handleEditBtn = async (id) => {
        try {
            setIsModelOpen(true)

            data?.getAllProduct?.map((curElem) => {
                if (curElem._id === id) {
                    // console.log("editElem", curElem)
                    return setProductDetails({
                        pid: curElem._id,
                        pname: curElem.pname,
                        description: curElem.description,
                        price: curElem.price,
                        category: curElem.category,
                        stock: curElem.stock,
                        size: curElem.size,
                        color: curElem.color,
                        gender: curElem.gender,
                    });
                } else {
                    return false
                }
            })
            setIsEditing(true)

            // console.log(id)
        } catch (error) {
            console.log(error)
        }
    }

    //!==================================================
    //?  Handle Tanstack Query Function
    //!==================================================
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: fetchAllProduct,
    })

    //!==================================================
    //?  If Product Not Fetched Than Show Loading Or Error
    //!==================================================
    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <Error/>
    }
    // console.log("Data Of UseQuery :", data)


    return (
        <div className="px-3 py-4 ">

            <div className="flex  justify-between">
                <h2 className="text-2xl font-bold">Product Details</h2>
                <button onClick={() => handleAddProductBtn()} className="btn-blue btn-effect w-fit h-fit">Add Product</button>
            </div>



            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="px-4 py-2 border-b-2 border-violet-500">All Products  <span> : {data?.countAllProduct} </span></h1>
                </div>
            </div>


            {/* //!==================================================
            //?  Product Details Table
            //!================================================== */}

            <div className="overflow-x-auto bg-white dark:bg-zinc-800 rounded-lg shadow">
                <table className="w-full ">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-zinc-700">
                            <th className="text-left px-4 py-2">Image</th>
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="text-left px-4 py-2">Category</th>
                            <th className="text-left px-4 py-2">Stock</th>
                            <th className="text-left px-4 py-2">Price</th>
                            <th className="text-left px-4 py-2">Size</th>
                            <th className="text-left px-4 py-2">Color</th>
                            <th className="text-left px-4 py-2">Gender</th>
                            <th className="text-left px-4 py-2">Description</th>
                            <th className="text-left px-4 py-2">Brand</th>
                            <th className="text-left px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.getAllProduct?.map((curElem) => {
                                return (
                                    <tr className="border-b hover:bg-gray-50 dark:hover:bg-zinc-700   items-center">
                                        <td className="px-4 py-2"> <img src={`${BASEURL}/uploads/${curElem.imageURL}`} alt="" className="w-12 h-12 rounded-lg" /> </td>
                                        <td className="px-4 py-2"> {curElem.pname} </td>
                                        <td className="px-4 py-2"> {curElem.category} </td>
                                        <td className="px-4 py-2"> {curElem.stock} </td>
                                        <td className="px-4 py-2"> {curElem.price} </td>

                                        <td className="px-4 py-2 ">
                                            {
                                                curElem.size.map((curSize) => {
                                                    return <span> {curSize} , </span>
                                                })
                                            }
                                        </td>
                                        <td className="px-4 py-2">
                                            {
                                                <span> {curElem.color} </span>
                                            }
                                        </td>
                                        <td className="px-4 py-2"> {curElem.gender} </td>
                                        <td className="px-4 py-2 flex flex-wrap "> {curElem.category} </td>
                                        <td className="px-4 py-2"> {curElem.brand} </td>
                                        <td className="px-4 pt-2 flex gap-3 items-center   ">
                                            <button onClick={() => handleEditBtn(curElem._id)} className="btn-blue btn-effect">Edit</button>
                                            <button onClick={() => handleDeleteBtn(curElem._id)} className="btn-red btn-effect">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>

                {/* //!==================================================
                //? Modal with Transparent Blur Background 
                //!================================================== */}
                {isModelOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-md">
                        <div className="bg-white dark:bg-black p-6 h-[40rem] overflow-scroll rounded-lg shadow-lg animate-fadeIn">
                            <h3 className="text-2xl font-bold mb-4 text-center ">
                                {isEditing ? "Edit Product" : "Add Product"}
                            </h3>
                            <form
                                onSubmit={handleFormSubmit}
                                enctype="multipart/form-data"
                                id="formProduct" className="mt-6 space-y-4 max-w-[33rem] ">
                                {
                                    !isEditing &&
                                    <input
                                        className="input"
                                        type="file"
                                        name="image"
                                        placeholder="image"
                                        autoComplete="off"
                                        required
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                }
                                <label htmlFor="pname"> Pname </label>
                                <input
                                    className="input"
                                    type="text"
                                    name="pname"
                                    placeholder="product Name "
                                    autoComplete="off"
                                    required
                                    value={productDetails.pname}
                                    onChange={handleChange}

                                />
                                <label htmlFor="description"> Description </label>
                                <input
                                    className="input"
                                    type="text"
                                    name="description"
                                    placeholder="description"
                                    autoComplete="off"
                                    required

                                    value={productDetails.description}
                                    onChange={handleChange}

                                />
                                <label htmlFor="stock"> Stock </label>
                                <input
                                    className="input"
                                    type="number"
                                    name="stock"
                                    placeholder="stock"
                                    autoComplete="off"
                                    required
                                    min="0"
                                    value={productDetails.stock}
                                    onChange={handleChange}
                                />
                                <label htmlFor="price"> Price </label>
                                <input
                                    className="input"
                                    type="number"
                                    name="price"
                                    placeholder="price"
                                    autoComplete="off"
                                    required
                                    min="0"
                                    value={productDetails.price}
                                    onChange={handleChange}

                                />

                                <select
                                    name="category"
                                    required
                                    value={productDetails.category}
                                    onChange={handleChange}
                                    className=""
                                >
                                    <option value="" className="">Select Category </option>

                                    {
                                        category.map((curCategory) => {
                                            return <option value={curCategory}> {curCategory} </option>
                                        })
                                    }

                                </select>
                                <div className=" flex items-center gap-6 bg-white dark:bg-zinc-900  dark:border-zinc-600 border rounded-md border-zinc-400 px-3 ">
                                    <label htmlFor="size" className="font-bold"> Gender :  </label>
                                    {
                                        gender.map((curGender) => {
                                            return <label key={curGender} htmlFor="size" className=" mx-2 my-2 flex gap-2 text-center items-center  ">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    required
                                                    value={curGender}
                                                    checked={productDetails.gender === curGender}
                                                    onChange={handleChange}
                                                    className=" scale-150"
                                                />
                                                {
                                                    curGender
                                                }
                                            </label>

                                        })
                                    }
                                </div>

                                <div className=" flex items-center gap-6 bg-white border rounded-md border-zinc-400 px-3 dark:bg-zinc-900  dark:border-zinc-600 ">
                                    <label htmlFor="size" className="font-bold"> Size :  </label>
                                    {
                                        size.map((curSize) => {
                                            return <label key={curSize} htmlFor="size" className=" mx-2 my-2 flex gap-2 text-center items-center  ">
                                                <input
                                                    type="checkbox"
                                                    name="size"
                                                    // required
                                                    value={curSize}
                                                    checked={productDetails.size.includes(curSize)}
                                                    onChange={handleChange}
                                                    className=" p-3 scale-150  border-gray-300  "
                                                />
                                                {
                                                    curSize
                                                }
                                            </label>

                                        })
                                    }
                                </div>
                                <div className=" flex flex-wrap items-center gap-2 w-fit max-w-[35rem]  bg-white border rounded-md border-zinc-400 px-3 py-2 dark:bg-zinc-900  dark:border-zinc-600 ">
                                    <label htmlFor="size" className="font-bold"> Colors :  </label>
                                    {
                                        colors.map((curColor) => {

                                            return <label key={curColor} htmlFor="size" className=" mx-2 my-1 flex gap-2 text-center items-center  ">
                                                <input
                                                    type="radio"
                                                    name="color"
                                                    autoComplete="off"
                                                    value={curColor}
                                                    checked={productDetails.color.includes(curColor)}
                                                    onChange={handleChange}
                                                    className=" p-3 scale-150  border-gray-300  "
                                                />
                                                {
                                                    curColor
                                                }
                                            </label>

                                        })
                                    }
                                </div>


                                <section className="flex gap-5">
                                    <button onClick={() => setIsModelOpen(false)} className="btn-black btn-effect w-full" >Cancel</button>
                                    <button type="submit" className="btn-violet btn-effect w-full ">
                                        Add
                                    </button>
                                </section>

                            </form >

                        </div>
                    </div>
                )}


            </div>
        </div >
    )

}


