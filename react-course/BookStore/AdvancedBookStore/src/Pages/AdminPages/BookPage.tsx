import  { memo } from "react";
import BookCardAdmin from "../../Components/AdminComponents/BookCardAdmin";
import SecondHeader from "../../Components/AdminComponents/SecondHeader"
import { useBooks } from "../../Contexts/BooksContext"

import { useAdminSearch } from "../../Contexts/AdminSearchContext";





const BookPage = () => {

    const {books} = useBooks();

    const {search} = useAdminSearch();

    let searchBooks;

    if(search){
        searchBooks = books.filter((b)=> b.title.toLocaleLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()) || b.categorie.toLowerCase().includes(search.toLowerCase()) || b.keyWords.some((kw) => kw.toLowerCase().includes(search.toLowerCase())));
    }

    return(
        <section className="flex flex-col mt-10 justify-center items-center">

            <h1 className="text-[1.8em] font-black underline text-blue-500">Your Books :</h1>

             <SecondHeader/>
             {!search && search !== "" ?
             <div className="flex flex-col gap-2 mt-5 mb-10">
             {books.map((b)=>{
                return(
                    <BookCardAdmin
                    book={b}
                    key={b.id}
                    />
                )
             })}
            </div>
                 : 
                  <div className="flex flex-col gap-2 mt-5 mb-10">
                    {searchBooks?.map((b)=>{
                                    return(
                                        <BookCardAdmin
                                        book={b}
                                        key={b.id}
                                        />
                                    )
                                })}
                  </div>
             }
             


             

             
        </section>
    )
}

export default memo(BookPage);