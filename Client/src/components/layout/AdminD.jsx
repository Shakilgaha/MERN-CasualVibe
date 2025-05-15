import { Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../../store/Auth"

export const AdminD = () => {

    const { user } = useAuth();

    if (!user.isAdmin) {
        return <Navigate to="/" />
    }

    return (
        <div className="max-w-[110rem] m-auto min-h-screen flex flex-col lg:flex-row   bg-gray-100 border-t  border-gray-300 dark:bg-zinc-800 dark:border-zinc-700">
            {/*//? Sidebar */}
            <div className="hidden lg:flex  flex-col w-64  shadow-md p-4">
                <h1 className="text-xl font-bold ">CasualVibe</h1>
                <ul id="adminPanel" className=" mt-6 space-y-2 gap-5 flex flex-col">
                    <NavLink to="" ><li className="">Products </li> </NavLink>
                    <NavLink to="orders" > <li className=""> Orders</li> </NavLink>
                    <NavLink to="users" >    <li className="">Users</li> </NavLink>
                    <NavLink to="message" >  <li className="">Message</li> </NavLink>
                </ul>

            </div>
            <ul id="adminPanel" className="  lg:hidden mx-auto justify-center mt-6 space-y-2 gap-3 flex mb-12">
                <NavLink to="" ><li className="">Products </li> </NavLink>
                <NavLink to="orders" > <li className=""> Orders</li> </NavLink>
                <NavLink to="users" >    <li className="">Users</li> </NavLink>
                <NavLink to="message" >  <li className="">Message</li> </NavLink>
            </ul>
            <main className="flex-1 px-2 bg-white dark:bg-zinc-900 shadow">

                {/* //? Table */}
                <div className="min-w-[25rem] dark:bg-zinc-900  rounded-lg shadow overflow-scroll">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}