import {doc, updateDoc} from "firebase/firestore"
import { useUser, type BookCartType, type Order } from "./UserContext"
import { createContext, use, useContext, useState, type ReactNode } from "react";
import status from "../status"
import {db} from "../Config/fireBase"

interface OrderContextType{
   addOrder : (cart : BookCartType[]) => void;
   loadingOrder : boolean;

}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({children} : {children : ReactNode}) => {

    const {user, setUser} = useUser();
    const [loadingOrder, setLoadingOrder] = useState(false);

    const addOrder = async(cart : BookCartType[]) =>{

        if(!user) return;

        const newOrders = [...user.orders, cart];

        setLoadingOrder(true);

        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
            orders : newOrders
        });

        setLoadingOrder(false);
        
        setUser({
            ...user, 
            orders : newOrders
        })
        
    }
    
}

export const useOrderContext = () => {
    const context = useContext(OrderContext);

    if(!context){
        throw new Error("Use the useOrderContext inside an OrderProvider");
    }

    return context;
}

