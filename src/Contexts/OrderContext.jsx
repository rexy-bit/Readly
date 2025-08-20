import React from "react";
import {v4 as uuid4} from 'uuid';

const OrderContext = React.createContext();
import { useCartContext } from "./CartContext";

export const useOrderContext = ()=> React.useContext(OrderContext);

export const OrderProvider = ({children})=>{

    const [orders, setOrders] = React.useState(()=>{
        const saved = localStorage.getItem('orders');

        return saved ? JSON.parse(saved) : 
           [];
    });

    React.useEffect(()=>{
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const {cart, setCart,calculateOrderTotal} = useCartContext();

    function removeOrder(orderId){
        setOrders(prev => prev.filter((order)=> order.id !== orderId));

    }


    function addOrder(order){
        setOrders(prev => [...prev, {
            books : order,
            id : uuid4(),
            orderDate: new Date().toISOString(),
            total : calculateOrderTotal()
        }]);

        setCart([]);
    }

    const value={
       orders,
       setOrders,
       addOrder,
       removeOrder
    }

    return(
    <OrderContext.Provider value={value}>
        {children}
    </OrderContext.Provider>
    );
}
