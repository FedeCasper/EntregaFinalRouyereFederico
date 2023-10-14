import React from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { ItemListContainer } from '../components/ItemListContainer.js/ItemListContainer'

export const Layout = () => {
   return (
      <div className='flex flex-col h-[100vh]'>
         <header className=' flex flex-col justify-between items-center bg-neutral-200 h-[20vh] ' >
            <h1 className=' flex items-center font-serif pt-8 font-bold text-2xl text-gray-600'>Casper's Store</h1>
            <Navbar />
         </header>
         <main className=' flex flex-col gap-4 bg-gradient-to-t from-slate-300 to-slate-200 grow justify-center items-center'>
            <ItemListContainer greeting="Hi and Welcome!"/>
         </main>
         <footer className=' bg-lime-200 h-[15vh] '>Soy el footer</footer>
      </div>
   )
}
