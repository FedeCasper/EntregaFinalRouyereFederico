import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { OrderContext } from '../../context/OrderContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig/firebaseConfig.js'

const Checkout = () => {

  const colorTheme = useContext(ThemeContext)
  const { theme, setTheme } = useContext(ThemeContext);
  const { orderId, order, setOrder } = useContext(OrderContext);

  const getOrderById = (id) => {
    const biciRef = doc(db, "orders", id);
    getDoc(biciRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setOrder({ id: snapshot.id, ...snapshot.data() });
        } else {
          // setProduct({});
          console.log("No such document!");
          // navigate("/*");
        }
      })
      .catch((error) => {
        // setProduct({});
        console.log(error);
        // navigate("/*");
      });
  };

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId);
    }
  }, [orderId]);

  return (
    <section className={`flex flex-col justify-center items-center gap-3 grow ${ colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700'}`}>
      <section className='flex flex-col justify-center items-center gap-3 m-4 bg-[#E5E5E5] p-4 rounded-md'>
        <h2 className='text-xl'>Your purchase was successful, the corresponding id generated is:</h2>
        <h3 className='font-bold italic font-sansSerif text-[#FF7799]'>{orderId}</h3>
      </section>
      <h3 className='font-sansSerif text-gray-600'>Customer: {order?.buyer?.name} {order?.buyer?.lastName}</h3>
      <h3 className='font-sansSerif text-gray-600'>Date: {order?.date?.toDate().toLocaleString()} </h3>

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
              order?.items?.map( (item) => (
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

    </section>
  )
}

export default Checkout