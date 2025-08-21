import { createContext, use, useContext } from "react";
import type { ReactNode } from "react";
import {  useUser, type BookCartType } from "./UserContext";
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../Config/fireBase"
import type { deliveryOption } from "../Pages/Cart";
import User from "../Pages/User";

interface CartContextType{
    getEstimatedDate : (d : number) => string;
    calculateTotalCartItems : (cart : BookCartType[])=> number;
    handleDeliveryChange : (book : BookCartType, option : deliveryOption) => void;
}
const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({children} : {children : ReactNode}) => {

      const {user,setUser} = useUser();

          function getEstimatedDate(days : number){

        const date = new Date();
        date.setDate(date.getDate() + days);

        return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    }).format(date);
    }

    const calculateTotalCartItems = (cart : BookCartType[]) => {
          let cpt = 0;

          cart.forEach((b)=>{
            cpt += b.quantity;
          });

          return cpt;
    }

    const handleDeliveryChange = (book : BookCartType, option : deliveryOption) => {

        if(user === null){
            return;
        }
            const updatedCart = user.cart.map((b) => {
        if (b.id === book.id) {
            return { ...b, deliveryOption: option };
        }
        return b;
    });
           const newUser = {
            ...user,
             cart : updatedCart
           }

           setUser(newUser);

           const userRef = doc(db, "users", user.id);
           updateDoc(userRef, {cart : updatedCart});
        
    }

    return(
        <CartContext.Provider value={{getEstimatedDate, calculateTotalCartItems, handleDeliveryChange}}>
            {children}
        </CartContext.Provider>
    );
}


export const useCartContext = () => {
    const context = useContext(CartContext);

    if(!context){
        throw new Error("Use useCartContext inside a CartProvider check that in App.tsx");
    }

    return context;
}