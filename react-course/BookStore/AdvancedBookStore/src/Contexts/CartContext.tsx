import { createContext,  useContext, useState } from "react";
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
    calculateTotalWithout : () => number;
    calculateShipping : ()=> number;
    calculateBeforeTax : () => number;
    calculateTax : () => number;
    calculateTotalPrice :  () => number;
    resetCart : (cart : BookCartType[]) => void;
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

    const calculateTotalWithout = () => {
        let cpt = 0;
        user?.cart.forEach((b)=>{
            cpt += b.quantity*b.price;
        });

        return cpt;
    }

    const calculateShipping = () => {
        let cpt = 0;
        user?.cart.forEach((b)=>{
            cpt += b.deliveryOption.price;
        });

        return cpt;
    }

    const calculateBeforeTax = () => {
      
            const cpt = calculateTotalWithout() + calculateShipping();
        
            return cpt;
    }

    const calculateTax = () => {
        return (calculateBeforeTax()/10)
    }

    const calculateTotalPrice = () => {
        return(calculateBeforeTax() + calculateTax());
    }


    const resetCart = async(cart : BookCartType[]) =>{

        if(!user) return;



        setLoadingCart(true);
            await Promise.all(
            cart.map(async (b) => {
            const bookRef = doc(db, "books", b.id);
            await updateDoc(bookRef, {
                stock: increment(b.quantity),
            });
            })
           );

        setLoadingCart(false);

                setUser({
            ...user,
            cart : []
        });

        const newBooks = books.map((b)=>{
            const bookInCart = cart.find((book)=> book.id === b.id);

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
        <CartContext.Provider value={{getEstimatedDate, calculateTotalCartItems, handleDeliveryChange, addItem, removeItem, deleteBook,calculateTotalWithout, calculateShipping, calculateBeforeTax, calculateTax, calculateTotalPrice, resetCart, loadingCart}}>
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