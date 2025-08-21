import  { memo } from "react"
import { useUser, type BookCartType } from "../Contexts/UserContext"
import { useCartContext } from "../Contexts/CartContext";
import {deliveryOptions} from "../deliveryOptions"
import type { Book } from "../Contexts/BooksContext";
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
        <div>
            <h1>Delivery Options :</h1>

            <div>
                {deliveryOptions.map((option : deliveryOption)=>{
                    return(
                       <label key={option.id}>
                         <input 
                         type="radio" 
                         checked={book.deliveryOption.id === option.id}
                         onChange={()=> handleDeliveryChange(book, option)}
                         />

                         <div>
                            <p>{getEstimatedDate(option.delayDays)}</p>
                            <p>{option.name}</p>
                         </div>
                       </label>
                    )
                })}
            </div>
        </div>
    )
}
const BookCartCard = ({book} : {book : BookCartType}) => {

    const {getEstimatedDate} = useCartContext();

    return(
        <div>
             <h1>Delivery Date : {getEstimatedDate(book.deliveryOption.delayDays)}</h1>

             <div>
             <div>
                <div>
                    <img src={book.image} alt={book.title} />
                </div>
                <div>
                    <p>Da {book.price}</p>
                    <div>
                        <p>Quantity: {book.quantity}</p>
                        <div>
                            <button>+</button>
                            <button>-</button>
                        </div>
                    </div>

                    <button>Delete</button>
                </div>
             </div>
  
                 <DeliveryOptions
                  book={book}
                  />

             </div>
        </div>
    )
}


const DisplayAllCart = () => {

    const {user} = useUser();

    return(
        <div>
            <h1>Review your order</h1>

            <div>
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
        
        <section>
           {!user ?
               <h1>Your Cart is empty create an account to add books to your cart and place orders</h1>  
               : user.cart.length === 0 
                 ? <h1>Your cart is empty, search for books, view different categories, explore the store and purchase the books you like</h1>
                  : <>
                     <DisplayAllCart/>
                  </>
            }
        </section>
        </>
    )
}

export default memo(Cart)