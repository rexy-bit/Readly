import { memo } from "react";
import { useUser } from "../../Contexts/UserContext"
import { useNavigate } from "react-router-dom";



const AdminProfile = () => {
    const navigate = useNavigate();

    const {user, initializing, loading, logOut} = useUser();

    if(initializing || loading){
        return(
             <div className="flex justify-center">
                <i className="fa-solid fa-book fa-spin-pulse mt-13 text-[3em] text-blue-500"></i>
                </div>
        );
    }
    return(

       <section className="flex flex-col justify-center items-center">
         <h1 className="text-[1.9em] underline font-black text-blue-500 mt-10">Admin Profile</h1>
              
                     <div className="flex flex-col justify-center items-center gap-3 mt-10 border-2 border-blue-500 p-2 rounded-xl mb-4 max-[500px]:w-[300px]">
                <div>
                    <i className="fa-solid fa-user text-[3em] text-blue-500"></i>
                </div>
                <div className="flex flex-col justify-center ">
                 <p>Name : {user?.name}</p>
                 <p>Email : {user?.email}</p>
                 <p>Cart : {user?.cart.books.length}</p>
                 <p>Order : {user?.orders.length}</p>
                 </div>
             </div>

             <button onClick={()=>{
                logOut()
                navigate("/");
                
                }} className="px-3 bg-blue-500 text-white h-[40px] rounded-lg cursor-pointer font-bold transition-opacity duration-200 hover:opacity-80 active:opacity-60">Log out</button>
       </section>

    );
}


export default memo(AdminProfile);