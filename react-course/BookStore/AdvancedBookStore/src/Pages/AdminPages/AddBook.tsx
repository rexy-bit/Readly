import { useBooks, type Book } from "../../Contexts/BooksContext"
import {db} from "../../Config/fireBase"
import { useState } from "react";
import { NumberSchema } from "firebase/ai";

const AddBook = () => {

    const {books, setBooks} = useBooks();

    const {book, setBook} = useState<Book | null>(null);

    function handleChange(e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>){

        const {name, type, value} = e.target;

        setBook({
            ...book!,
            [name] : type === "number" ? Number(value) : value 
        });

    }
    return(

        <div>
            <h1>Adding Book</h1>

            <div>
                <h1>Adding Form</h1>

                <form action="">
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
                    value={book.price}
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
            </div>
        </div>
    )
}