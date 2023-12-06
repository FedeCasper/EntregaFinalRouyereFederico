import { useContext, useEffect } from "react"
import { ThemeContext } from "../../context/ThemeContext.jsx"
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WishList from "../../components/WishList/WishList.jsx";
import { WishListContext } from '../../context/WishListContext';
import { get } from "firebase/database";

const WishListContainer = () => {

   const colorTheme = useContext(ThemeContext)
   const { getWishList, clearWishList } = useContext( WishListContext )

   useEffect(() => {
      getWishList()
   }, [ ] )

   return (
      <section className={ `flex flex-col justify-start items-center gap-4 grow ${ colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700' }` }>
         <nav className="flex justify-center gap-3 bg-[#CBD5E1] w-full py-3">
            <button 
               onClick={ () => clearWishList() }
               className="flex justify-center items-center h-10 bg-[#4B5563] text-white rounded ms-3 p-2 drop-shadow-sm font-sansSerif
               transition-all duration-300 ease-in-out hover:bg-[#ff7799] hover:scale-95">
                  Clear Wish List
            </button>
         </nav>
         <h2 className={`flex items-baseline w-ful text-2xl font-sansSerif text-center ${ colorTheme.theme === 'bg-slate-100' ?  'text-gray-600 my-3' : ' text-slate-100 my-3' } `}>This is your wish list <VolunteerActivismIcon fontSize="large" className="text-[#FF7799] ms-3" />  </h2>
         <WishList />
      </section>
   )
}

export default WishListContainer