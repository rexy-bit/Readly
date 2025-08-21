import  { memo} from "react"
import { useUser, type BookCartType } from "../Contexts/UserContext"
import { useCartContext } from "../Contexts/CartContext";
import {deliveryOptions} from "../deliveryOptions"
import Header from "../Components/Header";

export interface deliveryOption{
  id : string;
  name : string;
  delayDays : number;
  price : number;
}
const DeliveryOptions = ({book} : {book : BookCartType}) => {

    const {getEstimatedDate, handleDeliveryChange} = useCartContext();
    
    return(
        <div className="flex flex-col mr-10">
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
        <div className="flex flex-col p-5 border border-gray-400 rounded-s">
             <h1 className="text-[1.3em] font-bold text-blue-500">Delivery Date : {getEstimatedDate(book.deliveryOption.delayDays)}</h1>

             <div className="flex flex-row gap-20 justify-center items-center">
             <div className="flex flex-row gap-4 justify-center items-center">
                <div>
                    <img src={book.image} alt={book.title} className="w-[100px] h-[150px] object-contain" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-bold">{book.price} Dzd</p>
                    <div className="flex flex-row">
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
        <div className="mt-20 flex flex-col justify-center gap-2">
            <h1 className="text-[1.4em] font-bold text-black">Review your order</h1>

            <div className="flex flex-col gap-2 mb-10">
                {user?.cart.map((book)=>{
                    return(
                        <BookCartCard
                        book={book}
                        key={book.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

const Cart = () => {

    const {user, initializing, loading} = useUser();
    

    if( loading || initializing){
        <>
      <Header/>
               <div className="flex justify-center mt-13">
          <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
        </div>
        </>
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
                  </>
            }
        </section>
        </>
    )
}

export default memo(Cart)