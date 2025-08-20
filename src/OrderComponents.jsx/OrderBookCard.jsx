import React from "react";

import {useOrderContext} from '../Contexts/OrderContext'
import { useCartContext } from "../Contexts/CartContext";
export default function OrderBookCard({book}){

    const {getEstimatedDate} = useCartContext();

    return(

        
        <div className="flex flex-row gap-3 items-center max-[855px]:flex-col">
            <div>
            <img src={book.image} alt={book.auteur} className="w-[90px] h-[140px] object-contain"/>
            </div>

            <div>
                <p><strong>{book.titre}</strong> by <strong>{book.auteur}</strong></p>
                <p>Arriving on : {getEstimatedDate(book.delivery.delayDays)}</p>
                <p>Quantity : {book.quantite}</p>
            </div>
        </div>
    );
}