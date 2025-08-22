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
    const {packageTrack, orderPackageTrack} = usePackageContext();
    const navigate = useNavigate();

    if(!orderPackageTrack) return;
    if(!packageTrack) return;

    const orderDateObj = new Date(orderPackageTrack.orderDate);
      const estimatedDate = new Date(orderDateObj);
  estimatedDate.setDate(orderDateObj.getDate() + packageTrack.deliveryOption.delayDays);

    if(loadingOrder || loading || initializing){
        return(
          <>
                      <Header/>
                      
                       <div className="flex justify-center mt-20">
                  <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
                </div>
                    </>
        )
    }

    return(
     <>
      <Header/>
       <section className="flex flex-col justify-center items-center">
        {!packageTrack ? 
              <>
                 <Header/>
                 <h1 className="text-blue-500 text-center font-bold text-[1.1em]">No Package found</h1>
              </>
              :
       
            <div className="flex flex-col mt-10">
                <p className="text-[1.1em] text-blue-400 underline transition-opacity duration-200 hover:opacity-70 active:opacity-50"><Link to="/orders">view all orders</Link></p>

               <div className="p-5 border border-gray-300 mt-5 rounded-[5px]">
                <h1 className="font-bold text-[1.5em] max-[400px]:text-[1.3em]">Arriving on : {estimatedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    })}</h1>
                <p>{packageTrack.title}</p>
                <p>Quantity : {packageTrack.quantity}</p>

                <img src={packageTrack.image} alt={packageTrack.title} className="w-[120px] h-[170px] object-contain mt-3"/>

                <p className="mt-5 font-bold text-[1.1em] smoothPulse">Status : {packageTrack.status}</p>

                <p className="mt-2">If you need help : <span className="text-blue-500 underline text-[1.1em] cursor-pointer transiton-opacity duration-200 hover:opacity-70 active:opacity-50"><Link to="/">Contact us</Link></span></p>
                </div>
            </div>}

            <button onClick={()=> navigate(-1)} className="fixed top-17  left-2 bg-blue-500 text-white font-bold w-[90px] h-[35px] rounded-3xl cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">&#8592; Back</button>
        </section>
        </>
    )
}


export default memo(Track);