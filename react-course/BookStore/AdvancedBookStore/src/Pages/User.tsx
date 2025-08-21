import  { memo } from "react";
import Header from "../Components/Header";
import { useUser } from "../Contexts/UserContext"


const User = ()=> {

    const {user, SignInWithGoogle, loading, logOut, initializing} = useUser();

     if (initializing) {
    return (
      <>
        <Header />
        <div className="flex justify-center mt-13">
          <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
        </div>
      </>
    );
  }

    if(!user) return(
        <>
         
          <Header/>

          {loading ? 
            <div className="flex justify-center"><i className="fa-solid fa-book fa-spin-pulse mt-13 text-[3em] text-blue-500"></i></div> : 
          <section className="flex flex-col justify-center items-center">
            <div className="w-[600px] max-[650px]:w-[300px] text-center mt-10">
                Welcome to Readly! Create your free account today to unlock the full experience: save your favorite books to your cart, place and track your orders, and enjoy a personalized reading journey. Sign up or log in now to start exploring and ordering your next favorite book!
            </div>

            <button className="px-4 h-[40px] bg-blue-500 text-white rounded-[5px] cursor-pointer font-bold transition-opacity duration-200 hover:opacity-80 active:opacity-60 mt-5" onClick={SignInWithGoogle}>Sign In with Google <i className="fa-brands fa-google"></i></button>
          </section>}

        </>
    )

    return(
        <>
          
          <Header/>
           <section className="flex flex-col justify-center items-center">

             {loading ? 
                <div className="flex justify-center"><i className="fa-solid fa-book fa-spin-pulse mt-13 text-[3em] text-blue-500"></i></div>
                :<>
             <div className="flex flex-col justify-center items-center gap-3 mt-10 border-2 border-blue-500 p-2 rounded-xl mb-4 max-[500px]:w-[300px]">
                <div>
                    <i className="fa-solid fa-user text-[3em] text-blue-500"></i>
                </div>
                <div className="flex flex-col justify-center ">
                 <p>Name : {user.name}</p>
                 <p>Email : {user.email}</p>
                 <p>Cart : {user.cart.length}</p>
                 <p>Order : {user.orders.length}</p>
                 </div>
             </div>

             <button onClick={logOut} className="px-3 bg-blue-500 text-white h-[40px] rounded-lg cursor-pointer font-bold transition-opacity duration-200 hover:opacity-80 active:opacity-60">Log out</button>
             </>
           }
           </section>
        </>
    );
}

export default memo(User);