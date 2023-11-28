import { useState, useEffect } from "react";
import ItemDetail from "../../components/ItemDetail/ItemDetail.jsx";
import { useParams } from "react-router-dom";
import ItemCount from "../../components/ItemCount/ItemCount.jsx";

import React from 'react'

const ItemDetailContainer = () => {

   const { id } = useParams();
   const [productSelected, setProductSelected] = useState(id);

   const getProduct = (id) => {
      fetch(`https://fakestoreapi.com/products/${id}`)
      .then( (res) => res.json() )
      .then((data) => {
         setProductSelected(data)
      })
      .catch( (err) => console.log(err) )
   }

   useEffect( () => {
      getProduct(id)
   }, [])

   return (
      <section className=' flex flex-col grow gap-4 bg-gradient-to-t from-slate-300 to-slate-200 justify-center items-center'>
         { id && 
         <ItemDetail productSelected={ productSelected }>
            <ItemCount productSelected={ productSelected }/>
         </ItemDetail> }
      </section>

   )
}

export default ItemDetailContainer;
