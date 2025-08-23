import { Navigate } from "react-router-dom";
import { useUser, type UserType } from "../../Contexts/UserContext";

export default function PublicRoute({children, role} : {children : React.ReactNode, role : string}){
    const { user } = useUser();

    if(!user){
      return  <Navigate to="/" replace/>
    }
   
    if(user.role)
    if(user.role === role){
        return <Navigate to="/admin/dashboard" replace/>
    }
   

   
    return <>{children}</>
}