import { WishListContext } from "./WishListContext";
import { useEffect, useState } from "react";

const WishListProvider = ({ children }) => {

   const [wishList, setWishList] = useState([]);

   const getWishList = () => {
      if ( sessionStorage.getItem("wishList") === null ) {
         setWishList( [] );
      } else {
         setWishList( JSON.parse( sessionStorage.getItem("wishList") ) );
      }
   }

   const addToWishList = (product) => {
      setWishList((prevWishList) => {
         const newWishList = [...prevWishList, product];
         sessionStorage.setItem("wishList", JSON.stringify(newWishList));
         return newWishList;
      });
   };

   const clearWishList = () => {
      setWishList([]);
      sessionStorage.clear();
   };

   useEffect(() => {
      getWishList();
   }, []);

   return (
      <WishListContext.Provider value={{ wishList, getWishList, addToWishList, clearWishList  }}>
         {children}
      </WishListContext.Provider>
   );
};

export default WishListProvider;
