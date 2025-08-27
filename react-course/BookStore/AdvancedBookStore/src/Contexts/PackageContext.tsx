import { createContext, useContext, useEffect,useState, type ReactNode } from "react";
import type { BookCartType, OrderType } from "./UserContext";


interface PackageContextType{

    orderPackageTrack : OrderType | null;
    setOrderPackageTrack : (o : OrderType) => void;
}

const PackageContext = createContext<PackageContextType | null>(null);


export const PackageProvider = ({children} : {children : ReactNode}) => {



    const [orderPackageTrack, setOrderPackageTrack] = useState(()=>{
        const saved = localStorage.getItem('orderPackageTrack');

        return saved ? JSON.parse(saved) : null;
    });

    useEffect(()=>{
          if (orderPackageTrack !== null) {
    localStorage.setItem("orderPackageTrack", JSON.stringify(orderPackageTrack));
  } else {
    localStorage.removeItem("orderPackageTrack");
  }
    }, [orderPackageTrack]);


    return(
     <PackageContext.Provider value={{ orderPackageTrack, setOrderPackageTrack}}>
        {children}
    </PackageContext.Provider>
    )
}

export const usePackageContext = () => {

    const context = useContext(PackageContext);

    if(!context) throw new Error("Use the usePackageContext inside the PackageProvider");

    return context;
}

