import Item from '../Item/Item.jsx'
import { useEffect, useState } from "react" 
import PulseLoader from "react-spinners/PulseLoader";


const PRODUCTS = [
   {
      product: "keyboard",
      color: "black",
      brand: "logitech",
      image: "https://candid.technology/wp-content/uploads/2020/12/msi-lights-feature-2048x1147.jpg"
   },
   {
      product: "mouse",
      color: "white",
      brand: "razer",
      image: "https://th.bing.com/th/id/OIP.u7OWDE1yIr7W0YSneOQS3gHaE8?pid=ImgDet&rs=1"
   },
   {
      product: "monitor",
      color: "black",
      brand: "dell",
      image: "https://th.bing.com/th/id/OIP.oYM3lQAsy9FyCajnHNabgQHaE8?pid=ImgDet&rs=1"
   },
   {
      product: "headphones",
      color: "white",
      brand: "sony",
      image: "https://insta-gaming.nl/wp-content/uploads/2020/10/dragon3-768x768.jpg"
   },
   {
      product: "laptop",
      color: "purple",
      brand: "dell",
      image: "https://th.bing.com/th/id/R.1c40043af725b05a534a512e614a2322?rik=CZmjUkndapyRDA&riu=http%3a%2f%2fcdn1.theinertia.com%2fwp-content%2fuploads%2f2017%2f06%2fDell-XPS-13-2-in-1-Header-900-1200x694.jpg&ehk=tWHDlzpThnxQfyWqDAYyixhxIDiOgdkcvjod8DSWdtY%3d&risl=&pid=ImgRaw&r=0"
   },
]

const ItemList = (props) => {

   console.log(props);

   const [productList, setProductList] = useState([])
   const [loader, setLoader] = useState(true)

   console.log(productList);

   useEffect( () => {
      new Promise( (resolve, reject) => {
         setTimeout( () => {
            setLoader(false)
            resolve(PRODUCTS)
         }, 3000)
      })
      .then( (res) => setProductList(res) )
      .catch( (err) => console.log(err) )
   }, [])

   return (
   <section className=" flex justify-center gap-4">
      { loader ? 
         <PulseLoader color="gray" /> :
         productList.map( (product, index) => 
            <Item 
               key={`${index}`} 
               product={product.product} 
               color={product.color} 
               brand={product.brand} 
               image={product.image} 
               component={props.children} 
            /> 
         ) 
      }
   </section>
   )
}

export default ItemList