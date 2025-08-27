import { memo , useEffect} from "react"
import { useAdminOrders } from "../../Contexts/AdminOrdersContext";
import OrderCard from "../../Components/AdminComponents/OrderCard";
import SearchOrdersHeader from "../../Components/AdminComponents/SearchOrdersHeader";
import { onSnapshot, query, orderBy, collection } from "firebase/firestore";
import {db} from '../../Config/fireBase'
import { useSearchOrders } from "../../Contexts/SearchOrdersContext";

const AdminOrders = () => {

    const {adminOrders, loadingAdminOrders, setAdminOrders} = useAdminOrders();

    if(loadingAdminOrders){
        return(
            <div className="flex justify-center mt-20">
                  <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
               </div>
        );
    }

    const {search} = useSearchOrders();

     

              useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc") // tri par la date la plus récente
    );

    // listener Firebase
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAdminOrders(orders);
    });

    // cleanup
    return () => unsubscribe();
  }, [setAdminOrders]);

  let searchOrders;

    if(search && search !== ""){
        searchOrders = adminOrders.filter((o)=> o.order.orderId.includes(search) || o.id.includes(search) || o.userName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || o.userId.includes(search));
    }
    return(
        <section className="flex flex-col justify-center items-center">
            <h1 className="text-[1.7em] font-black text-blue-500 underline mt-7">Orders Section</h1>

            {adminOrders.length === 0 
               ?
                 <h1 className="text-blue-500 font-bold mt-15">No orders</h1>
                 : 
                    
                    <div className="mt-10">
                        <SearchOrdersHeader/>

                      {search && search !== "" ?
                           searchOrders?.length === 0 ?
                               <div className="mt-10 text-blue-500 font-bold text-center">Not found</div>
                               :  <div className="flex flex-col gap-5 justify-center items-center mt-10 mb-10">
                                {searchOrders?.map((order)=>{
                            return(
                              <OrderCard 
                              order={order}
                              key={order.id}
                              />
                               
                            )
                        })}
                                </div>
                                :
                        <div className="flex flex-col gap-5 justify-center items-center mt-10 mb-10">
                        {adminOrders.map((order)=>{
                            return(
                              <OrderCard 
                              order={order}
                              key={order.id}
                              />
                               
                            )
                        })}
                      
                        </div>}
                    </div>

            }
        </section>
    )

    
    
}

export default memo(AdminOrders);