import { useState } from "react";
import Header from "../Components/Header";
import PopUp from "../Components/StoreComponents/PopUp";
import { useDescription } from "../Contexts/DescriptionContext"
import { usePopUp } from "../Contexts/PopUpContext";
import { useSearch } from "../Contexts/SearchContext";
import { useUser } from "../Contexts/UserContext";


export const Description = () => {

    const {descriptionBook} = useDescription();
    const {showPopUp,setShowPopUp} = usePopUp();
    const {user} = useUser();

    const [msg, setMsg] = useState({show : false, text : "", color : "red"});
    const {addToCart} = useUser();
    return(
        <>
          <Header/>

          <section className="flex flex-col justify-center items-center">
            {!descriptionBook 
             ? <h1>No description found</h1>
             : <>
                <h1 className="mt-8 w-[300px] text-center  font-black  leading-7 flex flex-col"><span className="text-blue-700 text-[1.8em]">{descriptionBook.title}</span> <span className="text-blue-500 text-[1.5em] font-bold">by {descriptionBook.author}</span></h1>

            <div className="flex flex-row justify-center gap-5 items-center w-[1000px] mt-10 p-3 border-2 border-blue-400 rounded-lg max-[1050px]:flex-col max-[1050px]:w-full max-[1050px]:p-0 max-[1050px]:border-0 max-[1050px]:px-5 mb-10 max-[1050px]:gap-5">
                   <div className="w-[25%] flex flex-col justify-center items-center  max-[1050px]:w-[300px]">
                    <img src={descriptionBook.image} alt={descriptionBook.title} className="w-[200px] h-[300px] object-contain"/>

                      <div className="h-[30px] flex justify-center items-center">
                        {msg.show && <p style={{color : msg.color}} className="font-bold text-center">{msg.text}</p>}

                        {descriptionBook.stock === 0 && <p className="text-center font-bold text-red-600">Out of stock</p>}
                      </div>
                    <button className="mt-3 bg-blue-500 text-white w-full mb-3 h-[40px] rounded-lg font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>{
                      if(!user){
                        setShowPopUp(true);
                      }else{
                        addToCart(descriptionBook, setMsg);
                      }
                    }}>Add To Cart</button>
                   </div>

                   <div className="w-[60%] max-[1050px]:w-full">
                    <p className="text-[1.1em] font-bold">Price : DA {descriptionBook.price}</p>
                    <p className="mt-2">Description : {descriptionBook.description}</p>
                    {descriptionBook.disprice < descriptionBook.price && 
                      <p className="text-red-600 underline">Discount Price : DA {descriptionBook.disprice}</p>
                    }
                    <p className="text-[1.1em] font-bold">Rating : {descriptionBook.rating}/5</p>
                    
                   </div>
                </div>
             </>
             }

             {showPopUp && !user && <PopUp/>}
          </section>
        </>
    );
}