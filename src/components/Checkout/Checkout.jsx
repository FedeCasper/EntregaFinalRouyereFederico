import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { OrderContext } from '../../context/OrderContext'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig/firebaseConfig.js'

const Checkout = () => {

  const colorTheme = useContext(ThemeContext)
  const { theme, setTheme } = useContext(ThemeContext);
  const { orderId, order, setOrder } = useContext(OrderContext);
  const [orderList, setOrderList ] = useState([]);

  const getOrderById = (id) => {
    const biciRef = doc(db, "orders", id);
    getDoc(biciRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setOrder({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllOrders = () => {
    const ordersCollection = collection(db, "orders");
    getDocs(ordersCollection)
      .then(snapshot => {
        if (snapshot.size === 0) {
          console.log("There are no orders");
        }
        setOrderList(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectChange = (e) => {
    const selectedOrder = orderList.find((order) => order.id === e.target.value);
    setOrder(selectedOrder);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId);
    }
  }, [orderId]);

  return (
    <section className={`flex flex-col justify-evenly items-center gap-3 grow ${colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700'}`}>

      <div className='flex flex-col justify-center items-center gap-2'>
        <img src="/images/checklist.svg" alt="" className='h-32' />
        <h2 className={` w-ful text-2xl font-sansSerif text-center ${ colorTheme.theme === 'bg-slate-100' ?  'text-gray-600 my-3' : ' text-slate-100 my-3' } `}>Thank you for your purchase!</h2>
        <section className='flex flex-col justify-center items-center bg-[#E5E5E5] p-2 rounded-md w-full'>
          <p className='text-base'>
            Order #ID
            <span className='font-bold italic font-sansSerif text-[#FF7799]'> {orderId} </span>
          </p>
        </section>
      </div>

      <select name='orderList' className='bg-[#CBD5E1] rounded p-2 drop-shadow-sm' onChange={handleSelectChange}>
        <option value="">Select an order</option>
        {orderList.map((order) => (
          <option key={order.id} value={order.id}> Order #ID: {order.id} - ( {order.date.toDate().toLocaleString()} )</option>
        ))}
      </select>

      <div className='flex flex-col justify-center items-center gap-2'>
        <h3 className={`font-sansSerif text-lg text-gray-600 ${ colorTheme.theme === 'bg-slate-100' ?  'text-gray-600 ' : ' text-slate-100 ' }`}>Customer: {order?.buyer?.name} {order?.buyer?.lastName}</h3>
        <h3 className={`font-sansSerif text-lg text-gray-600 ${ colorTheme.theme === 'bg-slate-100' ?  'text-gray-600 ' : ' text-slate-100 ' }`}>Date: {order?.date?.toDate().toLocaleString()} </h3>
        <table className="min-w-3/4">
          <thead className="bg-white border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product #id</th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product Name</th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">quantity</th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {
              order?.items?.map((item) => (
                <tr key={item.id} className="bg-[#E5E5E5] border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${item.price}</td>
                </tr>
              ))
            }
            <tr className="bg-[#C1C1C1] border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td colSpan="2" className="text-sm text-gray-700 font-bold px-6 py-4 whitespace-nowrap text-center">
                Total:
              </td>
              <td className="text-sm text-gray-700 font-bold px-6 py-4 whitespace-nowrap">
                ${order?.total?.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </section>
  )
}

export default Checkout