import React from "react";


const DescriptionContext = React.createContext();

export const useDescriptionContext = ()=> React.useContext(DescriptionContext);

export const DescriptionProvider = ({children})=>{

    const [currentBook, setCurrentBook] = React.useState(()=>{
        const saved = localStorage.getItem('currentBook');

        return saved ? JSON.parse(saved) : 
           null
    });


    React.useEffect(()=>{
        localStorage.setItem('currentBook', JSON.stringify(currentBook));
    }, [currentBook]);

    const value = {
        currentBook,
        setCurrentBook
    };


    return(
        
        <DescriptionContext.Provider value={value}>
            {children}

        </DescriptionContext.Provider>
    );
}