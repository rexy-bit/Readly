import { useBeforeUnload } from "react-router-dom";
import Header from "../Components/Header";
import { useSearch } from "../Contexts/SearchContext"
import { useBooks } from "../Contexts/BooksContext";
import BookCard from "../Components/StoreComponents/BookCard";
import  { memo } from "react";


const Search = () => {

    const {search} = useSearch();
    const {books} = useBooks();

    if(!search || search === "") return(
        <>
       

        <h1>Not found</h1>
        </>
    )
   

    const filteredBooks = books.filter((b)=> b.title.toLocaleLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()) || b.categorie.toLowerCase().includes(search.toLowerCase()) || b.keyWords.some((kw) => kw.toLowerCase().includes(search.toLowerCase()))
);

    

    return(
        <>
          {filteredBooks.length === 0 
            ?
             <>
          
                <h1 className="text-center mt-10 text-blue-500">Not found</h1>
             </>
           
            : 
             <>
    

                <section className="flex flex-col justify-center items-center">
                    <h1 className="mt-10 text-[1.5em] text-blue-500 font-black underline">Search Result :</h1>
                    <div className="flex flex-wrap px-10 gap-10 justify-center items-center mt-10">
                    {filteredBooks.map((b)=>{
                        return(
                            <BookCard
                              book={b}
                            />
                        );
                    })}
                    </div>
                </section>
             </>
        }
         
        </>
    )
}


export default memo(Search);