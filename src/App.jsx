import { useState } from 'react'
import Header from './Components/Header'
import Store from './Components/Store'
import { SearchProvider } from './Contexts/SearchContext'
import { DescriptionProvider } from './Contexts/DescriptionContext'
import { Routes, Route } from 'react-router-dom'
import Description from './Pages/Description'
import { CartProvider } from './Contexts/CartContext'
import Cart from "./Pages/Cart"
import { OrderProvider } from './Contexts/OrderContext'
import OrderMain from './OrderComponents.jsx/OrderMain'
import Search from './Pages/Search'
function App() {
 
   

     return(

        <CartProvider>
        <OrderProvider>
        
        <DescriptionProvider>
        <SearchProvider>
        <div>
            
            
            <main className='flex flex-col w-full'>
                
                <Routes>
                    
                    <Route path="/" element={
                        <>
                        <Header/>
                        <Store/>
                        </>
                        }/>

                    <Route path="/description" element={
                        <>
                        <Header/>
                        <Description/>
                        </>
                        }/>

                        <Route path="/cart" element={<Cart/>} />

                        <Route path="/order" element={
                            <>
                            <Header/>
                            <OrderMain/>
                            </>
                            }/>

                         <Route path="/search" element={
                            <>
                              <Header/>
                              <Search/>
                            </>
                         }/>
                    
                </Routes>
                
                
            </main>
        </div>
        </SearchProvider>
        </DescriptionProvider>
        </OrderProvider>
        </CartProvider>
        
     )
}

export default App
