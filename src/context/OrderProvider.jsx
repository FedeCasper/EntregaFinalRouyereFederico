import { OrderContext } from "../context/OrderContext.jsx"
import { useState } from "react"


const OrderProvider = ({ children }) => {

   const [ order, setOrder ] = useState([])
   const [ orderId, setOrderId ] = useState( undefined)

   

   return (
      <OrderContext.Provider value={ { order, setOrder, orderId, setOrderId } }>
         {children}
      </OrderContext.Provider>
   )
}

export default OrderProvider