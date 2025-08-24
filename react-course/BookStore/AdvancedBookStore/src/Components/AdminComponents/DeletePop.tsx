import { memo } from "react"
import { useBooks, type Book } from "../../Contexts/BooksContext";
import { deleteDoc, doc } from "firebase/firestore";
import {db} from "../../Config/fireBase"

const DeletePop = ({setShowPop, book, setLoadingDelete}: {setShowPop : (s :boolean)=> void, book : Book, setLoadingDelete : (s :boolean)=> void}) => {

    
     const {books, setBooks} = useBooks();
    const deleteBook  = async () => {

        setLoadingDelete(true);
        try{
            const bookRef = doc(db, "books", book.id);
            await deleteDoc(bookRef);

            const updatedBooks = books.filter((b)=> b.id !== book.id);
            setBooks(updatedBooks);
        }catch(err){
            console.error('Error in deleting book : ', err);
            
        }finally{
            setLoadingDelete(false);
        }
    }

    return(
                  <section onClick={()=> setShowPop(false)} className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
            <div className="flex flex-col justify-center items-center fixed top-30 bg-white w-[600px] rounded-xl max-[650px]:w-[300px]" onClick={(e) => e.stopPropagation()} >
                <p className="mt-7 w-[400px] text-center font-bold max-[650px]:w-[200px]">Are Are you sure to delete : {book.title} ?</p>

                <div className="flex flex-row justify-center items-center mt-7 mb-10 gap-2">
                    <button onClick={()=>{
                        
                        deleteBook();
                        setShowPop(false);
                        
                    }} className="bg-blue-500 text-white font-bold px-2 h-[35px] rounded-lg cursor-pointer transition-colors border border-blue-500 duration-200 hover:bg-white hover:text-blue-500">
                        Yes, Delete
                    </button>

                    <button onClick={()=> setShowPop(false)} className="bg-red-500 text-white font-bold h-[35px] px-2 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                        Cancel
                    </button>
                </div>

                <div className="flex justify-center items-center absolute top-0 text-[1.5em] h-[30px] w-[30px] bg-blue-500 rounded-full cursor-pointer text-white right-0 mt-[-10px] mr-[-10px] transition-colors duration-200 hover:bg-blue-400 active:bg-blue-300 z-100" onClick={()=>setShowPop(false)}>&times;</div>
            </div>
        </section>
    )
}

export default memo(DeletePop);