import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useState, useEffect } from 'react';

const WishListWidget = ( {productSelected} ) => {

   const [ wishList, setWishList ] = useState( [] );
   const [ isInWishList, setIsInWishList ] = useState( false );


   const checkIsInWishList =  () => {
      setIsInWishList(wishList.some( product => product.id === productSelected.id ));
   }

   const getWishList = () => {
      if ( sessionStorage.getItem("wishList") === null ) {
         setWishList( [] );
      } else {
         setWishList( JSON.parse( sessionStorage.getItem("wishList") ) );
      }
   }

   const addToWishList = () => {
      console.log(wishList);
      wishList.push(productSelected);
      sessionStorage.setItem("wishList", JSON.stringify(wishList));
      checkIsInWishList();
   }

   useEffect(() => {
      getWishList();
   }, []);

   return (

      <button 
         className="absolute top-5 left-5 " 
         onClick={ () => addToWishList(productSelected) } >
         {
            isInWishList ? 
            <PlaylistAddIcon className="text-[#E5E5E5] cursor-default" fontSize="large" /> :
            <PlaylistAddIcon className="text-[#FF7799] hover:scale-110 hover:text-[#30E0A1]" fontSize="large" />
            
         }
      </button>
   )
}

export default WishListWidget