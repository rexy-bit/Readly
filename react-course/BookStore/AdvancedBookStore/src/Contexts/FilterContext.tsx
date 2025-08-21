import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";


interface FilterContextType{
    categorie : string;
    setCategorie : (cat : string) => void;
}

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({children} : {children : ReactNode}) => {

    const [categorie, setCategorie] = useState<string>(()=>{
        const saved = localStorage.getItem('categorie');

        return saved ? JSON.parse(saved) : "";
    });

    useEffect(()=>{
        localStorage.setItem('categorie', JSON.stringify(categorie));
    }, [categorie]);

    const value = {
        categorie,
        setCategorie
    }

    return(
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilter = () => {

    const context = useContext(FilterContext);

     if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
     }

  return context;
}