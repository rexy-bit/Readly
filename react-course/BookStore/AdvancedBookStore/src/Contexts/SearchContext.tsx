import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
interface SearchContextType{
    search : string  | null;
    setSearch : (s : string | null) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({children} : {children : ReactNode}) => {

    const [search, setSearch] = useState<string | null>(()=>{
        const saved = localStorage.getItem('search');

        return saved ? JSON.parse(saved) : null;
    });

    useEffect(()=>{
        localStorage.setItem('search', JSON.stringify(search));
    }, [search]);

    const value : SearchContextType = {
        search,
        setSearch
    };


    return(
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );

}

export const useSearch = () =>{
     const context = useContext(SearchContext);

       if(!context){
        throw new Error("Use useSearch inside a SearchProvider");
       }

       return context;
}