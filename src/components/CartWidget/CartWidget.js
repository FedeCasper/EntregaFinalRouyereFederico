

export const CartWidget = () => {
   return (
      <div className="flex items-center w-fit relative inline-block">
         <div className=" flex justify-center items-center bg-red-700 rounded-full w-6 h-6 absolute top-4 left-4">
            <span className=" text-white font-bold">1</span>
         </div>
         <img src="./cart.png" alt="cart"/>
      </div>
   )
}
