import React, { useContext } from 'react'
import { CartContext } from "../../context/CartContext"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {

   const { productQuantity } = useContext(CartContext);

   return (
      <div className="flex items-center w-fit relative cursor-pointer group">
         <div className=" transition-all ease-in-out duration-500 flex justify-center items-center bg-[#FF7799] rounded-full w-5 h-5 absolute top-4 left-5 group-hover:scale-150">
            <span className=" text-white font-bold">{ productQuantity }</span>
         </div>
         <ShoppingCartIcon fontSize='large' />
      </div>
   )
}

export default CartWidget