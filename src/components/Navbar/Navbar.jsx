import CartWidget from "../CartWidget/CartWidget.jsx"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [productList, setProductList] = useState([]);

  const getAllProducts = () => {
    fetch("https://6539a6a8e3b530c8d9e89144.mockapi.io/api/casper/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const categories = [...new Set(data.map( product => product.category ))]
        console.log(categories);
        setProductList(categories)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <nav className='flex justify-around bg-lime-200 w-full py-2 text-gray-600'>
      <img src="./images/store.png" alt="cart icon" />
      <section className=' flex items-center gap-3 font-sansSerif '>
        { productList.map( cat => 
          <Link key={cat} to={`/category/${cat}`} 
            className=' transition-all ease-in-out bg-pink-100 rounded p-2 drop-shadow-md hover:bg-lime-300'>
            {cat}
          </Link> 
        )}
      </section>
      <CartWidget />
    </nav>
  )
}

export default Navbar;