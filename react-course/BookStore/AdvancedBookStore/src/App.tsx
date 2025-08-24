
import Home from './Pages/Home'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import { BooksProvider } from './Contexts/BooksContext'
import Store from './Pages/Store'
import { FilterProvider } from './Contexts/FilterContext'
import Filter from './Pages/Filter'
import { Description } from './Pages/Description'
import { DescriptionProvider } from './Contexts/DescriptionContext'
import { SearchProvider } from './Contexts/SearchContext'
import Header from './Components/Header'
import Search from './Pages/Search'
import {  UserProvider, useUser } from './Contexts/UserContext'
import User from './Pages/User'
import { PopUpProvider } from './Contexts/PopUpContext'
import { CartContextProvider } from './Contexts/CartContext'
import Cart from './Pages/Cart'
import { OrderProvider } from './Contexts/OrderContext'
import Orders from './Pages/Orders'
import { PackageProvider } from './Contexts/PackageContext'
import Track from './Pages/Track'
import PublicLayout from './Pages/PublicLayout'
import AdminLayout from './Pages/AdminLayout'
import PrivateRoute from './Components/AdminComponents/PrivateRoute'
import PublicRoute from './Components/AdminComponents/HandleRoute'
import HandleRoute from './Components/AdminComponents/HandleRoute'
import BookPage from './Pages/AdminPages/BookPage'
import Modify from './Pages/AdminPages/Modify'
import { AdminSearchProvider } from './Contexts/AdminSearchContext'
import AddBook from './Pages/AdminPages/AddBook'
import { AdminOrdersProvider } from './Contexts/AdminOrdersContext'
function App() {

  
   return(
    
    <BooksProvider>
      <UserProvider>
        <AdminOrdersProvider>
        <AdminSearchProvider>
    <PopUpProvider>
     <CartContextProvider>
      <OrderProvider>
        <PackageProvider>
    <SearchProvider>
    <DescriptionProvider>
     <FilterProvider>
      
       <Routes>

           

         <Route element={
                        <PrivateRoute role='admin'>
                            <PublicLayout />
                          </PrivateRoute>
                          
          }>
           <Route path="/" element={
            <>
            <Home/>
            
            </>
           }/>

           <Route path="/store" element={
            <Store/>
           }/>

           <Route path="/filter" element={
            <Filter/>
           }/>

           <Route path='/description' element={
            <Description/>
           }/>

           <Route path="/search" element={
            <>
              <Header/>
              <Search/>
            </>
           }/>

           <Route path="/profile" element={
            <>
              <User/>
            </>
           }/>

           <Route path="/cart" element={

            <Cart/>
           }/>

           <Route path="/orders" element={
            <Orders/>
           }/>

           <Route path="/track" element={
            <Track/>
           }/>

           </Route>
         

           <Route path="/admin/*" element={
                     <HandleRoute>
                            <AdminLayout />
                       </HandleRoute> 
           }>

            <Route path="dashboard" element={<>
                <div>Dashboard</div>
              </>}/>
            <Route path="books" element={
              <BookPage/>
            }>
               
              </Route>

              <Route path='modify/:id' element={
                <Modify/>
               }/>

               <Route path='add' element={
                <AddBook/>
               }/>
            <Route path="users" element={<>
                <div>
                  Users
                </div>
              </>}/>
            <Route path="orders" element={<>
                <div>
                  Orders
                </div>
              </>}/>
          </Route>
          
       </Routes>
       
       </FilterProvider>
      </DescriptionProvider>
      </SearchProvider>
      </PackageProvider>
      </OrderProvider>
      </CartContextProvider>
      </PopUpProvider>
        </AdminSearchProvider>
        </AdminOrdersProvider>
      </UserProvider>
      </BooksProvider>
   )
}

export default App
