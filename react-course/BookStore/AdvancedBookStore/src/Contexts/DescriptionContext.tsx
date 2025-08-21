
import { createContext, useContext, useEffect, useState } from "react";
import type { Book } from "./BooksContext";
import type { ReactNode } from "react";

interface DescriptionContextType{
    descriptionBook : Book | null;
    setDescriptionBook : (book : Book | null) => void; 
}

const DescriptionContext = createContext<DescriptionContextType | null>(null);

export const DescriptionProvider = ({children} : {children : ReactNode}) => {

    const [descriptionBook, setDescriptionBook] = useState<Book | null>(()=>{
       const saved = localStorage.getItem('descriptionBook');

       return saved ? JSON.parse(saved) : null;
    });

    useEffect(()=>{
        localStorage.setItem('descriptionBook', JSON.stringify(descriptionBook));
    }, [descriptionBook]);

    const value : DescriptionContextType = {
        descriptionBook,
        setDescriptionBook
    };

    return(
        <DescriptionContext.Provider value={value}>
            {children}
        </DescriptionContext.Provider>
    );
}


export const useDescription = () => {
    
    const context = useContext(DescriptionContext);

    if(!context){
        throw new Error('Error in DescriptionContext');
    }

    return context;
}