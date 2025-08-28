import { memo, useState, useEffect } from "react";
import { useBooks } from "../../Contexts/BooksContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const BestSellers = () => {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Desktop par défaut
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // < 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // < 640px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { books } = useBooks();

  const bestSellers = books.filter((b) => b.rating > 4);

 
  const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-yellow-500 text-white p-2 rounded-full shadow-lg"
    onClick={onClick}
  >
    &gt;
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-yellow-500 text-white p-2 rounded-full shadow-lg"
    onClick={onClick}
  >
    &lt;
  </button>
);

  return (
    <section className="flex flex-col items-center bg-blue-500/80 pb-20">
      <h1 className="text-[2.5em] font-black text-white underline mt-10">
        Bestsellers
      </h1>


  <div className="w-full max-w-3xl ">
       <Slider {...settings}
         nextArrow={<NextArrow />}
  prevArrow={<PrevArrow />}
       >
        
          {bestSellers.map((b)=>{
            return(
              <div key={b.id} className="flex flex-col items-center gap-5 p-2 px-3">
                <img src={b.image} alt={b.title} className="w-[200px] h-[300px] object-contain"/>
                <p>{b.title}</p>
              </div>
            );
            
          })}
       </Slider>
       </div>
     
    </section>
  );
}

export default memo(BestSellers);
