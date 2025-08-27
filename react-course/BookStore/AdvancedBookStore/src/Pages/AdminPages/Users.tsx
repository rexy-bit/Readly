import { useUser } from "../../Contexts/UserContext"
import { memo, use } from "react";

import UserComponent from "../../Components/AdminComponents/UserComponent";
import SearchUsers from "../../Components/AdminComponents/SearchUsers";
import { useUserSearchContext } from "../../Contexts/SearchUsersContext";

const Users = () => {

    const {users, loadingUsers} = useUser();
    const {search, setSearch} = useUserSearchContext();

    if(loadingUsers) return(
        <div className="flex justify-center">
        <i className="fa-solid fa-book fa-spin-pulse mt-13 text-[3em] text-blue-500"></i>
                </div>
    )

    let searchUsers;

    if(search){
        searchUsers = users.filter((user)=> user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || user.email?.includes(search) || user.id.includes(search));
    }

    return(
        <section className="flex flex-col justify-center items-center">
              <h1 className="text-[2.2em] underline font-black text-blue-500 mt-10">Users</h1>
             <SearchUsers/>

          {
             searchUsers?.length === 0 ?
                <div className="text-blue-500 mt-10 font-bold">Not found</div>
                : 
                  searchUsers?
                     <div className="flex flex-col justify-center items-center mt-10 gap-7 mb-10">
                  {searchUsers?.map((user)=>{
                    return(
                        <UserComponent
                        user={user}
                        />
                    )
                  })}
               </div>
              :
          
              users.length === 0 ?
               <div className="text-center mt-10 text-blue-500">
                  No users detected
               </div> : 
               
               <>

                

                

                 

               <div className="flex flex-col justify-center items-center mt-10 gap-7 mb-10">
                  {users.map((user)=>{
                    return(
                        <UserComponent
                        user={user}
                        />
                    )
                  })}
               </div>
               </>
          }
        </section>
    )
}

export default memo(Users);