import React from "react";
import { Link } from "react-router-dom";
import { useDescriptionContext } from "../Contexts/DescriptionContext";
import { useCartContext } from "../Contexts/CartContext";
export default function BookCard({book}){

    const {setCurrentBook} = useDescriptionContext();
    const {addToCart} = useCartContext();

    const [msg, setMsg] = React.useState({
      color : "red",
      text:"",
      show : false
    });
   
    return(

          
              
              <div className="flex flex-col justify-center w-[250px] p-[20px] shadow-2xl rounded-2xl transition-transform duration-200 hover:scale-105">
                
                <div className="w-full">
                  <Link to="/description" onClick={()=>setCurrentBook(book)}>
                   <img src={book.image} alt={book.titre} className="w-[250px] h-[300px] object-contain"/>
                     </Link>
                </div>
                  

                <div className="flex flex-col justify-center gap-1 mt-4">
                    <Link to="/description" onClick={()=>setCurrentBook(book)}>
                    <div className="text-[1.1em] font-bold hover:text-gray-800">{book.titre}</div>
                    </Link>
                    <div className="font-[550]">Author : {book.auteur}</div>
                    <div className="font-[500]">{book.prix} Dzd</div>
                    <div className="h-7">
                        {msg.show && <p className="font-[550]" style={{color:msg.color}}>{msg.text}</p>}
                    </div>

                    <button className="bg-yellow-500 text-white font-bold h-[40px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-500" onClick={()=>addToCart(book, setMsg)}>Add to Cart</button>
                </div>
              </div>
        
    )
}