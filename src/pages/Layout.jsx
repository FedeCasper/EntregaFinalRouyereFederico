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
import WishListContainer from './WishListContainer/WishListContainer.jsx'
import WishListProvider from '../context/WishListProvider.jsx'
import Footer from '../components/Footer/Footer.jsx'

export const Layout = () => {

   return (
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
         <SuspenseWithPerf fallback={'loading...'}>
            <AuthProvider>
               <BrowserRouter>
                  <ThemeProvider>
                     <WishListProvider>
                        <CartProvider>
                           <div className='flex flex-col h-[100vh]'>
                              <header className='flex flex-col justify-center items-center gap-4 bg-neutral-200 h-[15%] py-4 border border-b-2 border-b-[#FF7799]' >
                                 <h1 className='flex items-center font-serif font-bold text-2xl text-gray-600'>Welcome to Casper's Store</h1>
                                 <Navbar />
                              </header>
                              <OrderProvider>
                                 <Routes>
                                    <Route element={<AuthGuard />}>
                                       <Route path="/home" element={<ItemListContainer greeting="These are our products" />} />
                                       <Route path="/wishlist" element={ <WishListContainer /> } />
                                       <Route path="/category/:categoryParam" element={<ItemListContainer greeting="Filtered Products" />} />
                                       <Route path="/item/:id" element={<ItemDetailContainer />} />
                                       <Route path="/cart" element={<Cart />} />
                                       <Route path="/checkout" element={<Checkout />} />
                                    </Route>
                                    <Route path="/" element={ <Auth /> } />
                                    <Route path="/*" element={<NotFound404 />} />
                                 </Routes>
                              </OrderProvider>
                              <Footer />
                           </div>
                        </CartProvider>
                     </WishListProvider>
                  </ThemeProvider>
               </BrowserRouter>
            </AuthProvider>
         </SuspenseWithPerf>
      </FirebaseAppProvider>
   )
}
