import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useState, useEffect, useContext } from 'react';
import { WishListContext } from '../../context/WishListContext';

const WishListWidget = ( {productSelected} ) => {


   const [ isInWishList, setIsInWishList ] = useState( false );
   const { addToWishList, wishList, getWishList } = useContext( WishListContext );

   const checkIsInWishList =  () => {
      let boolean = wishList.some( product => product.id === productSelected.id )
      setIsInWishList(boolean);
   }

   useEffect(() => {
      checkIsInWishList();
   }, [productSelected, wishList]);

   return (
      <>
         {
            !isInWishList &&
            <button 
               className="absolute top-5 left-5 " 
               onClick={ () => addToWishList(productSelected) } >
               <PlaylistAddIcon className="text-[#FF7799] hover:scale-110 hover:text-[#30E0A1]" fontSize="large" />
            </button>
         }
      </>
   )
}

export default WishListWidget