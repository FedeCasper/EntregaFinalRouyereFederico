import React from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { ItemListContainer } from '../components/ItemListContainer.js/ItemListContainer'

export const Layout = () => {
   return (
      <div className='flex flex-col h-[100vh]'>
         <header className=' flex items-end bg-neutral-200 h-[15vh] ' >
            <Navbar />
         </header>
         <main className=' flex bg-indigo-200 grow justify-center items-center'>
            <ItemListContainer />
         </main>
         <footer className=' bg-orange-200 h-[15vh] '>Soy el footer</footer>
      </div>
   )
}
