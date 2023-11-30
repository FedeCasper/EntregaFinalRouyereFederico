import { useState, useEffect } from "react";
import { ProductsContext } from "./ProductsContext";
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import db from '../firebaseConfig/firebaseConfig';
import { useNavigate } from "react-router-dom";

const ProductsProvider = ( { children } ) => {

   const [ productsList, setProductList ] = useState([])
   const [ product, setProduct ] = useState({})
   const navigate = useNavigate();

   const getAllProducts = () => {
      const productCollection = collection(db, "products");
      getDocs(productCollection)
      .then( snapshot => {
         if (snapshot.size === 0) {
            console.log("There are no products");
         }
         setProductList(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
         );
      })
      .catch((error) => {
         console.log(error);
      });
   };

   const getProductById = (id) => {
      const biciRef = doc(db, "products", id);
      getDoc(biciRef)
      .then( snapshot => {
         if (snapshot.exists()) {
            setProduct( { id: snapshot.id, ...snapshot.data() } );
         } else {
            setProduct( {} );
            console.log("No such document!");
            navigate("/");
         }
      })
      .catch((error) => {
         setProduct( {} );
         console.log(error);
         navigate("/");
      });
   };

   const resetProduct = () => {
      setProduct({})
   }

   useEffect(() => {
      getAllProducts();
   }, []);


   return (
      <ProductsContext.Provider value={{ productsList, setProductList, product, setProduct, getProductById, resetProduct }}>
         {children}
      </ProductsContext.Provider>
   )
}

export default ProductsProvider