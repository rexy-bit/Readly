import { memo } from "react";
import Header from "../Components/Header"
import Books from "../Components/StoreComponents/Books"
import FilterComponent from "../Components/StoreComponents/FilterComponent";
import { useSearch } from "../Contexts/SearchContext";
import { usePopUp } from "../Contexts/PopUpContext";
import PopUp from "../Components/StoreComponents/PopUp";
import { useUser } from "../Contexts/UserContext";


const Store = () => {

  const {showPopUp} = usePopUp();
  const {user} = useUser();
    return(

        <>
        

          <section className="flex flex-col justify-center items-center mt-7">

             <FilterComponent/>
            <h1 className="text-[2em] text-blue-500 font-black underline mt-5">Store</h1>

               <Books/>

               {showPopUp && !user && <PopUp/>}
          </section>
        </>
    );
}

export default memo(Store);