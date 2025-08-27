
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

import BookPage from './Pages/AdminPages/BookPage'
import Modify from './Pages/AdminPages/Modify'
import { AdminSearchProvider } from './Contexts/AdminSearchContext'
import AddBook from './Pages/AdminPages/AddBook'
import { AdminOrdersProvider } from './Contexts/AdminOrdersContext'
import AdminOrders from './Pages/AdminPages/AdminOrders'
import { SearchOrdersProvider } from './Contexts/SearchOrdersContext'
import AdminProfile from './Pages/AdminPages/AdminProfile'
import UserRoute from './Components/AdminComponents/UserRoute'
import AdminRoute from './Components/AdminComponents/AdminRoute'
import Users from './Pages/AdminPages/Users'
import { UserSearchProvider } from './Contexts/SearchUsersContext'




function App() {


  
  
   return(
    
    <BooksProvider>
      <UserProvider>
        <CartContextProvider>
          <UserSearchProvider>
        <SearchOrdersProvider>
        <AdminOrdersProvider>
        <AdminSearchProvider>
    <PopUpProvider>
     
      <OrderProvider>
        <PackageProvider>
    <SearchProvider>
    <DescriptionProvider>
     <FilterProvider>
      
        
       <Routes>

           
           
         
           <Route element={
              <UserRoute>
                <PublicLayout/>
              </UserRoute>
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
             
              <Search/>
            </>
           }/>

           <Route path="/profile" element={
              <User/>
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
            <AdminRoute>
                 <AdminLayout/>
             </AdminRoute>
        }>
  
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="books" element={<BookPage />} />
          <Route path="modify/:id" element={<Modify />} />
          <Route path="add" element={<AddBook />} />
          <Route path="users" element={<Users/>} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="profile" element={<AdminProfile />} />
  
    </Route>
           
                        </Routes>
       
       </FilterProvider>
      </DescriptionProvider>
      </SearchProvider>
      </PackageProvider>
      </OrderProvider>
      
      </PopUpProvider>
        </AdminSearchProvider>
        </AdminOrdersProvider>
        </SearchOrdersProvider>
        </UserSearchProvider>
        </CartContextProvider>
      </UserProvider>
      </BooksProvider>
      


   )
   
}

export default App
