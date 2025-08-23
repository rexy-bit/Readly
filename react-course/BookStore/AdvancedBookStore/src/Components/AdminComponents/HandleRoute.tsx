import { Navigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";



export default function HandleRoute({
  children,

}: {children : React.ReactNode}) {
  const { user, initializing } = useUser(); // récupère l'utilisateur global

  if (initializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if(!user || user.role === "user"){
    return <Navigate to="/" replace/>
  }


  

  return <>{children}</>; // Rend le composant enfant
}
