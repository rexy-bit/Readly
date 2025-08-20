import React from "react";
import { useCartContext } from "../Contexts/CartContext";
import deliveryOptions from "../deliveryOptions";


export default function DeliveryOptions({book, index}){

    const {cart, setCart,getEstimatedDate} = useCartContext();

    function handleDeliveryChange(option){
        const newCart = [...cart];
        newCart[index].delivery = option;
        setCart(newCart);
 
    }
    
    return(

        <div className="flex flex-col justify-center ml-13 mb-5 pr-17  max-[1100px]:pr-0  max-[1100px]:ml-2">
            <h1 className="font-bold text-[17px] mb-2 mt-8">Delivery Options : </h1>

          <div className="flex flex-col gap-3">
            {deliveryOptions.map((opt)=>{
                return(
                <label key={opt.id} className="flex flex-row gap-3">

                    <input 
                    type="radio" 
                    checked={book.delivery.id === opt.id}
                    name={`delivery-${book.code}`}
                    onChange={()=> handleDeliveryChange(opt)}
                    className="w-5"
                    />

                    <div className="flex flex-col">
                        <p className="text-[15px] font-[600]">{getEstimatedDate(opt.delayDays)}</p>
                        <p className="text-gray-700 text-[15px]">{opt.name}</p>
                    </div>
                </label>
                );
            })}
            </div>
        </div>
    )

}