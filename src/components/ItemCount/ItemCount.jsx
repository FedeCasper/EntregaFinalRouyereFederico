import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useContext, useRef, useState } from "react"
import { CartContext } from '../../context/CartContext';


const ItemCount = ( { productSelected } ) => {

   const [quantity, setQuantity] = useState(0);
   const refStock = useRef(10);
   console.log("refStock", refStock);
   const { addItem, productQuantity } = useContext(CartContext);

   console.log("ProdQuantity", productQuantity);

   function addQuantity(){
      if( quantity < (refStock.current + quantity) - productQuantity ){
         setQuantity(quantity + 1)
         refStock.current --
      }else{
         alert("No hay stock disponible")
      }
   }

   function subtractQuantity(){
      if( quantity > 0 ){
         setQuantity(quantity - 1)
         refStock.current ++
      }else{
         alert("Ya no tiene elementos agregados")
      }
   }

   function addToCart(){

      console.log("quantity", quantity);
      if( (quantity < refStock.current) || (quantity >= quantity + productQuantity ) ){
         addItem( productSelected, quantity )
         setQuantity(0)
         refStock.current = refStock.current - productQuantity
      }else{
         alert("No hay stock disponible1")
      }

   }
   return (
      <div className='flex flex-col items-center gap-2 mt-4'>
            <div className='w-full flex flex-col justify-between items-center gap-4 bg-slate-200 p-2 rounded-md'>
               <h5>Available stock: {refStock.current - productQuantity}</h5>
               <div className=' flex justify-between w-full'>
                  <RemoveCircleIcon onClick={ subtractQuantity } className=' cursor-pointer hover:text-lime-600' />
                  <p>Quantity: {quantity}</p>
                  <AddCircleIcon onClick={ addQuantity } className=' cursor-pointer hover:text-lime-600'/>
               </div>
            </div>
            <button onClick={ addToCart } className="w-full transition-all ease-in-out bg-[#ff7799] rounded p-2 drop-shadow-md hover:bg-lime-300">Agregar al carrito</button>
            <button className="w-full transition-all ease-in-out bg-[#ff7799] rounded p-2 drop-shadow-md hover:bg-lime-300">Terminar compra</button>
      </div>
   )
}

export default ItemCount;