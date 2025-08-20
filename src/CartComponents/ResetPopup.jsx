import React from "react";
import { useCartContext } from "../Contexts/CartContext";
export default function ResetPopup({setShowReset}){

    const {setCart} = useCartContext();
    
    function resetCart(){

        setCart(prev=> []);
        setShowReset(false);
    }
    return(

        <div onClick={()=>setShowReset(false)} className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
         <div className="fixed top-40 bg-white w-[700px] flex flex-col items-center justify-center rounded-2xl max-[800px]:w-[300px]">
             <h1 className="text-[1.5em] font-bold mt-15 text-yellow-600 max-[800px]:text-[1.1em] text-center">Are you sure you want to reset your cart?</h1>

             <div className="flex flex-row justify-center items-center gap-3 mt-10 mb-20">
                <button onClick={resetCart} className="h-[35px] rounded-lg px-3 bg-yellow-500 text-white text-[14px] font-[600] cursor-pointer transition-opacity hover:opacity-70 active:opacity-50">Yes, Reset</button>

                <button onClick={()=>setShowReset(false)} className="h-[35px] rounded-lg px-3 bg-white border-2 border-yellow-500 text-yellow-600 font-bold cursor-pointer transition-opacity hover:opacity-70 active:opacity-50">Cancel</button>
             </div>
            
            <p onClick={()=>setShowReset(false)} className="absolute top-1 right-4 text-[1.6em] cursor-pointer transition-opacity hover:opacity-70 active:opacity-50">&times;</p>

            
         </div>
         </div>
    )
    
}