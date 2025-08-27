import { memo, use, useEffect, useState } from "react";
import { useUser, type UserType } from "../../Contexts/UserContext";
import { deleteDoc, doc } from "firebase/firestore";

import { useSearch } from "../../Contexts/SearchContext";
import DeleteUserPop from "./DeleteUserPop";



const UserComponent = ({user} : {user : UserType}) => {

   
    const [showDelete, setShowDelete] = useState(()=>{
        const saved = localStorage.getItem("showDelete");

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem("showDelete", JSON.stringify(showDelete));
    }, [showDelete]);
    



    return(
        <>
        <div className="w-[1000px] flex flex-row justify-between bg-blue-100 h-[50px] items-center px-4 rounded-3xl max-[1050px]:flex-col max-[1050px]:w-[500px] max-[1050px]:h-[300px] p-5 max-[550px]:w-[250px] max-[1050px]:gap-2">
            
            <p className="font-bold">{user.name}</p>
            <p>{user.email}</p>
            <p className="max-[550px]:text-[0.9em] max-[550px]:text-center">id : {user.id}</p>
            <p>role : {user.role}</p>
            <button onClick={()=> setShowDelete(true)} className="bg-red-600 text-white w-[80px] h-[30px] rounded-3xl font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">Delete</button>
            
        </div>

         {showDelete && 
             <DeleteUserPop
             setShowDelete={setShowDelete}
             user={user}
             />
         }
        </>
    )
}

export default memo(UserComponent);