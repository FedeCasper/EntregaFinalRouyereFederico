import { ItemCount } from "../ItemCount/ItemCount"
import { useState } from "react"

export const ItemListContainer = ( { greeting } ) => {

   const [quantity, setQuantity] = useState(0)
   const [stock, setStock] = useState(10)

   function addQuantity(){
      if( quantity < (stock + quantity) ){
         setQuantity(quantity + 1)
         setStock(stock - 1)
      }else{
         alert("No hay stock disponible")
      }
   }

   function subtractQuantity(){
      if( quantity > 0 ){
         setQuantity(quantity - 1)
         setStock(stock + 1)
      }else{
         alert("Ya no tiene elementos agregados")
      }
   }

   return (
      <section className=" flex flex-col gap-3 ">
         <h2 className=" w-fit text-2xl font-sansSerif text-gray-600 "> {greeting} </h2>
         <ItemCount 
         numberOfItems={quantity}
         numberOfStock={stock}
         fnAddQuantity={addQuantity}
         fnSubtractQuantity={subtractQuantity} />
      </section>
   )
}
