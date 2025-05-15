import { NavLink, useNavigate, } from "react-router-dom"

export const Error = () => {


    const navigate = useNavigate();


    const handleGoBackBtn = () => {
        navigate(-1)
    }

        return (
            <section className="bg-white  w-full h-full flex flex-col items-center py-5 gap-5 text-2xl font-semibold">
                <div>
                    <figure>
                        <img src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
                            alt="4O4 Error"
                            className="w-[80%] h-[80%]"
                        />
                    </figure>
                </div>

                <div className="flex flex-col gap-3">
                    <p>
                        The page you are looking for is not found
                    </p>

                </div>

                <div className="flex flex-col gap-3" >
                    
                    <button className="btn-violet px-2 py-2 hover:text-black"
                        onClick={handleGoBackBtn}
                    >
                        Go Back
                    </button>
                    <NavLink  to="/" className="btn-blue px-2 py-2 hover:text-black"> Back To Home Page </NavLink>
                </div>

            </section>

        )
}