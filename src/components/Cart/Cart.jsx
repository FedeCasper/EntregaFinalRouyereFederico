import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Item from '../Item/Item';
import { collection, addDoc, getFirestore, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { OrderContext } from '../../context/OrderContext'
import { AuthContext } from '../../context/AuthContext';

const Cart = () => {

   const { products, clear, removeItem } = useContext(CartContext);
   const [formValue, setFormValue] = useState({ name: '', lastName: '', phone: '', email: '' });
   const [confirmEmail, setConfirmEmail] = useState('');
   const navigate = useNavigate();
   const [ total, setTotal ] = useState(0);
   const colorTheme = useContext(ThemeContext)
   const { orderId, setOrderId } = useContext( OrderContext );
   const { authUser } = useContext( AuthContext );

   const handleInput = (e) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
   }

   const handleConfirmEmail = (e) => {
      setConfirmEmail(e.target.value);
   }

   const totalCalculator = () => {
      setTotal(products.reduce((total, product) => total + product.price * product.quantity, 0));
   }

   const validateForm = formValue.name === '' || formValue.lastName === '' || formValue.phone === '' || formValue.email === '' || formValue.confirmEmail === '' || formValue.email !== confirmEmail;
   const db = getFirestore();

   const createOrder = (e) => {
      e.preventDefault();
      const noStock = products.some( product => ( product.stock < product.quantity ) );
      console.log(noStock);
      if ( !noStock ) {
         const querySnapshot = collection(db, 'orders');
         const newOrder = {
            buyer: formValue,
            items: products.map(product => ({ id: product.id, title: product.title, price: product.price, quantity: product.quantity })),
            date: new Date(),
            total: total,
            state: 'generated'
         }
         addDoc(querySnapshot, newOrder)
            .then( res => {
               console.log('Order created', res.id);
               updateProductStock();
               setOrderId(res.id);
               setTimeout(() => {
                  clear();
                  navigate('/checkout');
               }, 1000);
            })
            .catch(error => console.log(error));
      } else {
         console.log("There's not enough stock");
         alert('Something went wrong');
      }
   }

   const updateProductStock = ( product ) => {
      products.forEach(product => {
         const querySnapshot = doc(db, 'products', product.id);
         updateDoc(querySnapshot, { stock: product.stock - product.quantity })
            .then(() => console.log('Product stock updated successfully'))
            .catch(error => console.log(error));
      });
   }

   useEffect(() => {
      totalCalculator();
   }, [products]);

   return (
      <div className={ `flex flex-col justify-between gap-4 grow rounded-md w-full p-8 ${ colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700'}` }>
         <h2 className=" w-ful text-2xl font-sansSerif text-center text-gray-600 my-3"> Cart Section </h2>

         <section className="flex justify-between gap-4  p-2">

            {/* Form container ---------------------------- */}
            <div className="flex w-fit items-center justify-center bg-[#CCCCCC] p-3 rounded-md">
               <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                  <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">Confirm order</h4>
                  <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">Enter your details to complete the process.</p>
                  <p className='text-white italic bg-[#FF7799] rounded-md p-2 mt-4 text-center'> You're about to make a purchase as ❕<br></br> { authUser ? authUser.email : 'anonymous user' }</p>

                  {/* Form starts ---------------------------- */}
                  <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                     <div className="mb-4 flex flex-col gap-6">
                        {/* Name section ---------------------------- */}
                        <div className="relative h-11 w-full min-w-[200px]">
                           <input
                              type="text"
                              name="name"
                              className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              placeholder=" "
                              value={formValue.name}
                              onChange={handleInput}
                              required
                           />
                           <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                              Name
                           </label>
                        </div>

                        {/* Lastname section ---------------------------- */}
                        <div className="relative h-11 w-full min-w-[200px]">
                           <input
                              type="text"
                              name="lastName"
                              className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              placeholder=" "
                              value={formValue.lastName}
                              onChange={handleInput}
                              required
                           />
                           <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                              Last name
                           </label>
                        </div>

                        {/* Phone section ---------------------------- */}
                        <div className="relative h-11 w-full min-w-[200px]">
                           <input
                              type="text"
                              name='phone'
                              className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              placeholder=" "
                              value={formValue.phone}
                              onChange={handleInput}
                              required
                           />
                           <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                              Phone
                           </label>
                        </div>

                        {/* Email section ---------------------------- */}
                        <div className="relative h-11 w-full min-w-[200px]">
                           <input
                              type="email"
                              name="email"
                              className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              placeholder=" "
                              value={formValue.email}
                              onChange={handleInput}
                              required
                           />
                           <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                              Email
                           </label>
                        </div>

                        {/* Confirm Email section ---------------------------- */}
                        <div className="relative h-11 w-full min-w-[200px]">
                           <input
                              type="email"
                              name="confirmEmail"
                              className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              placeholder=" "
                              value={confirmEmail}
                              onChange={handleConfirmEmail}
                              required
                              disabled={formValue.email === ''}
                           />
                           <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                              Confirm email
                           </label>
                        </div>
                     </div>

                     <button
                        className="mt-6 block w-full select-none rounded-lg bg-[#FF7799] py-3 px-6 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit"
                        data-ripple-light="true"
                        onClick={createOrder}
                        disabled={validateForm}
                     >
                        {validateForm ? 'Complete all fields' : 'Confirm order'}
                     </button>

                  </form>
               </div>

               <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
            </div>

            <section className='flex flex-col justify-start grow flex-wrap'>
               <button onClick={clear} className="self-center mb-2 w-full transition-all ease-in-out bg-[#ff7799] rounded p-2 drop-shadow-md hover:bg-lime-300">Remove all products</button>
               <div className="text-2xl font-sansSerif italic text-center text-gray-600 mb-3 bg-slate-200"> Total: ${total?.toLocaleString() } </div>
               {products.length ?
                  <section className='flex content-start gap-4 h-2/3 flex-wrap'>
                     {
                        products.map(({ id, title, price, quantity, stock }) =>
                           <div key={id} className='flex flex-col gap-2'>
                              <Item
                                 title={title}
                                 price={price}
                                 quantity={quantity}
                                 stock={stock}
                              />
                              <button
                                 onClick={() => removeItem(id)}
                                 type="button"
                                 className="self-center w-full transition-all ease-in-out bg-[#A1A1A1] rounded p-1 drop-shadow-md hover:bg-[#ff7799]">
                                 <DeleteForeverIcon />
                              </button>
                           </div>
                        )
                     }
                  </section>
                  : <h2 className=" w-ful text-2xl font-sansSerif italic text-center text-gray-600 my-3">There are no products in the cart</h2>
               }
            </section>

         </section>


      </div>
   )
}

export default Cart