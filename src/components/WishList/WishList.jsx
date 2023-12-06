import PulseLoader from "react-spinners/PulseLoader";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { WishListContext } from "../../context/WishListContext";

const WishList = () => {

   const [ wishList, setWishList ] = useState([])
   const [ loader, setLoader ] = useState(true)
   const [updateKey, setUpdateKey] = useState(true);
   const { clearWishList } = useContext( WishListContext );

   const getWishList = () => {
      setWishList( JSON.parse(sessionStorage.getItem("wishList")) || [])
   }

   const handleClearWishList = () => {
      clearWishList();
      setUpdateKey( !updateKey ); 
   };

   const handleRemoveItem = (id) => {
      const newWishList = wishList.filter( product => product.id !== id );
      sessionStorage.setItem("wishList", JSON.stringify(newWishList));
      setWishList(newWishList);
   }

   useEffect(() => {
      getWishList()
   }, [updateKey])

   useEffect(() => {
      getWishList()
      setLoader(false)
   }, [])


   return (
      <section className=" flex flex-col justify-center flex-wrap gap-2">
      { loader ? 
         <PulseLoader color="gray" /> :
         wishList && wishList.map( ({id, title}) => 
         <div key={id} className="flex justify-between gap-4">
            <Link 
               to={`/item/${id}`}
               >
               <div className="flex justify-between gap-4">
                  <div className="flex justify-between gap-4 grow cursor-pointer bg-[#E5E5E5] p-2 rounded-md
                     transition-all duration-300 hover:bg-[#c5c3c3]">
                     {title}
                  </div>
               </div>
            </Link>
            <div 
               onClick={() => handleRemoveItem(id)}
               className="flex justify-between gap-4 cursor-pointer bg-[#E5E5E5] p-2 rounded-md
               transition-all duration-300 hover:bg-[#FF7799]">
               <DeleteForeverIcon  />
            </div>
         </div>
         ) 
      }
      {
         wishList.length > 0 &&
            <button 
               onClick={ handleClearWishList }
               className="bg-[#E5E5E5] p-2 rounded-md
               transition-all duration-300 hover:bg-[#FF7799]">Clear
            </button>
      }

   </section>
   )
}

export default WishList