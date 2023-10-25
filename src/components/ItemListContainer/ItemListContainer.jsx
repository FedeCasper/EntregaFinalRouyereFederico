import ItemCount from "../ItemCount/ItemCount.jsx"
import ItemList from "../ItemList/ItemList.jsx"

const ItemListContainer = ( { greeting } ) => {

   return (
      <section className=" flex flex-col gap-3 ">
         <h2 className=" w-fit text-2xl font-sansSerif text-gray-600 "> {greeting} </h2>
         <ItemList>
            <ItemCount />
         </ItemList>
      </section>
   )
}

export default ItemListContainer
