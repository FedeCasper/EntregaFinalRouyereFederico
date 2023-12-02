import Navbar from '../components/Navbar/Navbar.jsx'
import ItemListContainer from './ItemListContainer/ItemListContainer.jsx'
import ItemDetailContainer from './ItemDetailContainer/ItemDetailContainer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartProvider from '../context/CartProvider.jsx'
import ThemeProvider from '../context/ThemeProvider.jsx'
import Cart from '../components/Cart/Cart.jsx'
import Checkout from '../components/Checkout/Checkout.jsx'
import NotFound404 from '../components/NotFound404/NotFound404.jsx'
import OrderProvider from '../context/OrderProvider.jsx'

export const Layout = () => {

   return (
      <BrowserRouter>
         <ThemeProvider>
            <CartProvider>
               <div className='flex flex-col h-[100vh]'>
                  <header className='flex flex-col justify-between items-center bg-neutral-200 h-[20vh]' >
                     <h1 className='flex items-center font-serif pt-8 font-bold text-2xl text-gray-600'>Casper's Store</h1>
                     <Navbar />
                  </header>
                     <OrderProvider>
                        <Routes>
                           <Route path="/" element={ <ItemListContainer greeting="These are our products"/> } />
                           <Route path="/category/:categoryParam" element={ <ItemListContainer greeting="Filtered Products"/> } />
                           <Route path="/item/:id" element={ <ItemDetailContainer /> } />
                           <Route path="/cart" element={ <Cart /> } />
                           <Route path="/checkout" element={ <Checkout /> } />
                           <Route path="/*" element={ <NotFound404 /> } />
                        </Routes>
                     </OrderProvider>
                  <footer className=' flex justify-center items-center bg-[#E5E5E5] h-[5vh] '>Footer</footer>
               </div>
            </CartProvider>
         </ThemeProvider>
      </BrowserRouter>
   )
}
