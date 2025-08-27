import { deleteDoc, doc } from "firebase/firestore";
import { useUser, type UserType } from "../../Contexts/UserContext";
import { useSearch } from "../../Contexts/SearchContext";

import {db} from "../../Config/fireBase"
import { memo } from "react";

const DeleteUserPop = ({setShowDelete, user} : {setShowDelete : (s : boolean)=> void, user : UserType}) => {


    const {users, setUsers} = useUser();
        const DeleteUser = async() =>{

        try{

            const userDoc = doc(db, "users", user.id);
            await deleteDoc(userDoc);
            const newUsers = users.filter((u)=> u.id !== user.id);
            setUsers(newUsers);
            
        }catch(err){
            console.error('Error : ', err);
        }
        
    }
    return(
                   <section onClick={()=> setShowDelete(false)} className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
            <div className="flex flex-col justify-center items-center fixed top-30 bg-white w-[600px] rounded-xl max-[650px]:w-[300px]" onClick={(e) => e.stopPropagation()} >
                <p className="mt-7 w-[400px] text-center font-bold max-[650px]:w-[200px]">Are Are you sure to delete user : {user.name} ?</p>

                <div className="flex flex-row justify-center items-center mt-7 mb-10 gap-2">
                    <button onClick={()=>{
                        
                        DeleteUser();
                        setShowDelete(false);
                        
                    }} className="bg-blue-500 text-white font-bold px-2 h-[35px] rounded-lg cursor-pointer transition-colors border border-blue-500 duration-200 hover:bg-white hover:text-blue-500">
                        Yes, Delete
                    </button>

                    <button onClick={()=> setShowDelete(false)} className="bg-red-500 text-white font-bold h-[35px] px-2 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                        Cancel
                    </button>
                </div>

                <div className="flex justify-center items-center absolute top-0 text-[1.5em] h-[30px] w-[30px] bg-blue-500 rounded-full cursor-pointer text-white right-0 mt-[-10px] mr-[-10px] transition-colors duration-200 hover:bg-blue-400 active:bg-blue-300 z-100" onClick={()=>setShowDelete(false)}>&times;</div>
            </div>
        </section>
    )
}


export default memo(DeleteUserPop);