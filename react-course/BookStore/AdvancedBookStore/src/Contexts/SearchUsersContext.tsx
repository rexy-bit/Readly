import { Children, createContext, useContext, useState } from "react";


interface UserSearchContextType{
    search : string;
    setSearch : (s : string) => void;
}


const UserSearchContext = createContext<UserSearchContextType | null>(null);

export const UserSearchProvider = ({children} : {children : React.ReactNode}) => {

    const [search, setSearch] = useState("");


    return(
        <UserSearchContext.Provider value={{search, setSearch}}>
            {children}
        </UserSearchContext.Provider>
    )
}


export const useUserSearchContext = () => {

    const context = useContext(UserSearchContext);

    if(!context){
        throw new Error("Use the useUserSearchContext inside the UserSearchProvider");
        
    }

    return context;
}