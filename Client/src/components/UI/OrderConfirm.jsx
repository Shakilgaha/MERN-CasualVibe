import { NavLink } from "react-router-dom"

export const OrderConfirmed = () => {

    return (
        <div className="container flex justify-center items-center py-9">
            <div className="w-[70%] h-full ">
                <img src="/OrderConfirmImg.webp" alt="Order Confirmed" />
                <section>
                   <NavLink to="/" >  <button className="btn-blue my-4" >Home Page</button> </NavLink>
                </section>
            </div>
        </div>
    )
}
