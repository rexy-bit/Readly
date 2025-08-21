import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface PopUpType{
    showPopUp : boolean;
    setShowPopUp : (s : boolean) => void;
}

const PopUpContext = createContext<PopUpType | null>(null);

export const PopUpProvider = ({children} : {children : ReactNode}) => {

    const [showPopUp, setShowPopUp] = useState(()=>{
        const saved = localStorage.getItem('showPopUp');

        return saved ? JSON.parse(saved)  : false;
    });

    useEffect(()=>{
        localStorage.setItem('showPopUp', JSON.stringify(showPopUp));
    },[showPopUp]);


    return(
        <PopUpContext.Provider value={{showPopUp,setShowPopUp}}>
            {children}
        </PopUpContext.Provider>
    );
}

export const usePopUp = () => {
    const context = useContext(PopUpContext);

    if(!context){
        throw new Error('Use the usePopUp inside the PopUpProvider');
    }

    return context;
}

