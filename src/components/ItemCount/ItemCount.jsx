import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const ItemCount = ({numberOfItems, fnAddQuantity, fnSubtractQuantity}) => {


   return (
      <div>
            <div className=' flex flex-col justify-between items-center gap-4 bg-slate-200 p-2 rounded-md'>
               <h3>Camisa Tiger</h3>
               <div className=' flex justify-between w-full'>
                  <AddCircleIcon onClick={fnAddQuantity} />
                  {numberOfItems}
                  <RemoveCircleIcon onClick={fnSubtractQuantity} />
               </div>
            </div>
            <button className=" bg-slate-400 p-2 rounded-md">Agregar al carrito</button>
      </div>
   )
}