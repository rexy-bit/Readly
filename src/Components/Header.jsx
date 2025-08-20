import React from "react";
import {Link} from "react-router-dom"
import cartIcon from "../assets/cart.svg"
import bookIcon from '/book.svg'
import { useSearchContext } from "../Contexts/SearchContext";
import { useCartContext } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
export default function Header(){

  
      const {search, setSearch} = useSearchContext();
      const {cart} = useCartContext();
      const navigate = useNavigate();

      function saveSearch(e){
          e.preventDefault();

          const formData = new FormData(e.target);

          const searchInput = formData.get('search');

          if(!searchInput){
            return;
          }
        
          setSearch(searchInput);
          e.target.reset();

          navigate("/search");
      }

    return(
        <header className="z-99 flex flex-row justify-between items-center lg:px-6 bg-yellow-400 h-[60px] top-0 fixed w-full shadow-xl md:px-2 sm:px-1 max-[450px]:px-2 max-[600px]:px-1">
            <Link to="/">
          <h1 className="border border-transparent flex flex-row items-center justify-center text-white text-[1.7em] font-black gap-2 box-border hover:border-white max-[800px]:text-[1.3em]  max-[800px]:gap-1 max-[450px]:text-[1em]">
            
             <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-11 h-11 text-white hidden min-[600px]:block max-[800px]:w-8"
                >
                <path
                    fillRule="evenodd"
                    d="M6 4a2 2 0 00-2 2v12a2 2 0 002 2h13a1 1 0 100-2H6a1 1 0 010-2h13V6a2 2 0 00-2-2H6zm11 4H8V6h9v2z"
                    clipRule="evenodd"
                />
                </svg>
        Booky</h1></Link>

     <form className="flex flex-row gap-0 justify-center items-center" onSubmit={saveSearch}>
        <input 
        type="text"
        placeholder="Search"
        className="border border-gray-300 bg-gray-50 px-[15px] py-[5px] lg:w-150 rounded-3xl w-100 max-[450px]:w-45 max-[600px]:w-55 max-[400px]:w-40"
        name ="search"
        

        />

          <button className="py-5px bg-yellow-200 h-9 w-15 text-[18px] font-bold rounded-r-3xl ml-[-35px] border-1 border-yellow-50 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-105 max-[450px]:w-10" type="submit">&#10137;</button>
      </form>

     <nav className="flex flex-row items-center justify-center gap-0 text-[18px] ">

      <Link to="/order"><div className=" px-2 py-2 hover:border-1 border-white text-white font-bold max-[700px]:text-[14px]">Orders</div></Link>

       <Link to="/cart" className="relative">
         <img src={cartIcon} alt="cart icon" className="w-16 border-1 border-transparent hover:border-white px-2  max-[400px]:w-14"/>
          <p className="absolute top-[8px] text-white right-[27px] text-[13px] font-bold max-[400px]:right-[25px] max-[400px]:top-[6px]">{cart.length}</p>
       </Link>
     </nav>
        </header>
    );
}