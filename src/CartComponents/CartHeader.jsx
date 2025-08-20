import React from "react";
import { useCartContext } from "../Contexts/CartContext";
import { Link } from "react-router-dom";
import moneyIcon from '../assets/money.svg'

export default function CartHeader(){

    const {cart} = useCartContext();

    function calculateQuantity(){

        let quantity = 0;

        cart.forEach((item)=>{
            quantity += Number(item.quantite);
        });

        return quantity;
    }

    const quantity = calculateQuantity();
    return(

     
        <header className="top-0 fixed flex flex-row w-full items-center h-[60px] justify-center gap-60 bg-white shadow-xl max-[1025px]:justify-between max-[1025px]:px-2 max-[1025px]:gap-0">
            <Link to="/">
            <h1 className="border border-transparent flex flex-row items-center text-yellow-500 text-[1.7em] font-black gap-2 max-[800px]:text-[1.3em]  max-[800px]:gap-1 max-[600px]:text-[1.1em]">
            
             <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-11 h-11 text-yellow-500 hidden min-[600px]:block max-[800px]:w-8"
                >
                <path
                    fillRule="evenodd"
                    d="M6 4a2 2 0 00-2 2v12a2 2 0 002 2h13a1 1 0 100-2H6a1 1 0 010-2h13V6a2 2 0 00-2-2H6zm11 4H8V6h9v2z"
                    clipRule="evenodd"
                />
                </svg>
        Booky</h1></Link>

          <p className="text-[20px] max-[1025px]:text-[18px]"><span className="font-bold">Checkout</span> <span className="text-yellow-600">({quantity} items)</span></p>

          <img src={moneyIcon} alt="money-icon" width="40" className="max-[1025px]:w-9"/>
        </header>
      
    );
}