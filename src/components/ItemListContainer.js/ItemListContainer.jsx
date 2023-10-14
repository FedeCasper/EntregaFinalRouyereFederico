

export const ItemListContainer = ( {greeting} ) => {

   return (
      <div className=" flex flex-col gap-3">
         <h2 className=" w-fit text-2xl font-sansSerif text-gray-600"> {greeting} </h2>
      </div>
   )
}
