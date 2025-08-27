import { memo, useState  } from "react"
import { useAdminOrders, type AdminOrders } from "../../Contexts/AdminOrdersContext";
import { updateDoc,  doc } from "firebase/firestore";
import {db} from "../../Config/fireBase"
import { useUser } from "../../Contexts/UserContext";



const OrderCard = ({order} : {order : AdminOrders}) => {


    const [showModif, setShowModif] = useState(false);

    const {setLoadingAdminOrders} = useAdminOrders();
    const {user, setUser} = useUser();
    const {adminOrders, setAdminOrders} = useAdminOrders();
       const date = new Date(order.order.orderDate);

       


        const options : Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }; // jour et mois complet
        const formattedDate = date.toLocaleDateString('en-US', options);

        function calculateDeliveryDate(orderDate : string, delayDays : number) {
    const date = new Date(orderDate);           // Convertir la chaîne en Date
    date.setDate(date.getDate() + delayDays);  // Ajouter les jours

    // Format jour et mois en anglais
    const options : Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    let formattedDate = date.toLocaleDateString('en-GB', options); // "25 August"

   
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return formattedDate;
}


     if(!user) return null;



    return(
        <div className="flex flex-col bg-blue-50 border-2 border-blue-400 shadow-2xl shadow-blue-400 w-[700px] rounded-lg max-[800px]:w-[500px] max-[600px]:w-[300px]">
            <div className="flex gap-1 flex-col w-full border-b-2 border-b-blue-400 p-5">
                <p>- user : {order.userName}</p>
                <p className="max-[800px]:w-[200px]">- UserId : {order.userId}</p>
                <p className="max-[800px]:w-[200px]">- OrderId : {order.order.orderId}</p>
                <p>- Date : {formattedDate}</p>
                <p>- Delivery Date : {calculateDeliveryDate(order.order.orderDate, order.order.order.deliveryOption.delayDays)}</p>
                <p>- Delivery option : {order.order.order.deliveryOption.id}</p>
                <p>- Shipping : {order.order.order.deliveryOption.price} Dzd</p>
            </div>

           <div>
             <div className="flex flex-col gap-2">
            {order.order.order.books.map((b)=>{
              return(
                <div className="flex flex-row justify-between items-center p-4 max-[800px]:flex-col max-[800px]:justify-center max-[800px]:items-center">
                  <img src={b.image} alt={b.title} className="w-[70px] h-[120px] object-contain"/>
                  <div>
                    <p className="max-[800px]:text-center font-bold">{b.title}</p>
                    <p className="max-[800px]:text-center ">{b.price} Dzd</p>
                    
                  </div>

                  <div>
                    <p className="max-[800px]:text-center ">Discount Price : {b.disprice} Dzd</p>
                    <p className="max-[800px]:text-center ">Quantity : {b.quantity}</p>
                  </div>
                </div>
              )
            })}
              </div>

              <div className="flex flex-row items-center  justify-between border-t-2 border-t-blue-400 px-2 max-[800px]:flex-col">
                <p className="font-bold mt-3 mb-3">Status : {order.order.status}</p>

                {showModif && 
                   <select 
                   name="" 
                   id=""
                   className="border-2 border-blue-500 w-[180px] p-1 rounded-[5px] mb-3 cursor-pointer bg-blue-100 "
                   value={order.order.status}
                   onChange={async(e : React.ChangeEvent<HTMLSelectElement>)=>{

                    const value = e.target.value;

                    if(!value || value === ""){
                      return null;
                    }
                    setLoadingAdminOrders(true);
                    

                 try{
                    const newAdminOrders = adminOrders.map((o)=>{
                       if(order.id === o.id){
                        return{
                          ...o,
                          order : {
                            ...order.order,
                            status : value
                          }
                        };
                       }

                       return o;
                    });

                    
                    setAdminOrders(newAdminOrders);

                    const orderRef = doc(db, "orders", order.id);

                    await updateDoc(orderRef, {
                      
                      order: {
                        ...order.order,
                        status : value
                      }
                    });

                    const newOrders = user.orders.map((o)=>{
                      if(o.orderId === order.order.orderId){
                        return{
                          ...o,
                           status : value,
                           
                        }
                      }

                      return o;
                    });

                    setUser({
                      ...user,
                      orders : newOrders
                    });

                    const userRef = doc(db, "users", user.id);

                    await updateDoc(userRef, {
                       orders : newOrders
                    });

                   // updateAfterDelivering();

                   if(value === "Delivered"){


                    if(!user) return null;
                    const newOrders = user.orders.filter((o)=> o.orderId !== order.order.orderId);

                    setUser({
                     ...user,
                     orders : [...newOrders]
                    });

                    const userRef = doc(db, "users", user.id);

                    await updateDoc(userRef, {
                      orders : [...newOrders]
                    })
                   }
                
                
                  }catch(err){
                    console.error('Error in Modifying the order status : ', err);
                  }finally{
                    setLoadingAdminOrders(false);
                  }


                   }}
                   >
                     <option value="Preparing">Preparing</option>
                     <option value="Shipped">Shipped</option>
                     <option value="Delivered">Delivered</option>
                     <option value="Canceled">Canceled</option>
                   </select>
                }
                <button onClick={()=> setShowModif(prev => !prev)} className="bg-blue-500 h-[30px] px-3 text-white rounded-3xl text-[0.9em] cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50 font-bold max-[800px]:mb-5">Modify Status</button>
              </div>
           </div>

            <div className="border-t-2 border-t-blue-400">
                <p className="p-2 font-bold">
                Total Price  : {order.order.price} Dzd
                </p>
            </div>
        </div>
    )
}

export default memo(OrderCard);