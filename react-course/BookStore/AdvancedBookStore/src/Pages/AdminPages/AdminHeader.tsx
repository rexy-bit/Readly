
import { Link } from "react-router-dom"
import { memo, useEffect, useState } from "react";
const AdminLayout = () => {

    const [showNav, setShowNav] = useState<boolean>(()=>{
        const saved = localStorage.getItem('showNav');

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem('showNav', JSON.stringify(showNav));
    }, [showNav]);


    return(
      

            <header className="flex flex-row justify-between w-full top-0 fixed h-[55px] items-center px-2 bg-blue-400 text-white">
                <h1 className="text-[1.5em] font-bold">Readly Admin Panel</h1>

            <nav className="flex flex-row justify-center items-center gap-5 max-[700px]:hidden">
                <Link to="/admin/books" className="linkNav">Books</Link>
                <Link to="/admin/dashboard" className="linkNav">Dashboard</Link>
                <Link to="/admin/orders" className="linkNav">Orders</Link>
                <Link to="/admin/users" className="linkNav">Users</Link>
                <Link to="/admin/profile" className="linkNav" aria-label="Profile"><i className="fa-solid fa-user"></i></Link>
            </nav>

                        <div className="hidden max-[700px]:block text-[1.8em] font-black text-white cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=>{setShowNav(prev=> !prev)}}>&#9776;</div>

                    {showNav && 
                      <nav className="hidden absolute top-15 max-[700px]:flex flex-col bg-blue-400 p-3 rounded-lg right-1 w-[130px] z-50 gap-3">
                        
                          <Link to="/admin/books" className="linkNav">Books</Link>
                        <Link to="/admin/dashboard" className="linkNav">Dashboard</Link>
                        <Link to="/admin/orders" className="linkNav">Orders</Link>
                        <Link to="/admin/users" className="linkNav">Users</Link>
                        <Link to="/admin/profile" className="linkNav" aria-label="Profile"><i className="fa-solid fa-user"></i></Link>

                      </nav>
                    }
            </header>

            
        
    )
}

export default memo(AdminLayout);