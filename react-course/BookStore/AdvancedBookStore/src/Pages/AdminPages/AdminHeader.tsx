
import { Link } from "react-router-dom"
import { memo } from "react";
const AdminLayout = () => {

    return(
        <div>

            <header>
                <h1>Readly Admin Panel</h1>

            <nav className="flex flex-row justify-center items-center gap-5 max-[700px]:hidden">
                <Link to="/admin/books" className="linkNav">Books</Link>
                <Link to="/admin/dashboard" className="linkNav">Dashboard</Link>
                <Link to="/admin/orders" className="linkNav">Orders</Link>
                <Link to="/admin/users" className="linkNav">Users</Link>
                
            </nav>
            </header>

            
        </div>
    )
}

export default memo(AdminLayout);