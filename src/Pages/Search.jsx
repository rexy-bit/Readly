
import { useSearchContext } from "../Contexts/SearchContext";
import BookCard from "../Components/BookCard";
import data from "../data";
export default function Search(){

    const {search} = useSearchContext();

    if(!search) return <h1 className="text-[20px] text-center mt-10">Not found.</h1>

    let trouve = false;
          return(
            <>
            <div className="w-full flex flex-wrap justify-center items-center gap-[30px] mt-10 mb-30">
            {data.map((book)=>{

                let keyWordCheck = book.keyWords.some((keyWord)=> keyWord.toLowerCase().includes(search.toLowerCase()));

                if(book.titre.toLowerCase().includes(search.toLowerCase()) || book.auteur.toLowerCase().includes(search.toLowerCase()) || book.categorie.toLowerCase().includes(search.toLowerCase()) || keyWordCheck){
                    trouve = true;
                return(
               <BookCard
               book={book}
               key={book.code}
               />
                )
            }
           })
        
        }
        </div>

        {!trouve && 
            <h1 className="text-[20px] text-center">Not found.</h1>
        }
    </>
        

        )
}