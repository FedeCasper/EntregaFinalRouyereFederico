import React, { useContext } from 'react'
import { CartContext } from "../../context/CartContext"

const CartWidget = () => {

   const { productQuantity } = useContext(CartContext);

   return (
      <div className="flex items-center w-fit relative cursor-pointer group">
         <div className=" transition-all ease-in-out duration-500 flex justify-center items-center bg-[#FF7799] rounded-full w-6 h-6 absolute top-3 left-5 group-hover:scale-150">
            <span className=" text-white font-bold">{ productQuantity }</span>
         </div>
         <img src="/images/cart.png" alt="cart" />
      </div>
   )
}

export default CartWidget