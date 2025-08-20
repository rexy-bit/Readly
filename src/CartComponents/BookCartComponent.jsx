import React from "react";
import { useCartContext } from "../Contexts/CartContext";
import DeliveryOptions from "./DeliveryOptions";
export default function BookCartComponent({book, index}){


    const { removeFromCart, increaseQuantity, decreaseQuantity, getEstimatedDate} = useCartContext();

    return(

        <div className="p-5 border border-gray-300 rounded-s  max-[1100px]:p-3  max-[1100px]:w-[300px]">
            <h1 className="text-yellow-600 font-[800] text-[1.3em]  max-[1100px]:text-[1.1em]  max-[1100px]:w-50">Delivery Date : {getEstimatedDate(book.delivery.delayDays)}</h1>
            <div className="flex flex-row justify-center items-center  gap-3 max-[1100px]:flex-col max-[1100px]:items-start">
               
               <div className="flex flex-row gap-2  max-[1100px]:mt-[30px]">
                <div>
                    <img src={book.image} alt={book.author} className="w-[120px] h-[170px] object-contain"/>
                    
                </div>

                <div className="flex flex-col justify-center gap-3  ">
                    <p className="text-[1.1em] w-[150px] leading-4 font-bold text-yellow-600  max-[1100px]:w-[120px]">{book.titre}</p>
                    <p className="text-[1em] font-bold">{book.prix} Dzd</p>
                    <div className="flex flex-row gap-2  max-[1100px]:gap-1">
                        Quantity: {book.quantite}
                    <button onClick={()=> increaseQuantity(book)}
                        className="h-6 w-6 rounded-[5px] bg-yellow-500 text-white cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                        >+</button> 
                    <button onClick={()=> decreaseQuantity(book)} className="h-6 w-6 rounded-[5px] bg-yellow-500 text-white cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">-</button> 
                    </div>

                    <div>

                        <button onClick={()=> removeFromCart(book.code)}
                        className="h-8 w-19 bg-red-600 rounded-3xl text-white text-[13px] font-bold cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-105"
                            >Delete</button>
                    </div>

                </div>
                </div>

                <DeliveryOptions
                 book={book}
                 index={index}
                />
            </div>
            </div>
        
    );

}