import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const WishList = () => {

   const [ wishList, setWishList ] = useState([])
   const [ loader, setLoader ] = useState(true)

   const getWishList = () => {
      setWishList( JSON.parse(sessionStorage.getItem("wishList")) || [])
   }
   
   console.log(wishList);

   useEffect(() => {
      getWishList()
      setLoader(false)
   }, [])

   return (
      <section className=" flex flex-col justify-center flex-wrap gap-2">
      { loader ? 
         <PulseLoader color="gray" /> :
         wishList && wishList.map( ({id, title, description, price, image, category, stock}) => 
         <Link 
            key={id} 
            to={`/item/${id}`}
            >
            <div className="flex justify-between gap-4">
               <div className="flex justify-between gap-4 grow cursor-pointer bg-[#E5E5E5] p-2 rounded-md">
                  {title}
               </div>
               <div className="flex justify-between gap-4 cursor-pointer bg-[#E5E5E5] p-2 rounded-md">
                  <DeleteForeverIcon />
               </div>
            </div>
         </Link>
         ) 
      }
   </section>
   )
}

export default WishList