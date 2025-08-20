import React from "react";
import OrderBookCard from "./OrderBookCard";
import { useCartContext } from "../Contexts/CartContext";
import { useOrderContext } from "../Contexts/OrderContext";
import CancelOrder from "./CancelOrder";
export default function Orders({order}){

    
    const [showCancel, setShowCancel] = React.useState(false);
    
    return(
        
        <div className="flex flex-col w-[800px] border border-gray-300 p-3 px-5 rounded-lg max-[855px]:w-[350px] max-[855px]:p-2">
            <div className="w-full flex flex-row justify-between border-b-1 border-b-gray-300 pb-3 max-[855px]:flex-col">
                <div className="max-[855px]:flex max-[855px]:flex-row max-[855px]:gap-2">
                    <h2 className="font-bold">Order Placed:</h2>
                     <p>{new Date(order.orderDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric'
                        })}</p>
                </div>

                <div className="max-[855px]:flex max-[855px]:flex-row max-[855px]:gap-2">
                    <p className="font-bold">Total:</p>
                    <p>{order.total}Dzd</p>
                </div>

                <div className="max-[855px]:flex max-[855px]:flex-row max-[855px]:gap-2">
                    <p className="font-bold">Order ID:</p>
                    <p className="max-[855px]:w-50">{order.id}</p>
                </div>
            </div>

            <div className="flex flex-row pt-3 gap-30 justify-between max-[855px]:flex-col max-[855px]:justify-center max-[855px]:items-center max-[855px]:gap-10">
                <div className="flex flex-col gap-5 max-[855px]:mt-4">
                {order.books.map((book,i)=>{
                    return(
                        <OrderBookCard
                        book={book}
                        key={i}
                      />
                    )
                })}
                </div>

                <button className="flex justify-center w-[110px] h-[40px] bg-red-600 items-center text-white font-bold rounded-3xl text-[14px] cursor-pointer transition=>-transform duration-200 hover:scale-110 active:transform-105" onClick={()=>setShowCancel(true)}>Cancel Order</button>
            </div>

            {showCancel && 
            <CancelOrder
               setShowCancel={setShowCancel} 
               orderId = {order.id}
            />
            }
        </div>
          
       
        
    )

}