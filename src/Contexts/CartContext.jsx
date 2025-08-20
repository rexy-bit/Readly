import React, { Children } from "react";
import data from "../data";
const CartContext = React.createContext();
import deliveryOptions from "../deliveryOptions";

export const useCartContext = ()=> React.useContext(CartContext);

export const CartProvider = ({children})=> {
 
    const [cart, setCart] = React.useState(()=>{
        const saved = localStorage.getItem('cart');

        return saved ? JSON.parse(saved) : 
           [];
    });
   
    

    React.useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(book, setMsg){

       const trouve = cart.find((b)=> b.titre === book.titre);

        
        if(!trouve){
            setCart(prev => [...prev, {
                ...book,
                quantite : 1,
                delivery : deliveryOptions[0]
            }]);

            setMsg({
                color : "green",
                text : "✓ Added",
                show : true
            })
        }else{
            setMsg({
                color : "red",
                text : 'Already in cart',
                show : true
            })
        }

        setTimeout(()=>{
            setMsg(prev =>({
                ...prev,
                show : false
            }))
        }, 1500)

        console.log(cart);
    }

    function removeFromCart(bookId){

        setCart(prev => prev.filter((book)=> book.code !== bookId));
    }

    function increaseQuantity(book){

        if(book.quantite + 1 > 10){
            return;
        }
        setCart(prev => prev.map((b)=>b.code === book.code ?
          {...b, quantite : b.quantite + 1} 
          : b
    ));
    }

    function decreaseQuantity(book){
        if(book.quantite - 1 < 1){
            return;
        }

        setCart(prev => prev.map((b)=> b.code === book.code ? 
          {...b, quantite : b.quantite - 1 } : 
            b
          ));
    }

    function getEstimatedDate(days){

        const date = new Date();
        date.setDate(date.getDate() + days);

        return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    }).format(date);
    }
    
    function calculateTotalCost(){

        let total = 0;

        cart.forEach((book)=>{
            total += Number(book.prix*book.quantite);
        });

        return total;
    }

    function calculateHandling(){
        let total = 0;
        cart.forEach((book)=>{
             total += Number(book.delivery.price);
        })

        return total;
    }

    function totalBeforeTax(){
        let total = 0;

        total = calculateTotalCost() + calculateHandling();

        return total;
    }

    function calculateTax(){

        let totalBT = totalBeforeTax();

        let tax = totalBT/10;

        return tax;
    }

    function calculateOrderTotal(){

        let orderTotal = calculateTax() + totalBeforeTax();

        return orderTotal;
    }



    const value = {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getEstimatedDate,
        calculateTotalCost,
        calculateHandling,
        totalBeforeTax,
        calculateTax,
        calculateOrderTotal
    }

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}