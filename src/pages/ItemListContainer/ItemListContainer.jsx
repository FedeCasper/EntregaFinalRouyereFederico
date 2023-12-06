import { useContext } from "react"

import ItemList from "../../components/ItemList/ItemList.jsx"
import { ThemeContext } from "../../context/ThemeContext.jsx"

const ItemListContainer = ( { greeting } ) => {

   const colorTheme = useContext(ThemeContext)

   return (
      <section className={ `flex flex-col gap-3 grow p-8 ${ colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700'}` } >
         <h2 className={` w-ful text-2xl font-sansSerif text-center my-2 ${ colorTheme.theme === 'bg-slate-100' ?  'text-gray-600 my-3' : ' text-slate-100 my-3' } `}> {greeting} </h2>
         <ItemList />
      </section>
   )
}

export default ItemListContainer
