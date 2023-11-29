import { getFirestore, doc, getDocument } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const clientFactory = () => {

   const [ products, setProducts ] = useState([])

   useEffect(() => {
      const db = getFirestore();

      const products = doc(db, "products", "x6Vd0dIhbKCJ68edJ6bt");
      getDocument(docRef).then( (snapshot) => {
         if (snapshot.exists()) {
            setProducts( { id: snapshot.id, ...snapshot.data() } )
         }
      })
   }, [] )

   return (
      <div>clientFactory</div>
   )
}

export default clientFactory