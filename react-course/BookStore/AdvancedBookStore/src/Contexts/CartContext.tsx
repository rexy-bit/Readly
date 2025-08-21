import { createContext,  useContext } from "react";
import type { ReactNode } from "react";
import {  useUser, type BookCartType } from "./UserContext";
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../Config/fireBase"
import type { deliveryOption } from "../Pages/Cart";
import { useBooks } from "./BooksContext";

import { increment } from "firebase/firestore"
interface CartContextType{
    getEstimatedDate : (d : number) => string;
    calculateTotalCartItems : (cart : BookCartType[])=> number;
    handleDeliveryChange : (book : BookCartType, option : deliveryOption) => void;
    addItem : (book : BookCartType) => void;
    removeItem : (book : BookCartType) => void;
    deleteBook : (book : BookCartType) => void;
}
const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({children} : {children : ReactNode}) => {

      const {user,setUser} = useUser();
      const {books, setBooks} = useBooks();

          function getEstimatedDate(days : number){

        const date = new Date();
        date.setDate(date.getDate() + days);

        return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    }).format(date);
    }

    const calculateTotalCartItems = (cart : BookCartType[]) => {
          let cpt = 0;

          cart.forEach((b)=>{
            cpt += b.quantity;
          });

          return cpt;
    }

    const handleDeliveryChange = (book : BookCartType, option : deliveryOption) => {

        if(user === null){
            return;
        }
            const updatedCart = user.cart.map((b) => {
        if (b.id === book.id) {
            return { ...b, deliveryOption: option };
        }
        return b;
    });
           const newUser = {
            ...user,
             cart : updatedCart
           }

           setUser(newUser);

           const userRef = doc(db, "users", user.id);
           updateDoc(userRef, {cart : updatedCart});
        
    }

    const addItem = (book : BookCartType) => {

        console.log(books);
        const DataBook = books.find((b)=> b.id === book.id);

        if(!DataBook){
            return;
        }

        if(!user){
                return;
             }

        if(DataBook?.stock === 0){
            return;
        }else{
            
            let bookInCart = user.cart.find((b)=> b.id === book.id);

            if(!bookInCart) return;

            if(bookInCart?.quantity + 1 > 10 || DataBook?.stock === 0) return;
            const newCart = user?.cart.map((b)=>{
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
                                cart : newCart
                        });


                            const userRef = doc(db, "users", user.id);
                            updateDoc(userRef, {
                                cart: newCart
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
            return;
        }
       
        if(!user){
            return;
        }

        const bookInCart = user.cart.find((b)=> b.id === book.id);

        if(!bookInCart) return;

        if(bookInCart.quantity - 1 < 1) return;
      
        const newCart = user.cart.map((b)=>{
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
            cart : newCart
        });

        const userRef = doc(db, "users", user.id);
        updateDoc(userRef, {
            cart : newCart
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

        const newCart = user.cart.filter((b)=>b.id !== book.id);

        setUser({
            ...user,
            cart : newCart
        });

        const userRef = doc(db, "users", user.id);
        updateDoc(userRef, {
            cart : newCart
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


    return(
        <CartContext.Provider value={{getEstimatedDate, calculateTotalCartItems, handleDeliveryChange, addItem, removeItem, deleteBook}}>
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