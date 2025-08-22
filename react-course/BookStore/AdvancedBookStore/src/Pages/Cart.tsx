import  { memo, useEffect, useState} from "react"
import { useUser, type BookCartType } from "../Contexts/UserContext"
import { useCartContext } from "../Contexts/CartContext";
import {deliveryOptions} from "../deliveryOptions"
import Header from "../Components/Header";
import ResetPop from "../Components/CartComponents.tsx/ResetPop";

export interface deliveryOption{
  id : string;
  name : string;
  delayDays : number;
  price : number;
}
const DeliveryOptions = ({book} : {book : BookCartType}) => {

    const {getEstimatedDate, handleDeliveryChange} = useCartContext();
    
    return(
        <div className="flex flex-col mr-10 max-[1025px]:mr-0 max-[1025px]:items-center max-[1025px]:mb-4">
            <h1 className="font-bold text-[1.1em]">Delivery Options :</h1>

            <div className="flex flex-col mt-2">
                {deliveryOptions.map((option : deliveryOption)=>{
                    return(
                       <label key={option.id} className="flex flex-row gap-3 items-center">
                         <input 
                         type="radio" 
                         checked={book.deliveryOption.id === option.id}
                         name={`delivery-${book.id}`}
                         onChange={()=> handleDeliveryChange(book, option)}
                         
                         />

                         <div>
                            <p className="font-bold">{getEstimatedDate(option.delayDays)}</p>
                            <p className="text-gray-700">{option.name}</p>
                         </div>
                       </label>
                    )
                })}
            </div>
        </div>
    )
}
const BookCartCard = ({book} : {book : BookCartType}) => {

    const {getEstimatedDate, addItem, removeItem, deleteBook} = useCartContext();

    return(
        <div className="flex flex-col p-7 border border-gray-400 rounded-s max-[1025px]:items-center max-[1025px]:p-1 max-[1025px]:w-[300px]">
             <h1 className="text-[1.3em] font-bold text-blue-500 mb-5 max-[1025px]:mt-3 max-[1025px]:w-[200px] max-[1025px]:text-center">Delivery Date : {getEstimatedDate(book.deliveryOption.delayDays)}</h1>

             <div className="flex flex-row gap-20 justify-center items-center max-[1025px]:flex-col max-[1025px]:gap-5">
             <div className="flex flex-row gap-4 justify-center items-center max-[1025px]:flex-col">
                <div>
                    <img src={book.image} alt={book.title} className="w-[100px] h-[150px] object-contain" />
                </div>
                <div className="flex flex-col gap-2 max-[1025px]:justify-center max-[1025px]:items-center">
                    <p className="font-bold">{book.price} Dzd</p>
                    <div className="flex flex-row max-[1025px]:flex-col">
                        <p>Quantity: {book.quantity}</p>
                        <div className="flex flex-row gap-2 ml-1">
                            <button className="plusButton" onClick={()=>addItem(book)}>+</button>
                            <button className="plusButton" onClick={()=> removeItem(book)}>-</button>
                        </div>
                    </div>

                    <button className="text-white bg-red-600 w-[80px] h-[30px] rounded-2xl font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50 mt-2" onClick={()=> deleteBook(book)}>Delete</button>
                </div>
             </div>
  
                 <DeliveryOptions
                  book={book}
                  />

             </div>
        </div>
    )
}

const CheckOut = () => {
    
    const {calculateTotalCartItems} = useCartContext();
    const {user} = useUser();

    if(!user){
        return;
    }
    return(
        <header className="fixed top-[55px] text-[1.3em] bg-blue-400 w-full h-[45px] flex justify-center items-center text-white font-black z-10">
            Checkout <span className="ml-2">({calculateTotalCartItems(user.cart)} items)</span>
        </header>
    )
}

const DisplayAllCart = () => {

    const {user} = useUser();

    return(
        <div className="mt-20 flex flex-col justify-center max-[1025px]:items-center">


            <h1 className="text-[1.4em] font-bold text-black">Review your order</h1>

          <div className="flex flex-row justify-center gap-5 mb-10 mt-2 max-[1025px]:flex-col max-[1025px]:items-center">
            <div className="flex flex-col gap-2 order-1 max-[1025px]:order-2">
                {user?.cart.map((book)=>{
                    return(
                        <BookCartCard
                        book={book}
                        key={book.id}
                        />
                    )
                })}
            </div>
            <div className="order-2 max-[1025px]:order-1">
            <PayementSummary/>
            </div>
            </div>
        </div>
    )
}

const PayementSummary = () => {

    const {calculateTotalCartItems, calculateBeforeTax, calculateTotalWithout,calculateShipping, calculateTax, calculateTotalPrice} = useCartContext();

    const {user} = useUser();

    if(!user){
        return;
    }

    return(
        <div className="w-[300px] h-[330px] p-5 border border-gray-400 rounded-[5px]">
            <h1 className="text-[1.1em] font-bold">Payement Summary</h1>

            <div className="w-full flex flex-col gap-1 mt-3">
                <div className="flex flex-row justify-between items-center">
                    <p>Items({calculateTotalCartItems(user?.cart)}):</p>
                    <p>{calculateTotalWithout().toFixed(2)}Dzd</p>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <p>Shipping & handling:</p>
                    <p>{calculateShipping().toFixed(2)}Dzd</p>
                </div>
            </div>

            <div className="flex flex-col w-full gap-1 mb-4 mt-2">
                <div className="flex flex-row justify-between  items-center pt-2">
                    <p>Total before tax:</p>
                    <p className="border-t border-t-gray-300">{calculateBeforeTax().toFixed(2)}Dzd</p>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <p>Estimated tax (10%):</p>
                    <p>{calculateTax().toFixed(2)}Dzd</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 pt-3 border-t border-t-gray-300">
                <div className="flex flex-row justify-between items-center text-blue-500 font-bold text-[1.2em]">
                    <p>Order total:</p>
                    <p>{calculateTotalPrice().toFixed(2)}Dzd</p>
                </div>

                <button className="bg-blue-500 text-white h-[35px] rounded-lg font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">Place your order</button>
            </div>
        </div>
    )
}

const Cart = () => {

    const {user, initializing, loading,} = useUser();
    const {loadingCart} = useCartContext();

    const [showReset, setShowReset] = useState(()=>{
        const saved = localStorage.getItem('showReset');

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem('showReset', JSON.stringify(showReset));
    }, [showReset]);
    

    if(loadingCart){
         return(
            <>
              <Header/>
              <CheckOut/>
               <div className="flex justify-center mt-20">
          <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
        </div>
            </>
        )
    }
    if(!user && initializing){
        return(
            <>
              <Header/>
              <CheckOut/>
               <div className="flex justify-center mt-20">
          <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
        </div>
            </>
        )
    }
    if( loading || initializing){
        return(
        <>
      <Header/>
               <div className="flex justify-center mt-13">
          <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
        </div>
        </>
        );
    }
      
    
    return(
        <>
        <Header/>
        
        <section className="flex flex-col justify-center w-full items-center">
           {!user ?
               <h1 className="w-[300px] text-center text-blue-500 mt-20 font-bold text-[1.1em]">Your Cart is empty create an account to add books to your cart and place orders</h1>  
               : user.cart.length === 0 
                 ? <h1 className="text-center mt-10 w-[300px] text-blue-500 font-bold">Your cart is empty, search for books, view different categories, explore the store and purchase the books you like</h1>
                  : <>
                     <CheckOut/>
                     
                     <DisplayAllCart/>
                     
                     <button onClick={()=> setShowReset(true)} className="fixed bottom-3 right-3 w-[100px] bg-blue-500 text-white font-bold h-[35px] rounded-3xl cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">
                        <i className="fa-solid fa-trash" ></i> Reset</button>

                        {showReset && 
                          <ResetPop setShowReset={setShowReset}/>
                        }
                     
                  </>
            }
        </section>
        </>
    )
}

export default memo(Cart)