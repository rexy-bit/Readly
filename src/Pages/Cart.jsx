import React from "react";
import CartHeader from "../CartComponents/CartHeader";
import TotalCart from "../CartComponents/TotalCart";
export default function Cart(){
    
    return(
        <>
        <main className="w-full flex flex-col items-center content-center">
          <CartHeader/>

          <TotalCart/>
          </main>
        </>
    )
}