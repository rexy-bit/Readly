import { Outlet } from "react-router-dom";
import Header from "../Components/Header";


export default function PublicLayout() {
  return (
    
    <>
     <Header/>
      <main>
        <Outlet />
      </main>
    </>
  );
}
