import { memo } from "react";



const AboutUs = () => {


    return(
        <section className="bg-white w-full flex flex-col items-center text-blue-500">
           <h1 className="text-[3em] font-bold mt-10 underline">About Us</h1>


           <div className="flex flex-row justify-center items-center mb-20 mt-10 gap-10 max-[765px]:flex-col">
              
              <div className="max-[765px]:order-2">
              <img src="/Book/hero.jpg" alt="" className="w-[400px] h-[300px] object-contain max-[1020px]:w-[300px] max-[1020px]:h-[200px]"/>
              </div>
           
           <div className="flex flex-col items-center w-[500px]  gap-5 max-[1020px]:w-[300px] max-[765px]:order-1">
            <p className="font-bold text-[1.2em] leading-5 text-center max-[1020px]:text-[1.1em]">
                Readly is an online bookstore dedicated to book lovers. Our mission is simple: to make reading accessible to everyone, anywhere, anytime.
            </p>
            <p className="text-[1.1em] font-[500] text-center max-[1020px]:text-[1em]">
                We offer a carefully curated selection of novels, scientific works, history books, philosophy, and more. What sets us apart is not only our passion for culture but also our commitment to providing a smooth shopping experience and affordable prices for all readers.
            </p>
            <p className="text-[1.1em] text-center max-[1020px]:text-[1em]">
                At Readly, we also take pride in offering rare imported books that are hard to find on the Algerian market, especially in the history category. Every book is a new adventure—join our community and discover your next source of inspiration.
            </p>
           </div>
           </div>
        </section>
    );
}

export default memo(AboutUs);