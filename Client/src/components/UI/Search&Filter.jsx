export const SearchFilter = ({ filter, setFilter, search, setSearch }) => {


    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }


    return (
        <div className="w-full mb-12 px-7 flex justify-center ">
            <div className="  md:w-full min-w-[20rem] flex flex-col gap-5 md:flex-row  md:justify-between">

                <input type="text"
                    name="search"
                    placeholder="Search Products"
                    value={search}
                    onChange={handleSearchChange}
                    className="input max-w-[20rem]"
                />

                <select name="" id=""
                    className="max-w-[20rem] "
                    value={filter}
                    onChange={handleFilterChange}
                >
                    <option value="all">All</option>
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Pant">Pants</option>
                    <option value="Cap">Caps</option>
                </select>

            </div>

        </div>
    )

}