import { ItemCount } from "../ItemCount/ItemCount"
import { useState } from "react"

export const ItemListContainer = ( {greeting} ) => {

   const [quantity, setQuantity] = useState(0)

   function addQuantity(){
      setQuantity(quantity + 1)
   }

   function subtractQuantity(){
      setQuantity(quantity - 1)
   }

   return (
      <section className=" flex flex-col gap-3 ">
         <h2 className=" w-fit text-2xl font-sansSerif text-gray-600 "> {greeting} </h2>
         <ItemCount 
         numberOfItems={quantity}  
         fnAddQuantity={addQuantity}
         fnSubtractQuantity={subtractQuantity} />
      </section>
   )
}
