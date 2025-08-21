
import { memo ,useState, useEffect} from "react";
import type { Book } from "../../Contexts/BooksContext";
import { Link, useNavigate } from "react-router-dom";
import { useDescription } from "../../Contexts/DescriptionContext";
import { useUser } from "../../Contexts/UserContext";
import { usePopUp } from "../../Contexts/PopUpContext";

const BookCard = ({book} : {book : Book}) => {

    const {setDescriptionBook} = useDescription();
    const navigate = useNavigate();

    const {showPopUp,setShowPopUp} = usePopUp();

    const {addToCart} = useUser();
    const [msg, setMsg] = useState({show : false, text : "", color : 'red'});


        const {user} = useUser();

        const handleAddToCart = (book : Book) => {
            if(!user){
                setShowPopUp(true);

            }else{
                addToCart(book, setMsg);
            }
            
        }

    return(
        <div className="flex flex-col w-[230px] justify-center items-center shadow-2xl shadow-blue-400 rounded-lg transition-transform duration-300 hover:scale-105"
        
        >
            <Link onClick={()=> setDescriptionBook(book)} to="/description">
                <img src={book.image} alt={book.title} className="w-[170px] h-[250px] object-contain mt-3 transition-opacity duration-200 hover:opacity-80 active:opacity-60"/>

                
                
            </Link>

            <div className="flex flex-col justify-center items-center mt-3 w-full px-2">
                <Link onClick={()=> setDescriptionBook(book)} to="/description"><p className="text-blue-950 font-black transition-opacity duration-200 hover:opacity-80 active:opacity-60 text-center">{book.title}</p></Link>
                <p className="text-[1.1em] font-bold">Da {book.price}</p>

                <div className="h-[30px] w-full">
                    {msg.show && 
                       <p style={{color : msg.color}} className="text-[1em] font-bold">{msg.text}</p>
                     }
                </div>
                <button className="mt-3 bg-blue-500 text-white w-full mb-3 h-[40px] rounded-lg font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=> handleAddToCart(book)}>Add to Cart</button>
            </div>
        </div>
    )
}

export default memo(BookCard);