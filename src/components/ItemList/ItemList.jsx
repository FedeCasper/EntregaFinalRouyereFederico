import Item from '../Item/Item.jsx'
import { useContext, useEffect, useState } from "react" 
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebaseConfig/firebaseConfig.js'
import { collection, getDocs } from 'firebase/firestore';


const ItemList = () => {

   const [ filteredList, setFilteredList ] = useState([]);
   const [ loader, setLoader ] = useState( true );
   const { categoryParam } = useParams(); 
   const [ productsList, setProductList ] =  useState([]);

   // Data de fakeApi
   // const getAllProducts = async () => {
   //    fetch("https://fakestoreapi.com/products", {
   //       method: "GET",
   //       headers: {
   //          "access-control-allow-origin": "*"
   //       }
   //    })
   //    .then( (res) => res.json() )
   //    .then((data) => {
   //       setProductList(data)
   //       setLoader(false)
   //    })
   //    .catch( (err) => console.log(err) )
   // }

   // useEffect( () => {
   //    getAllProducts()
   // }, [])

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

   useEffect(() => {
      getAllProducts();
   }, []);

   useEffect(() => {
      setTimeout(() => {
         setLoader(false);
      }, 1000);
   }, []);

   useEffect( () => {
      console.log(categoryParam);
      console.log(productsList);
         const filteredProducts = productsList.filter( product => product.category === categoryParam )
         filteredProducts.length ? setFilteredList( filteredProducts ) : setFilteredList(productsList)
   }, [categoryParam, productsList])

   return (
   <section className=" flex justify-center flex-wrap gap-4">
      { loader ? 
         <PulseLoader color="gray" /> :
         filteredList && filteredList.map( ({id, title, description, price, image, category, stock}) => 
         <Link 
            key={id} 
            to={`/item/${id}`}
            >
            <Item 
               title={title} 
               description={description}
               price={price} 
               image={image} 
               category={category}
               stock={stock}
            /> 
         </Link>
         ) 
      }
   </section>
   )
}

export default ItemList
