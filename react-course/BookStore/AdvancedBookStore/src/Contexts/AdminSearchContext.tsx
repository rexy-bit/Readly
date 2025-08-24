import { createContext, useContext, useState } from "react";


interface AdminSearchContextType{

    search : string | null;
    setSearch : (s : string | null)=> void;
}

const AdminSearchContext = createContext<AdminSearchContextType | null>(null);

export const AdminSearchProvider = ({children} : {children : React.ReactNode}) => {

    const [search, setSearch] = useState<string | null>(null);

    
    return(
        <AdminSearchContext.Provider value={{search, setSearch}}>
           {children}
        </AdminSearchContext.Provider>
    )
}

export const useAdminSearch = () => {

    const context = useContext(AdminSearchContext);

    if(!context) throw new Error("Use the useAdminSearch inside AdminSearchProvider");

    return context;
}