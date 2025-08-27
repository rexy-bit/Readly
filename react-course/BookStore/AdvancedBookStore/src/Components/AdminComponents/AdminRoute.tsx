import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";
import AdminHeader from "../../Pages/AdminPages/AdminHeader";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, initializing } = useUser();

  if (initializing) return <div>Chargement...</div>;

 if(!user || user.role !== "admin"){
  return <Navigate to="/" replace/>
 } 

  return <>
    {children}
  </>; // ok admin
}
