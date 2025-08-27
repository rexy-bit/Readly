import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useUser, type OrderType } from "../Contexts/UserContext"
import type { BookCartType } from "../Contexts/UserContext";
import { useCartContext } from "../Contexts/CartContext";
import { memo, useEffect, useState } from "react";
import { useOrderContext } from "../Contexts/OrderContext";
import CancelPop from "../Components/OrderComponents/CancelPop";
import { usePackageContext } from "../Contexts/PackageContext";


const OrderHeader = ({orders} : {orders : OrderType}) => {

    return(
        <header className="flex flex-row w-full justify-between p-5 border-b border-b-gray-300 max-[950px]:flex-col">
            <div className="flex flex-col max-[950px]:flex-row max-[950px]:gap-1">
                <p className="font-bold">Order Placed:</p>
                <p>  {new Date(orders.orderDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                })}</p>
            </div>

            <div className="flex flex-col max-[950px]:flex-row max-[950px]:gap-1">
                <p className="font-bold">Total:</p>
                <p>{orders.price.toFixed(2)} Dzd</p>

            </div>

            <div className="flex flex-col max-[950px]:flex-row max-[950px]:gap-1">
                <p className="font-bold">Order ID:</p>
                <p className="max-[950px]:w-[170px]">{orders.orderId}</p>
            </div>
        </header>
    );
}

const OrderComponent = ({book, order} : {book : BookCartType, order : OrderType}) => {
 
    const {getEstimatedDate} = useCartContext();
  

    const {user} = useUser();

    if(!user) return null;


    return(
        <div  className="flex flex-row w-full justify-between p-5 items-center max-[950px]:flex-col max-[950px]:gap-4">
        <div className="flex flex-row justify-center items-center gap-4 max-[950px]:flex-col">
            <div>
                <img src={book.image} alt={book.title} className="w-[80px] h-[130px] object-contain"/>
            </div>

            <div className="flex flex-col gap-1">
                <p className="font-bold">{book.title}</p>
                <p>Quantity : {book.quantity}</p>
             
            </div>
            
       </div>

      </div>
    );
}

const AllOrder = ({orders, showCancelPop,setShowCancelPop} : {orders : OrderType, showCancelPop : boolean,setShowCancelPop : (s : boolean)=> void}) => {

    const {setOrderPackageTrack} = usePackageContext();
    const {user} = useUser();
      

    if(!user) return null;

        const orderDateObj = new Date(orders.orderDate);
    const navigate = useNavigate();



  const estimatedDate = new Date(orderDateObj);
  estimatedDate.setDate(orderDateObj.getDate() + user.cart.deliveryOption.delayDays);
    return(
        <>
        <div className="flex flex-col gap-0 border border-gray-300 w-[900px] rounded-[5px]  max-[950px]:w-[500px] max-[550px]:w-[300px]">
           <OrderHeader 
           orders={orders}/>

           <div className="flex flex-col max-[950px]:gap-2 max-[1025px]:justify-center max-[1025px]:items-center">
              <p className="text-[1.4em] font-bold text-blue-500 mt-3 ml-3 underline">Arriving on : {estimatedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    })}</p>
            <div className="flex flex-row justify-between max-[1025px]:flex-col max-[1025px]:justify-center max-[1025px]:items-center">
            <div>
                            {orders.order.books.map((b)=>{
                return(
                    <OrderComponent 
                     book={b}
                     order={orders}
                     key={b.id}
                    />
                )
            })}
            </div>

                <div className="flex flex-col mt-5 mr-5">

                 

                            <button onClick={()=> {
                                setOrderPackageTrack(orders);
                                navigate("/track");
                                }} className="w-[220px] bg-gray-50 border border-gray-300 rounded-[5px] h-[35px] text-[0.9em] cursor-pointer transtion-colors duration-200 hover:bg-gray-100">Track Package</button>
                 </div>
            </div>
           
       
           </div>

           <button className="bg-red-600 text-white font-bold w-[110px] h-[35px] rounded-3xl mb-3 ml-3 mt-8 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=> setShowCancelPop(true)}>Cancel Order</button>
        </div>

          {showCancelPop && <CancelPop setShowCancelPop={setShowCancelPop} order={orders}/>}
        </>
    )

}

const Orders = () => {

    const {user} = useUser();
    const navigate = useNavigate();

    const {loading, initializing} = useUser();
    const {loadingOrder, cancelOrder} = useOrderContext();
    const [showCancelPop, setShowCancelPop] = useState(()=>{
        const saved = localStorage.getItem('showCancelPop');

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem('showCancelPop', JSON.stringify(showCancelPop));
    }, [showCancelPop]);


    if(loading || initializing || loadingOrder){
        return(
                        <>
                             
                           <div className="flex justify-center mt-20">
                      <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
                    </div>
                        </>
        )
    }
   
    return(

        <>
         

          <section className="flex flex-col justify-center items-center w-full">
            {!user ?
              <div className="flex flex-col gap-2 mt-10 jusitfy-center items-center">
                 <h1 className="w-[300px] text-blue-500 font-bold text-center">No Orders, Login to add Items to your cart and place orders</h1>
                 <button onClick={()=>navigate('/profile')} className="w-[100px] h-[35px] font-bold bg-blue-500 text-white rounded-lg transition-opacity duration-200 hover:opacity-70 active:opacity-50 cursor-pointer">Login</button>
             </div> : user.orders.length === 0 ?
                    <>
                       <div className="text-blue-500 text-center font-bold mt-15">No Orders have been set</div>
                    </>
                    :
                <>
                 <div className="flex flex-col mt-10 gap-2">
                   <h1 className="font-bold text-[1.5em] mb-5">Your Orders</h1>
                  <div className="flex flex-col justify-center items-center gap-10 mb-20">
                    {user.orders.map((order)=> {
                        return(
                            <AllOrder
                              orders={order}
                              setShowCancelPop={setShowCancelPop}
                              showCancelPop={showCancelPop}
                              key={order.orderId}
                            />
                        );
                    })}
                  </div>
                  </div>

                  
                </>

            }
          </section>
        </>
    )
}

export default memo(Orders);