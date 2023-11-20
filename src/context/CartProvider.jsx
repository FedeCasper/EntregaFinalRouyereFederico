import { CartContext } from './CartContext'
import { useEffect, useState } from 'react'

const CartProvider = ( {children} ) => {

  const [ products, setProducts ] = useState( [] )
  const [ productQuantity, setProductQuantity ] = useState( 0 )

  console.log(products);

  const addItem = ( product, quantity ) => {
    console.log(quantity);
    setProducts( [
      ...products,
      { 
        ...product,
        quantity, 
      },
    ] );
  };

  useEffect( () => {
    setProductQuantity( products.reduce( ( acc, product ) => acc + product.quantity, 0 ) )
  }, [ products ] )

  return (
    <CartContext.Provider value={ { products, addItem, productQuantity } }>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
