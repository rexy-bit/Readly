import { useNavigate, useParams } from "react-router-dom"
import { useBooks, type Book } from "../../Contexts/BooksContext";
import { memo, useEffect, useState,useRef } from "react";
import  { doc,updateDoc } from "firebase/firestore";
import {db} from '../../Config/fireBase'


const Modify = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [msg, setMsg] = useState({show : false, text : "", color : "red"});

    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    const {books, setBooks} = useBooks();
    const [book, setBook] = useState<Book|null>(null);

    const [loadingModif, setLoadingModif] = useState(false);
    useEffect(()=>{

        const findBook = books.find((b)=> b.id === id);

        setBook(findBook || null);

    },[id]);

    if(!book) return (
        <div className="flex justify-center mt-20">
          <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
        </div>
    )

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
         
        const {name, value,type} = e.target;

        //if(!book) return;

       

        setBook({
            ...book!,
            [name] : type === "number" ? Number(value) : value,
         });
    }

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(!book) return;

        if(!book.title || !book.author || !book.categorie || !book.price || !book.disprice || !book.stock || !book.description || !book.rating ){

            setMsg({
                show : true,
                text : 'Please enter all the information before submitting',
                color : "red"
            });

           
            if(timeoutId.current) clearTimeout(timeoutId.current);

            timeoutId.current = setTimeout(()=>{
                setMsg(prev => ({
                    ...prev,
                    show : false
                }));

            }, 1500);

            return;

            
            
        }

        setLoadingModif(true);
        try{
            const ref = doc(db, "books", book.id);
            await updateDoc(ref, {
                ...book
            });

            const updatedBooks = books.map((b)=> {
                if(b.id === id){
                    return{
                        ...book
                    }

                    
                }

                return b;
            });

            setBooks(updatedBooks);

            setMsg({
                show : true,
                text : "Modification done succesfuly you will be redirected to see the changes",
                color : "green"
            });

            if(timeoutId.current) clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(()=>{

                setMsg(prev => ({
                    ...prev,
                    show  : false
                }))

               navigate("/admin/books");
            },3000);

      

        }catch(err){
            console.error("Error in Modifying the Book : ", err);
        }finally{
            setLoadingModif(false);
        }


    }




    return(

        <section className="flex flex-col justify-center items-center">
            <h1 className="text-[1.8em] font-black text-blue-500 mt-10 underline">Modify Page</h1>

            {loadingModif ?
                 <div className="flex justify-center mt-20">
                  <i className="fa-solid fa-book fa-spin-pulse text-[3em] text-blue-500"></i>
               </div> : 
            <div className="flex flex-col justify-center items-center">
                <h1 className=" text-[1.5em] font-bold text-blue-500 mt-5 underline">Modify Form</h1>

                <form onSubmit={handleSubmit} className="mt-10 
                flex flex-col justify-center items-center p-5 border border-blue-300 rounded-lg bg-blue-100 w-[700px] gap-5 mb-20">
                    <div className="flex flex-row justify-center items-center gap-5">

                    <p className="font-bold">Title :</p>
                    <input 
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="formInput"

                    />
                     </div>

                   <div className="flex flex-row justify-center items-center gap-5">

                    <p className="font-bold">Author :</p>
                    <input 
                    type="text" 
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    placeholder="author"
                    className="formInput"
                    />

                    </div>

                  <div className="flex flex-row justify-center items-center gap-5">
                    <p className="font-bold">Categorie :</p>
                    <select 
                    name="categorie" 
                    value={book.categorie}
                    onChange={handleChange}
                    className="formInput"
                    id="">
                        <option value="fiction">Fiction</option>
                        <option value="literature">Literature</option>
                        <option value="history">History</option>
                        <option value="biographies">Biographies</option>
                        <option value="developement">Developement</option>
                        <option value="education">Education</option>
                        <option value="science">Science</option>
                        <option value="business">Business</option>
                        <option value="children">Children</option>
                    </select>

                  </div>

                  <div className="flex flex-row justify-center items-center gap-5">

                    <p className="font-bold">Description :</p>
                    <textarea 
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                    className="formInput"
                    />

                    </div>

                <div className="flex flex-row justify-center items-center gap-5">
                    <p className="font-bold">Price :</p>
                    <input 
                    type="number"
                    placeholder="price"
                    name="price"
                    value={book.price}
                    onChange={handleChange}
                    className="formInput"
                    />

                </div>

                <div className="flex flex-row justify-center items-center gap-5">
                    <p className="font-bold">Disprice :</p>
                     <input 
                    type="number"
                    placeholder="price"
                    name="disprice"
                    value={book.disprice}
                    onChange={handleChange}
                    className="formInput"
                    />
                </div>

                <div className="flex flex-row justify-center items-center gap-5">
                    <p className="font-bold">Stock :</p>
                     <input 
                    type="number"
                    placeholder="Stock"
                    name="stock"
                    value={book.stock}
                    onChange={handleChange}
                    className="formInput"
                    />

                </div>

                <div className="flex flex-row justify-center items-center gap-5">
                    <p className="font-bold">Rating :</p>
                      <input 
                    type="number"
                    placeholder="Rating/5"
                    step="0.1"
                    max={5}
                    min={0}
                    name="rating"
                    value={book.rating}
                    onChange={handleChange}
                    className="formInput"
                    />
                </div>
                    <div className="flex flex-col justify-center items-center mt-2">
                        <img src={book.image} alt={book.title} className="w-[100px] h-[150px]"/>
 
                       <div className="flex flex-row justify-center items-center gap-5 object-contain mt-3">
                        <p className="font-bold">Image Url</p>
                        <input 
                        type="text" 
                        placeholder="Image Url"
                        name="image"
                        value={book.image}
                        onChange={handleChange}
                        className="formInput"
                        />
                        </div>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white w-full h-[40px] rounded-lg font-bold mt-5 cursor-pointer transition-colors duration-300 hover:bg-white hover:text-blue-500">
                        Submit
                    </button>

                </form>
            </div>}

            {msg.show && 
              <p className="fixed top-30 bg-gray-100 w-[250px] rounded-xl shadow-2xl p-2 text-center font-bold" style={{color : msg.color}}>{msg.text}</p>
             }

             <button onClick={()=>navigate(-1)} className="w-[90px] h-[35px] bg-blue-400 text-white font-bold rounded-3xl fixed top-15 left-2 transition-opacity duration-200 hover:opacity-70 active:opacity-50 cursor-pointer">&#8592; Back</button>
        </section>
    )
}


export default memo(Modify);