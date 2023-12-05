import { useEffect, useContext, useState } from "react";
import ItemDetail from "../../components/ItemDetail/ItemDetail.jsx";
import { useParams } from "react-router-dom";
import ItemCount from "../../components/ItemCount/ItemCount.jsx";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import SyncLoader from "react-spinners/SyncLoader";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig.js";
import { useNavigate } from "react-router-dom";

const ItemDetailContainer = () => {

   const { id } = useParams();
   const colorTheme = useContext(ThemeContext)
   const [ product, setProduct ] = useState({})
   const navigate = useNavigate();

   const getProductById = (id) => {
      const biciRef = doc(db, "products", id);
      getDoc(biciRef)
      .then( snapshot => {
         if (snapshot.exists()) {
            setProduct( { id: snapshot.id, ...snapshot.data() } );
         } else {
            setProduct( {} );
            console.log("No such document!");
            navigate("/*");
         }
      })
      .catch((error) => {
         setProduct( {} );
         console.log(error);
         navigate("/*");
      });
   };

   const resetProduct = () => {
      setProduct({})
   }

   useEffect(() => {
      getProductById(id)
      return () => {
         resetProduct();
      }
   }, []);

   return (
      <section className={ `flex flex-col justify-center items-center gap-3 grow ${ colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700' }` }>
         <h2 className={` w-ful text-2xl font-sansSerif text-center ${ colorTheme.theme === 'bg-slate-100' ?  'text-gray-600 my-3' : ' text-slate-100 my-3' } `}>Product Details</h2>
         {
            !product.title ? 
               <SyncLoader color="#30E0A1" /> :
               <ItemDetail productSelected={ product } >
                  <ItemCount productSelected={ product }/>
               </ItemDetail> 
         }
      </section>
   )
}

export default ItemDetailContainer;
