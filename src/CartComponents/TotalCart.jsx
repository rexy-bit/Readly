import React from "react";
import { useCartContext } from "../Contexts/CartContext";
import BookCartComponent from "./BookCartComponent";
import PayementSummary from "./PayementSummary";
import trashIcon from '../assets/trash.svg'
import ResetPopup from "./ResetPopup";
export default function TotalCart(){

    const {cart} = useCartContext();

    const [showReset, setShowReset] = React.useState(false);
    const [msg, setMsg] = React.useState(false);

    if(cart.length === 0)  return (
      <>
    <h1 className="text-[1.2em] mt-10 font-bold">Your cart is empty</h1>
    {msg && 
     <p className="mt-10 text-[1.3em] text-yellow-600 font-bold">Order Added succesfuly</p>
    }
    </>
  )

    return(

        cart.length !== 0 && 
          <div className="flex flex-col justify-center mt-20 mb-20">
            <h1 className="text-[1.3em] font-bold mb-3">Review your order</h1>
            <div className="flex flex-row gap-11 max-[765px]:flex-col">
           <div className="flex flex-col justify-center items-center gap-5 ">
              {cart.map((book, i)=>{
                return(
                  
                    <BookCartComponent
                     book={book}
                     key={book.code}
                     index={i}
                    />

                    
                    
                )
              })}
           </div>

             <PayementSummary
             setMsg={setMsg}
             />

           </div>

           <button className="h-[40px] w-[110px] fixed right-[15px] bottom-[15px] bg-yellow-600 text-white rounded-3xl cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>setShowReset(true)}>
            <div className="flex flex-row justify-center items-center gap-1">
            <img src={trashIcon} alt="trash-icon" width="30"/> <p className="font-[600]">Reset</p>
            </div>
           </button>

             {showReset && 
             <ResetPopup
                 setShowReset={setShowReset}
             />}
           </div>
    )
}