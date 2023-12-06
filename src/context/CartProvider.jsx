import { CartContext } from './CartContext'
import { useEffect, useState } from 'react'

const CartProvider = ( {children} ) => {

  const [ products, setProducts ] = useState( [] )
  const [ productQuantity, setProductQuantity ] = useState( 0 )

  const addItem = ( product, quantity ) => {

    // If the product is in the cart
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

    // If the product is not in the cart
    } else {
      setProducts( [ ...products, { ...product, quantity, }, ] );
    }
  };

  const removeItem = ( id ) => {
    setProducts( products.filter( product => product.id !== id ) )
  }

  const clear = () => {
    setProducts( [] )
    sessionStorage?.clear()
  }

  const isInCart = ( id ) => {
    return products.some( product => product.id === id )
  }

  useEffect(() => {
    sessionStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect( () => {
    const productsSessionStorage = JSON.parse( sessionStorage.getItem( 'products' ) )
    setProductQuantity( 
      productsSessionStorage?.reduce( ( acc, product ) => acc + product.quantity, 0 ) 
      )
  }, [ products ] )

  return (
    <CartContext.Provider value={ { products, addItem, productQuantity, clear, removeItem } }>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
