import { memo } from 'react'
import { useNavigate } from 'react-router-dom';
import AboutUs from '../Components/HomeComponents/AboutUs';
import BestSellers from '../Components/HomeComponents/BestSellers';


const Home = () => {

    const navigate = useNavigate();
    return(

        <section>

            <section style={{backgroundImage : 'url("/Book/hero8.jpg")'}} className='w-full h-[700px] bg-cover bg-center flex justify-center max-[500px]:h-[500px]'>

            <div className="w-full flex flex-col  items-center bg-blue-400/60">

               <h1 className='text-white font-black text-[3em] mt-10 max-[500px]:text-[2em]'>Welcom to Readly</h1>
               <p className='text-[1.5em] font-bold text-white mt-5 max-[500px]:text-[1.2em]'>Discover, Learn, and Read with Ease</p>

               <p className='w-[500px] font-bold text-center text-white text-[1.3em] leading-5 mt-5 max-[500px]:w-[290px] max-[500px]:text-[1.1em]'>Explore our vast collection of classics, bestsellers, and hidden gems tailored for every reader.</p>

               <button onClick={()=>navigate('/store')} className='mt-10 w-[160px] bg-blue-500 h-[40px] rounded-lg text-white font-bold cursor-pointer transition-all duration-300 hover:bg-white hover:text-blue-500   active:scale-90'>Browse Collection</button>
            </div>
                
            </section>

            <AboutUs/>

            <BestSellers/>
            
        </section>
    )
}

export default memo(Home);