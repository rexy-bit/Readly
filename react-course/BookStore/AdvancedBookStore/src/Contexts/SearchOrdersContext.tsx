import { createContext, useContext, useState } from "react";


interface SearchOrdersContextType{
    search : string;
    setSearch : (s : string) => void;
}


const SearchOrdersContext = createContext<SearchOrdersContextType | null>(null);

export const SearchOrdersProvider = ({children} : {children : React.ReactNode}) => {

    const [search, setSearch] = useState("");

    return(
        <SearchOrdersContext.Provider value={{search, setSearch}}>
            {children}
        </SearchOrdersContext.Provider>
    )
}

export const useSearchOrders = () => {

    const context = useContext(SearchOrdersContext);

    if(!context) throw new Error("Use the useSearchOrders inside a SearchOrdersProvider");

    return context;
}