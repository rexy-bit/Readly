import React from "react";

import data from "../data";
import BookCard from "./BookCard";

export default function Store(){

   

    
    return(
        <div className="w-full flex flex-wrap justify-center items-center gap-[30px] mt-10 mb-30">
            {data.map((book)=>{
                return(
               <BookCard
               book={book}
               key={book.code}
               />
                )
            })}
        </div>
    )
}