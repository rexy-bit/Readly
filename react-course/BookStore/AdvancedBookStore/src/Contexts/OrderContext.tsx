import {doc, increment, updateDoc} from "firebase/firestore"
import { useUser, type BookCartType, type OrderType } from "./UserContext"
import { createContext, use, useContext, useState, type ReactNode } from "react";
import {status} from "../status"
import {db} from "../Config/fireBase"
import { v4 as uuidv4 } from "uuid";
import { useCartContext } from "./CartContext";
import { useBooks } from "./BooksContext";

interface OrderContextType{
   addOrder : (cart : BookCartType[]) => void;
   loadingOrder : boolean;
   cancelOrder : (order : OrderType) => void
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({children} : {children : ReactNode}) => {

    const {user, setUser} = useUser();
    const [loadingOrder, setLoadingOrder] = useState(false);
    const {calculateTotalPrice} = useCartContext();
    const {books, setBooks} = useBooks();

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

        await Promise.all(
  order.order.map((b) => {
    const bookRef = doc(db, "books", b.id);
    return updateDoc(bookRef, {
      stock: increment(b.quantity),
    });
  })
);


        setUser({
            ...user,
            orders: [...newOrders]
        });

        const newBooks = books.map((b)=>{
            const findBook = order.order.find((book)=>book.id === b.id);

            if(!findBook){
                return  b;
            }else{
          
                return{
                    ...b,
                    stock : b.stock + findBook.quantity
                }
            
            }

           
        });

        setBooks(newBooks);

         }catch(err){
            console.error("Error in canceling order : ", err);
         }finally{
            setLoadingOrder(false);
         }
        

        
    }

    return(
        <OrderContext.Provider value={{addOrder, loadingOrder, cancelOrder}}>
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

