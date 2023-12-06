import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../context/ThemeContext.jsx"
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WishList from "../../components/WishList/WishList.jsx";
import { WishListContext } from '../../context/WishListContext';

const WishListContainer = () => {

   const colorTheme = useContext(ThemeContext)
   const { getWishList } = useContext( WishListContext )

   useEffect(() => {
      getWishList()
   }, [ ] )

   return (
      <section className={ `flex flex-col justify-start items-center gap-4 grow ${ colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700' }` }>
         <h2 className={`flex items-baseline w-ful text-2xl font-sansSerif text-center ${ colorTheme.theme === 'bg-slate-100' ?  'text-gray-600 my-3' : ' text-slate-100 my-3' } `}>This is your wish list <VolunteerActivismIcon fontSize="large" className="text-[#FF7799] ms-3" />  </h2>
         <WishList />
      </section>
   )
}

export default WishListContainer