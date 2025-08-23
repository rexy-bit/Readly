import { Navigate } from "react-router-dom";
import { useUser, type UserType } from "../../Contexts/UserContext";

export default function PrivateRoute({children, role} : {children : React.ReactNode, role : string}){
    const { user, initializing } = useUser();
    
   
  
    if (initializing) {
     
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Chargement...</div>
            </div>
        );
    }
    

   
    if(user?.role === role){
        
        return <Navigate to="/admin/dashboard" replace/>
    }

   

   
    return <>{children}</>
}