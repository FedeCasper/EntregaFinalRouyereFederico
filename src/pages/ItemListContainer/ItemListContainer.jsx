import ItemCount from "../../components/ItemCount/ItemCount.jsx"
import ItemList from "../../components/ItemList/ItemList.jsx"

const ItemListContainer = ( { greeting } ) => {

   return (
      <section className=" flex flex-col gap-3 grow">
         <h2 className=" w-ful text-2xl font-sansSerif text-center text-gray-600 my-6"> {greeting} </h2>
         <ItemList />
      </section>
   )
}

export default ItemListContainer
