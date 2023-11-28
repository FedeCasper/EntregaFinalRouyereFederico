import Item from '../Item/Item.jsx'
import { useEffect, useState } from "react" 
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useParams } from 'react-router-dom';

const ItemList = () => {

   const [productList, setProductList] = useState([]);
   const [filteredList, setFilteredList] = useState([]);
   const [loader, setLoader] = useState(true);
   const { categoryParam } = useParams(); 

   const getAllProducts = async () => {
      fetch("https://fakestoreapi.com/products", {
         method: "GET",
         headers: {
            "access-control-allow-origin": "*"
         }
      })
      .then( (res) => res.json() )
      .then((data) => {
         console.log("me ejecuté getAllProducts function");
         setProductList(data)
         setLoader(false)
      })
      .catch( (err) => console.log(err) )
   }

   useEffect( () => {
      console.log("Me ejecute useEffect getAllProducts");
      getAllProducts()
   }, [])

   useEffect( () => {
      console.log("Me ejecute useEffect categoryParam");
         const filteredProducts = productList.filter( product => product.category === categoryParam )
         console.log(filteredProducts);
         filteredProducts.length ? setFilteredList( filteredProducts ) : setFilteredList(productList)
   }, [categoryParam, productList])

   return (
   <section className=" flex justify-center flex-wrap gap-4">
      { loader ? 
         <PulseLoader color="gray" /> :
         filteredList.map( ({id, title, description, price, image, category}) => 
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
