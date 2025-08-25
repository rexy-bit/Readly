import {addDoc, collection, deleteDoc, doc, increment, updateDoc, getDocs} from "firebase/firestore"
import { useUser, type BookCartType, type OrderType } from "./UserContext"
import { createContext,  useContext, useState, type ReactNode } from "react";
import {db} from "../Config/fireBase"
import { v4 as uuidv4 } from "uuid";
import { useCartContext } from "./CartContext";
import { useBooks } from "./BooksContext";
import { useNavigate } from "react-router-dom";
import { useAdminOrders } from "./AdminOrdersContext";

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
    const {adminOrders, setAdminOrders} = useAdminOrders();

    const navigate = useNavigate();
    const addOrder = async(cart : BookCartType[]) =>{

        if(!user) return;

        const orderId = uuidv4();

        navigate('/orders');
        const newOrders = [...user.orders, {
            order : [...cart],
            orderId : orderId,
            price : calculateTotalPrice(),
            orderDate : new Date().toISOString()
            
        }];

        setLoadingOrder(true);

        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
            orders : newOrders,
            cart : []
        });

        const orderDocRef = await addDoc(collection(db, "orders"), {
            userName : user.name,
            userId : user.id,
            order : {
            order : [...cart],
            orderId : orderId,
            price : calculateTotalPrice(),
            orderDate : new Date().toISOString()
            }
        });

        await updateDoc(orderDocRef, {
            id : orderDocRef.id
        });

       const ordersNew = [...adminOrders,  {
            userName : user.name,
            userId : user.id,
            order : {
            order : [...cart],
            orderId : orderId,
            price : calculateTotalPrice(),
            orderDate : new Date().toISOString()
            }
        }];

        if(!ordersNew){
        setAdminOrders(ordersNew);
        }


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

     

           const orderDocQuery = collection(db, "orders");
        const orderDocs = await getDocs(orderDocQuery);
        const targetDoc = orderDocs.docs.find(d => d.data().order.orderId === order.orderId && d.data().userId === user.id);

        if (targetDoc) {
            await deleteDoc(doc(db, "orders", targetDoc.id));
            setAdminOrders(adminOrders.filter(o => o.order.orderId !== order.orderId));
        }
           

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

