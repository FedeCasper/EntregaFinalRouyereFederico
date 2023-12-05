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
import Auth from '../Auth/Auth.jsx'
import AuthProvider from '../context/AuthProvider.jsx'
import React, { SuspenseWithPerf } from 'reactfire';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '../firebaseConfig/firebaseConfig.js';
import AuthGuard from '../Guards/Auth.Guard.jsx'

export const Layout = () => {

   return (
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
         <SuspenseWithPerf fallback={'loading...'}>
            <AuthProvider>
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
                                 <Route element={<AuthGuard />}>
                                    <Route path="/home" element={<ItemListContainer greeting="These are our products" />} />
                                    <Route path="/category/:categoryParam" element={<ItemListContainer greeting="Filtered Products" />} />
                                    <Route path="/item/:id" element={<ItemDetailContainer />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                 </Route>
                                 <Route path="/" element={ <Auth /> } />
                                 <Route path="/*" element={<NotFound404 />} />
                              </Routes>
                           </OrderProvider>
                           <footer className=' flex justify-center items-center bg-[#E5E5E5] h-[5vh] '>Footer</footer>
                        </div>
                     </CartProvider>
                  </ThemeProvider>
               </BrowserRouter>
            </AuthProvider>
         </SuspenseWithPerf>
      </FirebaseAppProvider>
   )
}
