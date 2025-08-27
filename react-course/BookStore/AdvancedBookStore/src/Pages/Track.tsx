import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useUser } from "../Contexts/UserContext"
import { useOrderContext } from "../Contexts/OrderContext";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { usePackageContext } from "../Contexts/PackageContext";
import { memo } from "react";

const Track = () => {


    const {loading, initializing, user} = useUser();
    const {loadingOrder} = useOrderContext();
    const { orderPackageTrack} = usePackageContext();
     if(!user) return null;
    const navigate = useNavigate();

  
    if(!orderPackageTrack) return null;

    console.log(orderPackageTrack);
  
    const orderDateObj = new Date(orderPackageTrack.orderDate);
      const estimatedDate = new Date(orderDateObj);
  estimatedDate.setDate(orderDateObj.getDate() + user.cart.deliveryOption.delayDays);

    if(loadingOrder || loading || initializing){
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
     
       <section className="flex flex-col justify-center items-center">
        {!orderPackageTrack ? 
            <>
                 <h1 className="text-blue-500 text-center font-bold text-[1.1em]">No Package found</h1>
              </>
              :
       
            <div className="flex flex-col mt-14">
                <p className="text-[1.1em] text-blue-400 underline transition-opacity duration-200 hover:opacity-70 active:opacity-50"><Link to="/orders">view all orders</Link></p>

               <div className="p-5 border border-gray-300 mt-5 rounded-[5px] w-[300px] mb-20">
                <h1 className="font-bold text-[1.5em] max-[400px]:text-[1.3em]">Arriving on : {estimatedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    })}</h1>
                  <div className="flex flex-wrap justify-center items-center gap-10">
                    {orderPackageTrack.order.books.map((b)=>{
                         return(
                            <div className="flex flex-col justify-center items-center gap-1 w-[100px]">
                                <img src={b.image} alt={b.title} className="w-[60px] h-[110px] object-contain"/>
                                <p className="text-center leading-4">{b.title}</p>
                                <p>Quantity : {b.quantity}</p>
                            </div>
                         )
                    })}
                  </div>

                <p className="mt-5 font-bold text-[1.1em] smoothPulse">Status : {orderPackageTrack.status}</p>

                <p className="mt-2">If you need help : <span className="text-blue-500 underline text-[1.1em] cursor-pointer transiton-opacity duration-200 hover:opacity-70 active:opacity-50"><Link to="/">Contact us</Link></span></p>
                </div>
            </div>}

            <button onClick={()=> navigate(-1)} className="fixed top-17  left-2 bg-blue-500 text-white font-bold w-[90px] h-[35px] rounded-3xl cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">&#8592; Back</button>
        </section>
        </>
    )
}


export default memo(Track);