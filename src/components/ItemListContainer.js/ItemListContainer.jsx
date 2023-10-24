import { ItemCount } from "../ItemCount/ItemCount"

export const ItemListContainer = ( { greeting } ) => {

   return (
      <section className=" flex flex-col gap-3 ">
         <h2 className=" w-fit text-2xl font-sansSerif text-gray-600 "> {greeting} </h2>
         <ItemCount />
      </section>
   )
}
