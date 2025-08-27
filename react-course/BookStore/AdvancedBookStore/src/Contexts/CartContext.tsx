import { createContext,    useContext, useState } from "react";
import type { ReactNode } from "react";
import {  useUser, type BookCartType, type CartType } from "./UserContext";
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../Config/fireBase"
import type { deliveryOption } from "../Pages/Cart";
import { useBooks } from "./BooksContext";
import {deliveryOptions} from "../deliveryOptions"

import { increment } from "firebase/firestore"
interface CartContextType{
    getEstimatedDate : (d : number) => string;
    calculateTotalCartItems : ()=> number;
    handleDeliveryChange : ( option : deliveryOption) => void;
    addItem : (book : BookCartType) => void;
    removeItem : (book : BookCartType) => void;
    deleteBook : (book : BookCartType) => void;
    calculateTotalWithout : () => number;
    calculateBeforeTax : () => number;
    calculateTax : () => number;
    calculateTotalPrice :  () => number;
    resetCart : (cart : CartType) => void;
    loadingCart : boolean;

}
const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({children} : {children : ReactNode}) => {

      const {user,setUser} = useUser();
      const {books, setBooks} = useBooks();
      const [loadingCart, setLoadingCart] = useState(false);

          function getEstimatedDate(days : number){

        const date = new Date();
        date.setDate(date.getDate() + days);

        return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    }).format(date);
    }

    const calculateTotalCartItems = () => {
          let cpt = 0;


          if(!user || user.cart.books.length === 0) return 0;

          user.cart.books.forEach((b)=>{
            cpt += b.quantity;
          });

          return cpt;
    }

    const handleDeliveryChange = ( option : deliveryOption) => {

       

        if(!user){
            return null;
        }
          
           setUser({
            ...user,
            cart : {
                books : [...user?.cart.books],
                deliveryOption : option
            }
           });

           const userRef = doc(db, "users", user.id);
           updateDoc(userRef, {cart : {
                books : [...user.cart.books],
                deliveryOption : option
           }});
        
    }

    const addItem = (book : BookCartType) => {

        console.log(books);
        const DataBook = books.find((b)=> b.id === book.id);

        if(!DataBook){
            return null;
        }

        if(!user){
                return null;
             }

        if(DataBook?.stock === 0){
            return null;
        }else{
            
            let bookInCart = user.cart.books.find((b)=> b.id === book.id);

            if(!bookInCart) return null;

            if(bookInCart?.quantity + 1 > 10 || DataBook?.stock === 0) return;
            const booksNew = user?.cart.books.map((b)=>{
                if(b.id === book.id){
                    
                    return{
                        ...b,
                        quantity : b.quantity + 1
                        
                    };
                }

                return b;
            });

        
                      

                         setUser({
                                ...user,
                                cart : {
                                    books : [...booksNew],
                                    deliveryOption : user.cart.deliveryOption
                                }
                        });


                            const userRef = doc(db, "users", user.id);
                            updateDoc(userRef, {
                                cart: {
                                     books : [...booksNew],
                                    deliveryOption : user.cart.deliveryOption
                                }
                            })

                            

                   
                          const newBooks = books.map((b)=>{
                            if(b.id === book.id){
                                return{
                                    ...b,
                                    stock : b.stock - 1
                                }

                                
                            }
                            return b;
                          });

                          setBooks(newBooks);
                             
                         const bookRef = doc(db, "books", book.id);

                            updateDoc(bookRef, {
                            stock : increment(-1)
                            })

                             
                         

             


        }
        
    }


    const removeItem = (book : BookCartType) =>{
       
        const DataBook = books.find((b)=> b.id === book.id);
        console.log(books);

        if(!DataBook){
            return null;
        }
       
        if(!user){
            return null;
        }

        const bookInCart = user.cart.books.find((b)=> b.id === book.id);

        if(!bookInCart) return;

        if(bookInCart.quantity - 1 < 1) return;
      
        const booksNew = user.cart.books.map((b)=>{
            if(b.id === book.id){
               
                return{
                    ...b,
                    quantity : b.quantity - 1
                }
            }

            return b;
        });

       

        setUser({
            ...user,
            cart : {
                books : [...booksNew],
                deliveryOption : user.cart.deliveryOption
            }
        });

        const userRef = doc(db, "users", user.id);
        updateDoc(userRef, {
            cart : {
                books : [...booksNew],
                deliveryOption : user.cart.deliveryOption
            }
        });

                                  const newBooks = books.map((b)=>{
                            if(b.id === book.id){
                                return{
                                    ...b,
                                    stock : b.stock + 1
                                }

                                
                            }
                            return b;
                          });

                          setBooks(newBooks);

        const bookRef = doc(db, "books", book.id);

        updateDoc(bookRef, {
            stock : increment(1)
        });

        

        
    }


    const deleteBook = (book : BookCartType) => {

        if(!book) return;
        if(!user) return;

        const booksNew = user.cart.books.filter((b)=>b.id !== book.id);

        setUser({
            ...user,
            cart : {
                books : [...booksNew],
                deliveryOption: user.cart.deliveryOption
            }
        });

        const userRef = doc(db, "users", user.id);
        updateDoc(userRef, {
            cart : {
                books : [...booksNew],
                deliveryOption : user.cart.deliveryOption
            }
        });

        const newBooks = books.map((b)=>{
            if(b.id === book.id){
                return{
                    ...b,
                    stock : b.stock + book.quantity
                }
            }
            return b;
        });

        setBooks(newBooks);

        const bookRef = doc(db, "books", book.id);

        updateDoc(bookRef, {
            stock : increment(book.quantity)
        });

    }

    const calculateTotalWithout = () => {
        let cpt = 0;
        user?.cart.books.forEach((b)=>{
            cpt += b.quantity*b.price;
        });

        return cpt;
    }

    

    const calculateBeforeTax = () => {
        if(!user) return 0;
      
            const cpt = calculateTotalWithout() + user.cart.deliveryOption.price;
        
            return cpt;
    }

    const calculateTax = () => {
        return (calculateBeforeTax()/10)
    }

    const calculateTotalPrice = () => {
        return(calculateBeforeTax() + calculateTax());
    }


    const resetCart = async(cart : CartType) =>{

        if(!user) return null;



        setLoadingCart(true);
            await Promise.all(
            cart.books.map(async (b) => {
            const bookRef = doc(db, "books", b.id);
            await updateDoc(bookRef, {
                stock: increment(b.quantity),
            });
            })
           );

        setLoadingCart(false);

                setUser({
            ...user,
            cart : {
                books : [],
                deliveryOption : deliveryOptions[0]
            }
        });

        const userRef = doc(db, "users", user.id);
         await updateDoc(userRef, { cart: { books: [], deliveryOption: deliveryOptions[0] } });

        const newBooks = books.map((b)=>{
            const bookInCart = cart.books.find((book)=> book.id === b.id);

            if(bookInCart){
                return{
                    ...b,
                    stock : b.stock + bookInCart.quantity
                }
            }

            return b;
        });

        setBooks(newBooks);

    }
    return(
        <CartContext.Provider value={{getEstimatedDate, calculateTotalCartItems, handleDeliveryChange, addItem, removeItem, deleteBook,calculateTotalWithout,  calculateBeforeTax, calculateTax, calculateTotalPrice, resetCart, loadingCart}}>
            {children}
        </CartContext.Provider>
    );
}




export const useCartContext = () => {
    const context = useContext(CartContext);

    if(!context){
        throw new Error("Use useCartContext inside a CartProvider check that in App.tsx");
    }

    return context;
}