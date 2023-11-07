import { useState, useEffect } from "react";
import ItemDetail from "../../components/ItemDetail/ItemDetail.jsx";
import { useParams } from "react-router-dom";

import React from 'react'

const ItemDetailContainer = () => {

   const { id } = useParams();
   console.log(id);
   const [productSelected, setProductSelected] = useState(id);

   const getProduct = (id) => {
      console.log(id);
      fetch(`https://6539a6a8e3b530c8d9e89144.mockapi.io/api/casper/products/${id}`)
      .then( (res) => res.json() )
      .then((data) => {
         console.log(data);
         setProductSelected(data)
         console.log(productSelected);
      })
      .catch( (err) => console.log(err) )
   }

   useEffect( () => {
      getProduct(id)
   }, [])

   return (
      <section className=' flex flex-col gap-4 bg-gradient-to-t from-slate-300 to-slate-200 grow justify-center items-center'>
         { id && <ItemDetail productSelected={ productSelected }/> }
      </section>

   )
}

export default ItemDetailContainer;
