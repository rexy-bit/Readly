import { memo } from "react"
import { useAdminSearch } from "../../Contexts/AdminSearchContext";
import { useNavigate } from "react-router-dom";


const SecondHeader = () => {

    const {setSearch} = useAdminSearch();
    const navigate = useNavigate();

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const inputSearch = formData.get("searchAdmin") as string;

        if(!inputSearch|| inputSearch=== ""){
            return;

        }

        setSearch(inputSearch);


    }
    return(
        <div className="flex w-[800px] justify-between items-center p-3 border border-gray-300 rounded-lg gap-5 mt-10 max-[850px]:w-[320px] max-[850px]:gap-1 max-[850px]:p-1 max-[850px]:py-2">
            <button className="bg-blue-400 text-white px-4 h-[35px] rounded-3xl font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50 max-[850px]:text-[0.8em] max-[850px]:px-2" onClick={()=> navigate("/admin/add")}>+ Add a Book</button>

            <form onSubmit={handleSubmit} className="relative">
                <input 
                type="search"
                name="searchAdmin"
                placeholder="Search..."
                  className="w-[400px] border border-gray-400 px-3 h-[40px] rounded-3xl p-3 pr-17 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 max-[850px]:w-[200px] "
                  
                 />

                 <button className="absolute right-3 top-1/2 transform -translate-y-1/2  text-white cursor-pointer transiton-opacity duration-200 hover:opacity-70 active:opacity-50"><i className="fa-solid fa-magnifying-glass text-blue-500 text-[1.2em]"></i></button>
            </form>

        </div>
    )
}

export default memo(SecondHeader);