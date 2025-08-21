import { useBooks } from "../../Contexts/BooksContext"
import BookCard from "./BookCard";


const Books = () => {

    const {books, loading} = useBooks();

    return(
        loading 

         ?
           <div><i className="fa-solid fa-book fa-spin-pulse mt-10 text-[3em] text-blue-500"></i></div>
           : 
            <div className="flex flex-wrap px-10 gap-10 justify-center items-center mt-10">
         {books.map((book)=>{

            return(
                <BookCard
                  book={book}
                  key={book.id}
                />
            )
         })}
       </div>
        
      
    );
}

export default Books;