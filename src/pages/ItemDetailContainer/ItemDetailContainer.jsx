import { useEffect, useContext, useState } from "react";
import ItemDetail from "../../components/ItemDetail/ItemDetail.jsx";
import { useParams } from "react-router-dom";
import ItemCount from "../../components/ItemCount/ItemCount.jsx";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { ProductsContext } from "../../context/ProductsContext.jsx";
import SyncLoader from "react-spinners/SyncLoader";

const ItemDetailContainer = () => {

   const { id } = useParams();
   const colorTheme = useContext(ThemeContext)
   const { product, resetProduct, getProductById } = useContext( ProductsContext );

   useEffect(() => {
      getProductById(id)
      return () => {
         resetProduct();
      }
   }, []);

   return (
      <section className={ `flex flex-col justify-center items-center gap-3 grow ${ colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700'}` }>
         {
            !product.title ? 
               <SyncLoader color="pink" /> :
               <ItemDetail productSelected={ product } >
                  <ItemCount productSelected={ product }/>
               </ItemDetail> 
         }
      </section>
   )
}

export default ItemDetailContainer;
