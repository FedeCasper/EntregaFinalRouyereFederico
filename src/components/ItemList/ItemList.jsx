import Item from '../Item/Item.jsx'
import { useContext, useEffect, useState } from "react" 
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useParams } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext.jsx';

const ItemList = () => {

   const [ filteredList, setFilteredList ] = useState([]);
   const [ loader, setLoader ] = useState( true );
   const { categoryParam } = useParams(); 
   const { productsList, product, setProduct, getProductById } = useContext( ProductsContext );

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

   useEffect(() => {
      setTimeout(() => {
         setLoader(false);
      }, 1000);
   }, []);

   useEffect( () => {
         const filteredProducts = productsList.filter( product => product.category == categoryParam )
         filteredProducts.length ? setFilteredList( filteredProducts ) : setFilteredList(productsList)
   }, [categoryParam, productsList])

   return (
   <section className=" flex justify-center flex-wrap gap-4">
      { loader ? 
         <PulseLoader color="gray" /> :
         filteredList && filteredList.map( ({id, title, description, price, image, category}) => 
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
            /> 
         </Link>
         ) 
      }
   </section>
   )
}

export default ItemList
