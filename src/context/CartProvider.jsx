import { CartContext } from './CartContext'
import { useEffect, useState } from 'react'

const CartProvider = ( {children} ) => {

  const [ products, setProducts ] = useState( [] )
  const [ productQuantity, setProductQuantity ] = useState( 0 )

  const addItem = ( product, quantity ) => {
    if ( isInCart( product.id ) ) {
      const newProducts = products.map( productInCart => {
        if ( productInCart.id === product.id ) {
          return {
            ...productInCart,
            quantity: productInCart.quantity + quantity
          }
        }
        return productInCart
      } )
      setProducts( newProducts )
    } else {
      setProducts(
        [ ...products, { ...product, quantity, }, ]
      );
    }
  };

  const removeItem = ( id ) => {
    setProducts( products.filter( product => product.id !== id ) )
  }

  const clear = () => {
    setProducts( [] )
  }

  const isInCart = ( id ) => {
    return products.some( product => product.id === id )
  }

  useEffect( () => {
    setProductQuantity( 
      products.reduce( ( acc, product ) => acc + product.quantity, 0 ) 
      )
  }, [ products ] )

  return (
    <CartContext.Provider value={ { products, addItem, productQuantity, clear, removeItem } }>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
