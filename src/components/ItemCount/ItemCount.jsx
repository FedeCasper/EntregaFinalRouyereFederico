import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useContext, useRef, useState } from "react"
import { CartContext } from '../../context/CartContext';


const ItemCount = ( { productSelected } ) => {

   const [quantity, setQuantity] = useState(0);
   const refStock = useRef(10);
   const { addItem, productQuantity } = useContext(CartContext);
   const [ alert, setAlert ] = useState('')

   function addQuantity(){
      if( productSelected.stock > 0 ){
         setQuantity(quantity + 1)
         productSelected.stock --
         setAlert("")
      }else{
         setAlert("Out of stock")
      }
   }

   function subtractQuantity(){
      if( quantity > 0 ){
         setQuantity(quantity - 1)
         productSelected.stock ++
         setAlert("")
      }else{
         setAlert("You don't have any items to add")
      }
   }

   function addToCart(){
      console.log("quantity", quantity);
      if( (quantity > 0) || (productSelected.stock > 0 ) ){
         addItem( productSelected, quantity )
         setQuantity(0)
      }else{
         setAlert("No hay stock disponible1")
      }
   }

   return (
      <div className='flex flex-col items-center gap-2 mt-4'>
            <div className='w-full flex flex-col justify-between items-center gap-2 bg-[#CBD5E1] p-2 rounded-md'>
               <h5>Available stock: {productSelected.stock}</h5>
               <p className='text-red-500 italic font-semibold my-0'>{alert}</p>
               <div className=' flex justify-between w-full'>
                  <RemoveCircleIcon onClick={ subtractQuantity } className=' cursor-pointer hover:text-[#ff7799]' />
                  <p>Quantity: {quantity}</p>
                  <AddCircleIcon onClick={ addQuantity } className=' cursor-pointer hover:text-[#30E0A1]'/>
               </div>
            </div>
            <button onClick={ addToCart } className="w-full transition-all ease-in-out bg-[#30E0A1] rounded p-2 drop-shadow-md hover:bg-[#35a880]">Agregar al carrito</button>
            <button className="w-full transition-all ease-in-out bg-[#ff7799] rounded p-2 drop-shadow-md hover:bg-[#ee537a]">Terminar compra</button>
      </div>
   )
}

export default ItemCount;