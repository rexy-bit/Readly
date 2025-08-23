// layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminHeader from "../Pages/AdminPages/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminHeader /> 
      <main className="">
        <Outlet /> {/* Ici s'afficheront les pages admin */}
      </main>
    </div>
  );
}
