import { createContext, useContext, useEffect,useState, type ReactNode } from "react";
import type { BookCartType, OrderType } from "./UserContext";


interface PackageContextType{
    packageTrack : BookCartType | null;
    setPackageTrack : (b: BookCartType) => void;
    orderPackageTrack : OrderType | null;
    setOrderPackageTrack : (o : OrderType) => void;
}

const PackageContext = createContext<PackageContextType | null>(null);

export const PackageProvider = ({children} : {children : ReactNode}) => {

    const [packageTrack , setPackageTrack] = useState(()=>{

        const saved = localStorage.getItem('packageTrack');

        return saved ? JSON.parse(saved) : null;
    });

    useEffect(()=>{
        localStorage.setItem('packageTrack', JSON.stringify(packageTrack));
    }, [packageTrack]);

    const [orderPackageTrack, setOrderPackageTrack] = useState(()=>{
        const saved = localStorage.getItem('orderPackageTrack');

        return saved ? JSON.parse(saved) : null;
    });

    useEffect(()=>{
        localStorage.setItem('orderPackageTrack', JSON.stringify(orderPackageTrack));
    }, [orderPackageTrack]);


    return(
     <PackageContext.Provider value={{packageTrack, setPackageTrack, orderPackageTrack, setOrderPackageTrack}}>
        {children}
    </PackageContext.Provider>
    )
}

export const usePackageContext = () => {

    const context = useContext(PackageContext);

    if(!context) throw new Error("Use the usePackageContext inside the PackageProvider");

    return context;
}

