import React from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import ItemListContainer from './ItemListContainer/ItemListContainer.jsx'
import ItemDetailContainer from './ItemDetailContainer/ItemDetailContainer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const Layout = () => {
   return (
      <div className='flex flex-col h-[100vh]'>
         <header className='flex flex-col justify-between items-center bg-neutral-200 h-[20vh]' >
            <h1 className='flex items-center font-serif pt-8 font-bold text-2xl text-gray-600'>Casper's Store</h1>
            <Navbar />
         </header>
         <BrowserRouter className=' flex flex-col gap-4 bg-gradient-to-t from-slate-300 to-slate-200 grow justify-center items-center'>
            <Routes>
               <Route path="/" element={ <ItemListContainer greeting="Hi and Welcome!"/> } />
               <Route path="/item/:id" element={ <ItemDetailContainer /> } />
            </Routes>
         </BrowserRouter>
         <footer className=' bg-lime-200 h-[15vh] '>Footer</footer>
      </div>
   )
}
