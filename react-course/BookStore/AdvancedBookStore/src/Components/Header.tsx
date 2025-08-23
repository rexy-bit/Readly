import { memo, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSearch } from "../Contexts/SearchContext";
import { useUser } from "../Contexts/UserContext";
import { useCartContext } from "../Contexts/CartContext";


const Header = () => {

    const [showNav, setShowNav] = useState<boolean>(()=>{
        const saved = localStorage.getItem('showNav');
        
        return saved ? JSON.parse(saved) : false;
    });



    const {user} = useUser();
    const {calculateTotalCartItems} = useCartContext();

    useEffect(()=>{
        localStorage.setItem('showNav', JSON.stringify(showNav));
    }, [showNav]);

    const navigate = useNavigate();

    const {setSearch} = useSearch();

    const handleSubmitForm = (e : React.ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const searchInput = formData.get("search") as string | null;
        
        if(!searchInput) return;

        setSearch(searchInput);

        navigate("/search");

    }

    return(
        <header className="flex flex-row w-full justify-between items-center top-0 fixed px-2 h-[55px] shadow-xl z-50 bg-white max-[500px]:px-1">
            <h1 className="text-[1.7em] font-bold text-blue-500 max-[850px]:text-[1.4em]"><Link to="/">Readly</Link></h1>

          
          <form onSubmit={handleSubmitForm} className="relative">

            <input 
            type="text"
            placeholder="Search Books, Authors..."
            name="search"
            className="w-[400px] border border-gray-400 px-3 h-[40px] rounded-3xl p-3 pr-17 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 max-[850px]:w-[300px] max-[500px]:w-[200px] max-[500px]:h-[37px]"
            />

            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white cursor-pointer py-1 w-[35px] rounded-full hover:bg-blue-600"><i className="fa-solid fa-magnifying-glass"></i>
            </button>

            </form>

            <nav className="flex flex-row justify-center items-center gap-5 max-[700px]:hidden">
                <Link to="/" className="linkNav">Home</Link>
                <Link to="/store" className="linkNav">Books</Link>
                <Link to="/profile" className="linkNav" aria-label="Profile"><i className="fa-solid fa-user"></i></Link>
                <Link to="/cart" className="linkNav relative" aria-label="Cart"><i className="fa-solid fa-bag-shopping"></i> <span>{!user ? "0" : calculateTotalCartItems(user.cart)}</span></Link>
                <Link to="/orders" className="linkNav">Orders</Link>
            </nav>

            <div className="hidden max-[700px]:block text-[1.8em] font-black text-blue-500 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=>{setShowNav(prev => !prev)}}>&#9776;</div>

            {showNav && (
                <nav className="hidden absolute top-15 max-[700px]:flex flex-col bg-blue-400 p-3 rounded-lg right-1 w-[130px] z-50 gap-3">
                <Link to="/" className="secondLink">Home</Link>
                <Link to="/store" className="secondLink">Books</Link>
                <Link to="/profile" className="secondLink" aria-label="Profile"><i className="fa-solid fa-user mr-2"></i> Account</Link>
                <Link to="/cart" className="secondLink" aria-label="Cart"><i className="fa-solid fa-bag-shopping"></i> <span>{!user ? "0" : calculateTotalCartItems(user.cart)}</span> Cart</Link>
                <Link to="/orders" className="secondLink">Orders</Link>
                </nav>
            )}
        </header>
    );
}


export default memo(Header);