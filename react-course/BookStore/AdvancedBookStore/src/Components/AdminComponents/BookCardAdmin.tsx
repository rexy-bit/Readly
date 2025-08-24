import { useNavigate } from "react-router-dom";
import type { Book } from "../../Contexts/BooksContext";
import { memo, useEffect, useState } from "react";
import DeletePop from "./DeletePop";


const BookCardAdmin = ({book} : {book : Book}) => {
 
    const navigate = useNavigate();

    const [loadingDelete, setLoadingDelete] = useState(false);

    const [showDeletePop, setShowDeletePop] = useState(()=>{
        const saved = localStorage.getItem('saved');

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem('showDeletePop', JSON.stringify(showDeletePop));
    },[showDeletePop]);


    return(
        <>
        <div className="flex flex-row justify-between items-center p-2 border border-gray-300 rounded-lg w-[800px] max-[850px]:w-[600px] max-[650px]:flex-col max-[650px]:w-[320px] max-[650px]:gap-4">
            <img src={book.image} alt={book.title} className="w-[70px] h-[120px] object-contain "/>

            <div className="w-[150px] text-center"><span className="font-black text-blue-500">{book.title}</span> by <span className="font-bold text-blue-500">{book.author}</span></div>

           <div className="flex flex-col leading-5">
            <p>price : {book.price} Dzd</p>
            <p>stock : {book.stock}</p>
            <p className="w-[150px]">Discount price : {book.disprice} Dzd</p>
           </div>

           <div className="flex flex-row justify-center items-center gap-2 max-[850px]:flex-col">

            <button className="bg-blue-400 text-white font-bold h-[30px] w-[90px] rounded-3xl cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=>navigate(`/admin/modify/${book.id}`)}>Modify <i className="fa-solid fa-pen-to-square"></i></button>

            <button className="bg-red-500 text-white font-bold w-[90px] h-[30px] rounded-3xl cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=> setShowDeletePop(true)}>Delete <i className="fa-solid fa-trash"></i></button>
           </div>
        </div>

        {showDeletePop &&
          <DeletePop book={book} setShowPop={setShowDeletePop} setLoadingDelete={setLoadingDelete}/>
        }

        {
            loadingDelete && 

                    <div className="flex justify-center mt-20">
          <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
        </div>
        }
        </>
    )
}

export default memo(BookCardAdmin);