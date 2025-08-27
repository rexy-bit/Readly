import { createContext ,  useState, useEffect,type ReactNode, useContext} from "react";

import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import {db} from "../Config/fireBase"

export interface Book{
    id : string;
    title : string;
    author : string;
    description : string;
    rating : number;
    price : number;
    disprice : number;
    image : string;
    addedDate : string;
    keyWords : string[];
    categorie : string;
    stock : number;


}

interface BookContextType{
    books : Book[];
    loading : boolean;
    setBooks : (b : Book[]) => void;

}
const BooksContext = createContext<BookContextType | null>(null);

export const BooksProvider = ({children} : {children : ReactNode}) => {

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    
    const getBooksFromFireBase = async() => {
         const booksCollectionRef = collection(db, "books");
        setLoading(true);
        try{

            const data = await getDocs(booksCollectionRef);
          

            const filteredData : Book[] = data.docs.map((doc)=> {
 
                return{
                ...(doc.data() as Omit<Book, "id">),
                id : doc.id
                }
                
            });

        
            setBooks(filteredData);
           
        }catch(err){
            console.log('Error in fetching books from fireBase : ', err);
        }finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
      getBooksFromFireBase();  
    }, []);



    return(
        <BooksContext.Provider value={{books, loading, setBooks}}>
            {children}
        </BooksContext.Provider>
    )
}


export const useBooks = () => {
    const context = useContext(BooksContext);

     if (!context){
       throw new Error("useBooks must be used within a BooksProvider");
     }

  return context;
}
