import React from "react";
import Orders from "./Orders";
import { useOrderContext } from "../Contexts/OrderContext";
export default function OrderMain(){

    const {orders, setOrders} = useOrderContext();

    if(orders.length === 0) return <h1 className="text-[1.5em] text-center mt-10 font-bold">No Orders</h1>

    
    return(

        <div className="flex flex-col mt-15 w-full items-center mb-20">
            <title>Orders</title>
            <h1 className="text-[1.5em] font-bold mb-4">Your Orders</h1>

            <div className="flex flex-col gap-10">
                {orders.map((order)=>{
                    return(
                        <Orders 
                        order={order}
                        key={order.id}
                        />
                    );
                })}
            </div>
        </div>
    )

}