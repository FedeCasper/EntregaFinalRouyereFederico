import Item from '../Item/Item.jsx'
import { useEffect, useState } from "react" 
import PulseLoader from "react-spinners/PulseLoader";

// const PRODUCTS = [
//    {
//       product: "keyboard",
//       description: "A high-quality mechanical keyboard for a great typing experience.",
//       color: "black",
//       brand: "logitech",
//       image: "https://candid.technology/wp-content/uploads/2020/12/msi-lights-feature-2048x1147.jpg"
//    },
//    {
//       product: "mouse",
//       description: "An ergonomic and responsive optical mouse for precise control.",
//       color: "lime",
//       brand: "razer",
//       image: "https://th.bing.com/th/id/OIP.u7OWDE1yIr7W0YSneOQS3gHaE8?pid=ImgDet&rs=1"
//    },
//    {
//       product: "monitor",
//       description: "A 55-inch 4K Ultra HD Smart TV with built-in streaming apps.",
//       color: "black",
//       brand: "dell",
//       image: "https://th.bing.com/th/id/OIP.oYM3lQAsy9FyCajnHNabgQHaE8?pid=ImgDet&rs=1"
//    },
//    {
//       product: "headphones",
//       description: "Over-ear headphones with noise-canceling technology for immersive sound.",
//       color: "red",
//       brand: "sony",
//       image: "https://insta-gaming.nl/wp-content/uploads/2020/10/dragon3-768x768.jpg"
//    },
//    {
//       product: "laptop",
//       description: "A powerful laptop with the latest processor and dedicated graphics card.",
//       color: "purple",
//       brand: "dell",
//       image: "https://th.bing.com/th/id/R.1c40043af725b05a534a512e614a2322?rik=CZmjUkndapyRDA&riu=http%3a%2f%2fcdn1.theinertia.com%2fwp-content%2fuploads%2f2017%2f06%2fDell-XPS-13-2-in-1-Header-900-1200x694.jpg&ehk=tWHDlzpThnxQfyWqDAYyixhxIDiOgdkcvjod8DSWdtY%3d&risl=&pid=ImgRaw&r=0"
//    },
// ]

const ItemList = (props) => {

   const [productList, setProductList] = useState([])
   const [loader, setLoader] = useState(true)

   const fetchProducts = () => {
      fetch("https://6539a6a8e3b530c8d9e89144.mockapi.io/api/casper/products", {
         method: "GET",
         headers: {
            "access-control-allow-origin": "*"
         }
      })
      .then( (res) => res.json() )
      .then((data) => {
         console.log(data);
         setProductList(data)
         setLoader(false)
      })
      .catch( (err) => console.log(err) )
   }

   const getProduct = (id) => {
      console.log(id);
      fetch('https://6539a6a8e3b530c8d9e89144.mockapi.io/api/casper/products/' + id, {
         method: "GET"
      })
      .then( (res) => res.json() )
      .then((data) => {
         console.log(data);
      })
      .catch( (err) => console.log(err) )
   }

   useEffect( () => {
      fetchProducts()
   }, [])

   // useEffect( () => {
   //    new Promise( (resolve, reject) => {
   //       setTimeout( () => {
   //          setLoader(false)
   //          resolve(PRODUCTS)
   //       }, 2000)
   //    })
   //    .then( (res) => setProductList(res) )
   //    .catch( (err) => console.log(err) )
   // }, [])

   return (
   <section className=" flex justify-center flex-wrap gap-4">
      { loader ? 
         <PulseLoader color="gray" /> :
         productList.map( ({id, name, description, price, image}) => 
         <div className="flex flex-col justify-between bg-slate-300 rounded-md h-min-48 w-48 p-2 cursor-pointer shadow-md" key={id} onClick={ () => { getProduct(id) } }>
            <Item 
               name={name} 
               description={description}
               price={price} 
               image={image + "?id=" +id} 
               component={props.children}
            /> 
         </div>
         ) 
      }
   </section>
   )
}

export default ItemList
