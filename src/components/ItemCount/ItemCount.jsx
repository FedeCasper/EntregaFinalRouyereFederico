import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const ItemCount = ({numberOfItems, fnAddQuantity, fnSubtractQuantity, numberOfStock}) => {


   return (
      <div className='flex flex-col items-center gap-2'>
            <div className='w-full flex flex-col justify-between items-center gap-4 bg-slate-200 p-2 rounded-md'>
               <h3>Camisa Tiger</h3>
               <h5>Available stock: {numberOfStock}</h5>
               <div className=' flex justify-between w-full'>
                  <AddCircleIcon onClick={fnAddQuantity} />
                  {numberOfItems}
                  <RemoveCircleIcon onClick={fnSubtractQuantity} />
               </div>
            </div>
            <button className="w-full transition-all ease-in-out bg-pink-100 rounded p-2 drop-shadow-md hover:bg-lime-300">Agregar al carrito</button>
      </div>
   )
}