import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useUser, type OrderType } from "../Contexts/UserContext"
import type { BookCartType } from "../Contexts/UserContext";
import { useCartContext } from "../Contexts/CartContext";
import { memo } from "react";
import { useOrderContext } from "../Contexts/OrderContext";


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

    const orderDateObj = new Date(order.orderDate);


  const estimatedDate = new Date(orderDateObj);
  estimatedDate.setDate(orderDateObj.getDate() + book.deliveryOption.delayDays);
    return(
        <div  className="flex flex-row w-full justify-between p-5 items-center max-[950px]:flex-col max-[950px]:gap-4">
        <div className="flex flex-row justify-center items-center gap-4 max-[950px]:flex-col">
            <div>
                <img src={book.image} alt={book.title} className="w-[80px] h-[130px] object-contain"/>
            </div>

            <div className="flex flex-col gap-1">
                <p className="font-bold">{book.title}</p>
                <p>Quantity : {book.quantity}</p>
                <p>Arriving on : {estimatedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    })}</p>
            </div>
            
        </div>

        <button className="w-[200px] bg-white border-1 border-gray-300 h-[35px] rounded-[5px] cursor-pointer transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100">Track package</button>
        </div>
    );
}

const AllOrder = ({orders} : {orders : OrderType}) => {

    return(
        <div className="flex flex-col gap-0 border border-gray-300 w-[900px] rounded-[5px]  max-[950px]:w-[500px] max-[550px]:w-[300px]">
           <OrderHeader 
           orders={orders}/>

           <div className="flex flex-col max-[950px]:gap-2">
            {orders.order.map((b)=>{
                return(
                    <OrderComponent 
                     book={b}
                     order={orders}
                    />
                )
            })}
           </div>

           <button className="bg-red-600 text-white font-bold w-[110px] h-[35px] rounded-3xl mb-3 ml-3 mt-5 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">Cancel Order</button>
        </div>
    )

}

const Orders = () => {

    const {user} = useUser();
    const navigate = useNavigate();

    const {loading, initializing} = useUser();
    const {loadingOrder} = useOrderContext();

    if(loading || initializing || loadingOrder){
        return(
                        <>
                          <Header/>
                          
                           <div className="flex justify-center mt-20">
                      <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
                    </div>
                        </>
        )
    }
    if(!user) return;

    return(

        <>
          <Header/>

          <section className="flex flex-col justify-center items-center w-full">
            {!user ?
              <div className="flex flex-col gap-2 mt-10 jusitfy-center items-center">
                 <h1 className="w-[300px] text-blue-500 font-bold text-center">No Orders, Login to add Items to your cart and place orders</h1>
                 <button onClick={()=>navigate('/profile')} className="w-[100px] h-[35px] font-bold bg-blue-500 text-white rounded-lg transition-opacity duration-200 hover:opacity-70 active:opacity-50 cursor-pointer">Login</button>
             </div> : 
                <>
                 <div className="flex flex-col mt-10 gap-2">
                   <h1 className="font-bold text-[1.5em] mb-5">Your Orders</h1>
                  <div className="flex flex-col justify-center items-center gap-10 mb-20">
                    {user.orders.map((order)=> {
                        return(
                            <AllOrder
                              orders={order}
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