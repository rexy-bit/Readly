import { memo } from "react";
import Header from "../Components/Header"
import BookCard from "../Components/StoreComponents/BookCard";
import FilterComponent from "../Components/StoreComponents/FilterComponent"
import { useBooks } from "../Contexts/BooksContext";
import { useFilter } from "../Contexts/FilterContext"



const Filter = () => {

    const {categorie, setCategorie} = useFilter();
    const {books} = useBooks();

     const filteredBooks = categorie ?
                           books.filter((b)=> b.categorie.toLowerCase() === categorie.toLowerCase()) : books;
    return(

        <>
         
          <FilterComponent/>
        
          {!categorie || filteredBooks.length === 0 ? (
            <h1 className="text-center mt-5 font-bold text-[1.2em] text-blue-500">Categorie not found</h1>
          ) : (
            <section className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-[1.6em] text-blue-500 font-black underline">{categorie} Books</h1>
            <div className="flex flex-wrap px-10 gap-10 justify-center items-center mt-10">
              {filteredBooks.map((b)=>{
                return(
                    <BookCard book={b} key={b.id}/>
                )
              })}
            </div>
            </section>
          )}
        </>
    )
}


export default memo(Filter);