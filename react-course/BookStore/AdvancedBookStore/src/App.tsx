
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
import {  UserProvider } from './Contexts/UserContext'
import User from './Pages/User'
import { PopUpProvider } from './Contexts/PopUpContext'
function App() {
   return(
    <PopUpProvider>
    <UserProvider>
    <SearchProvider>
    <DescriptionProvider>
     <FilterProvider>
      <BooksProvider>
       <Routes>
           
           <Route path="/" element={
            <Home/>
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
       </Routes>
       </BooksProvider>
       </FilterProvider>
      </DescriptionProvider>
      </SearchProvider>
      </UserProvider>
      </PopUpProvider>
   )
}

export default App
