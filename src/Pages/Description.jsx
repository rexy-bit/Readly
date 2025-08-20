import React from "react";
import { useDescriptionContext } from "../Contexts/DescriptionContext";
import { useCartContext } from "../Contexts/CartContext";
export default function Description(){


       const {currentBook} = useDescriptionContext();
       const [msg, setMsg] = React.useState({
        color : "red",
        text:'',
        show : false
       });

       const {addToCart} = useCartContext();

    if(currentBook === null){
        return(
            <h2>Error no currentBook found</h2>
        );
    }
    return(

      <section className="flex flex-col content-center items-center gap-20">
        <h1 className="mt-15 text-yellow-500 text-3xl font-black underline">{currentBook.titre}</h1>

         {msg.show && 
             <p style={{color : msg.color}} className="fixed p-5 bg-gray-200 shadow-xl text-[20px] top-50 rounded-lg font-bold">{msg.text}</p>
           }
        <div className="flex flex-row content-center w-[80%] items-center gap-10 p-5 border-2 border-amber-500 rounded-[5px] mb-20 max-[1050px]:flex-col max-[1050px]:p-4">

       
            <div className="flex flex-col items-center content-center gap-10 w-[250px]">
                
                   <img src={currentBook.image} alt={currentBook.titre} className="w-[250px] h-[300px] object-contain"/>
               
      

                <button className="w-[110px] text-white bg-yellow-500 h-[35px] rounded-2xl text-[14px] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>addToCart(currentBook, setMsg)}>Add to Cart</button>
            </div>

               

            <div className="w-[70%] max-[1050px]:w-full max-[1050px]:p-3 max-[1050px]:flex max-[1050px]:flex-col max-[1050px]:content-center max-[1050px]:items-center">
                 <h2 className="mb-3 text-[2em] text-amber-500 font-bold">{currentBook.titre}</h2>
                 <h3 className="text-[1.2em]">by <span className="ml-1 text-yellow-500 text-[1.3em] font-bold">{currentBook.auteur}</span></h3>
                 <p className="text-lg mt-2 ">- Categorie : {currentBook.categorie}</p>
                 <p className="text-[17px] mt-2 max-[1050px]:text-center max-[600px]:leading-6 max-[600px]:text-[16px]">- Description : {currentBook.description}</p>
                 <p className="mt-2 font-bold">- Price : {currentBook.prix} Dzd</p>
            </div>
        </div>


        </section>
    );
}