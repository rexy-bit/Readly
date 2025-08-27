import  { memo } from "react"
import { useSearch } from "../../Contexts/SearchContext";
import { useUserSearchContext } from "../../Contexts/SearchUsersContext";



const SearchUsers = () => {

    
    const {search, setSearch} = useUserSearchContext();

    const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const searchInput = formData.get("search") as string;

        if(!searchInput || searchInput === ""){
            return null;
        }

        setSearch(searchInput);
    }

    return(
                <header className="flex justify-center items-center mt-7">
            <form onSubmit={handleFormSubmit}  className="relative">
                <input 
                type="search" 
                name="search"
                placeholder="userId, userName, userEmail"
                                   className="w-[400px] border border-gray-400 px-3 h-[40px] rounded-3xl p-3 pr-17 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 max-[850px]:w-[200px] "
                />

                   <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2  text-white cursor-pointer transiton-opacity duration-200 hover:opacity-70 active:opacity-50"><i className="fa-solid fa-magnifying-glass text-blue-500 text-[1.2em]"></i></button>
            </form>
        </header>
    )
}


export default memo(SearchUsers);