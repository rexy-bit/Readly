import { Navigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";

export default function UserRoute({ children }: { children: React.ReactNode }) {
  const { user, initializing } = useUser();

  if (initializing) return <div>Chargement...</div>;

    if(user && user.role === "admin"){
      return <Navigate to="/admin/dashboard"/>
    } 

  return <>{children}</>;
}
