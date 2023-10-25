import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useRef, useState } from "react"

const ItemCount = () => {

   const [quantity, setQuantity] = useState(0)
   // const [stock, setStock] = useState(10)
   const refStock = useRef(10)

   function addQuantity(){
      if( quantity < (refStock.current + quantity) ){
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

   return (
      <div className='flex flex-col items-center gap-2'>
            <div className='w-full flex flex-col justify-between items-center gap-4 bg-slate-200 p-2 rounded-md'>
               <h3>Camisa Tiger</h3>
               <h5>Available stock: {refStock.current}</h5>
               <div className=' flex justify-between w-full'>
                  <RemoveCircleIcon onClick={subtractQuantity} className=' cursor-pointer hover:text-lime-600' />
                  {quantity}
                  <AddCircleIcon onClick={addQuantity} className=' cursor-pointer hover:text-lime-600'/>
               </div>
            </div>
            <button className="w-full transition-all ease-in-out bg-pink-100 rounded p-2 drop-shadow-md hover:bg-lime-300">Agregar al carrito</button>
      </div>
   )
}

export default ItemCount;