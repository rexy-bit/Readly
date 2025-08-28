import BookCardAdmin from "../../Components/AdminComponents/BookCardAdmin";
import OrderCard from "../../Components/AdminComponents/OrderCard";
import BookCard from "../../Components/StoreComponents/BookCard";
import { useAdminOrders } from "../../Contexts/AdminOrdersContext";
import { useBooks } from "../../Contexts/BooksContext";
import { useUser } from "../../Contexts/UserContext"
import { useState, useEffect, memo } from "react";

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // met à jour chaque seconde

    return () => clearInterval(timer); // nettoyage quand le composant se démonte
  }, []);

  return (
    <div className="text-xl font-bold text-gray-800">
      {time.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })}
    </div>
  );
}


const Dashboard = () => {


    const {users, user} = useUser();
    const {books} = useBooks();
    const {adminOrders} = useAdminOrders();

    const mostExpensive = () => {
        let max = books[0];

        for(let i = 0;i< books.length; i++){
            if(books[i].price > max.price){
                max = books[i];
            }
        }

        return max;
    }


    const leastExpensivePrice = () => {
        let min = books[0];

        for(let i = 0;i<books.length ;i++){
            if(books[i].price < min.price){
                min = books[i];
            }
        }
        
        return min;
    }
    const today = new Date();

    const undeliveredOrders = adminOrders.filter((o)=> o.order.status === "Shipped" || o.order.status === "Preparing");

    const outOfStockBooks = books.filter((b)=> b.stock === 0);
    return(

        <section className="flex flex-col justify-center items-center">

            <div className="flex flex-row items-center mt-8 gap-5 justify-center border border-gray-800 py-1 px-3 rounded-3xl">
               <p className="text-gray-800 font-bold">{today.toDateString()}</p>
               <p>{CurrentTime()}</p>
            </div>
            <h1 className="mt-8 font-bold text-blue-500 underline text-[1.5em]">Dashboard</h1>

            <nav className="flex flex-row justify-between items-center w-[900px] bg-blue-400 py-2 px-4 rounded-3xl mt-10 max-[920px]:w-[600px] max-[620px]:flex-col max-[620px]:w-[200px] max-[620px]:gap-1">
                <a className="text-white font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50 " href="#general">General</a>
                <a className="text-white font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" href="#undelivered">Undelivered</a>
                <a className="text-white font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" href="#stock">Out of Stock</a>
                <a className="text-white font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" href="#most">Most Expensive</a>
                <a className="text-white font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" href="#least">Least Expensive</a>
            </nav>
            <p className="text-[1em] w-[300px] text-center mt-7 text-blue-600 font-bold">Welcome Back, {user?.name} browse to see the state of your plateforme today</p>

             <div id="general" className="w-full bg-blue-400 mt-10 flex flex-col justify-center
              items-center">
                <h1 className="text-[1.5em] text-white font-bold underline mt-10">General Statistics</h1>

                <div className="flex flex-col justify-center items-center gap-2 mt-5 mb-10">
                    <p className="text-[1.1em] font-bold text-white">Total number of users : {users.length}</p>
                    <p className="text-[1.1em] font-bold text-white">Total number of books : {books.length}</p>
                    <p className="text-[1.1em] font-bold text-white">Total number of orders : {adminOrders.length}</p>
                </div>
             </div>

             <div id="undelivered" className="flex flex-col justify-center items-center bg-blue-200 w-full">
                <h1 className="mt-10 text-[1.5em] font-black underline">Undelivered Orders</h1>

                
                   {undeliveredOrders.length === 0 ?
                       <h1 className="mt-5 font-bold w-[300px] text-center">No Undelivered Orders</h1>

                       : 
                         <div className="flex flex-col justify-center items-center gap-10 mt-10 mb-10">
                          {undeliveredOrders.map((order)=>{
                            return(
                            <OrderCard
                            order={order}
                            key={order.id}
                            />
                            );
                          })}
                          </div>
                   }
                
             </div>

             <div id="stock" className="w-full flex flex-col justify-center items-center bg-blue-400">
                <h1 className="mt-10 font-black text-[1.5em] underline text-white">Out of stock Books</h1>

                {outOfStockBooks.length === 0 
                   ?
                   <h1 className="mt-5 text-white mb-10">No Books are out of stock</h1>
                     :
                   <div className="flex flex-col justify-center items-center gap-10 mt-10 mb-10">
                    {outOfStockBooks.map((b)=>{
                        return(
                            <BookCardAdmin
                             book={b}
                             key={b.id}
                            />

                        );
                    })}
                   </div>
                }
             </div>


             <div id="most" className="flex flex-col justify-center items-center bg-blue-200 w-full">

                  <h1 className="font-black text-[1.5em] underline mt-10 mb-10">Most Expensive Book</h1>

                  {books.length === 0 ?
                      <h1>You have no books in your store</h1>

                      : 
                      <div className="border border-blue-500 rounded-lg mb-15">
                        <BookCardAdmin
                        book={mostExpensive()}
                        />
                        </div>
                }

             </div>


             <div id="least" className="w-full flex flex-col justify-center items-center bg-blue-400">
                <h1 className="mt-10 text-white font-black text-[1.5em] underline">Least Expensive Book</h1>

                  {books.length === 0 ?
                      <h1>You have no books in your store</h1>

                      : 
                      <div className="mt-10 mb-10">
                        <BookCardAdmin
                        book={leastExpensivePrice()}
                        />
                        </div>

                }
             </div>

        </section>

    )
}

export default memo(Dashboard);