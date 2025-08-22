import {doc, updateDoc} from "firebase/firestore"
import { useUser, type BookCartType, type Order, type OrderType } from "./UserContext"
import { createContext, use, useContext, useState, type ReactNode } from "react";
import {status} from "../status"
import {db} from "../Config/fireBase"
import { v4 as uuidv4 } from "uuid";
import { useCartContext } from "./CartContext";

interface OrderContextType{
   addOrder : (cart : BookCartType[]) => void;
   loadingOrder : boolean;

}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({children} : {children : ReactNode}) => {

    const {user, setUser} = useUser();
    const [loadingOrder, setLoadingOrder] = useState(false);
    const {calculateTotalPrice} = useCartContext();

    const addOrder = async(cart : BookCartType[]) =>{

        if(!user) return;

        const newOrders = [...user.orders, {
            order : [...cart],
            orderId : uuidv4(),
            price : calculateTotalPrice(),
            orderDate : new Date().toISOString()
            
        }];

        setLoadingOrder(true);

        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
            orders : newOrders,
            cart : []
        });



        setLoadingOrder(false);
        
        setUser({
            ...user, 
            orders : [...newOrders],
            cart : []
        });
        
    }


    const cancelOrder = async(order : OrderType) => {

        if(!user) return;
        
        const newOrders = user.orders.filter((o)=> o.orderId !== order.orderId);

        setLoadingOrder(true);
        const userRef = doc(db, "users", user.id);

        try{

        await updateDoc(userRef, {
            orders : [...newOrders]
        });

        setUser({
            ...user,
            orders: [...newOrders]
        });

         }catch(err){
            console.error("Error in canceling order : ", err);
         }finally{
            setLoadingOrder(false);
         }
        

        setLoadingOrder(false);
    }

    return(
        <OrderContext.Provider value={{addOrder, loadingOrder}}>
            {children}
        </OrderContext.Provider>
    )
    
}

export const useOrderContext = () => {
    const context = useContext(OrderContext);

    if(!context){
        throw new Error("Use the useOrderContext inside an OrderProvider");
    }

    return context;
}

