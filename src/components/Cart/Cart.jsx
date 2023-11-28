import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Item from '../Item/Item';

const Cart = () => {

   const { products, clear, removeItem  } = useContext(CartContext);

   return (
      <div className="flex flex-col justify-between gap-4 grow bg-slate-100 rounded-md w-full p-2">
         <h2 className=" w-ful text-2xl font-sansSerif text-center text-gray-600 my-3"> Cart Section </h2>
            { products.length ? 
               <section className='flex justify-center gap-4 h-2/3'>
               {  
                  products.map( ({id, title, description, price, image, category}) => 
                  <div key={id}  className='flex flex-col gap-2'>
                     <Item 
                        title={title} 
                        description={description}
                        price={price} 
                        image={image} 
                        category={category}
                     /> 
                     <button 
                        onClick={ () => removeItem(id) } 
                        type="button" 
                        className="self-center w-full transition-all ease-in-out bg-[#A1A1A1] rounded p-2 drop-shadow-md hover:bg-[#ff7799]">
                           Remove
                     </button>
                  </div>
               ) 
               }
               </section>
               : <h2 className=" w-ful text-2xl font-sansSerif italic text-center text-gray-600 my-3">There are no products in the cart</h2> 
            }
               <button onClick={clear} className="self-center w-1/3 transition-all ease-in-out bg-[#ff7799] rounded p-2 drop-shadow-md hover:bg-lime-300">Remove all products</button>
      </div>
   )
}

export default Cart