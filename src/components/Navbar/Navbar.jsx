import CartWidget from "../CartWidget/CartWidget.jsx"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import ToogleThemeWidget from "../ToogleThemeWidget/ToogleThemeWidget.jsx";

const Navbar = () => {

  const [productList, setProductList] = useState([]);

  const { theme, setTheme } = useContext(ThemeContext);

const handleToogle = () => {
  setTheme(theme === "bg-slate-100" ? "bg-slate-700" : "bg-slate-100")
}

  const getAllProducts = () => {
    fetch("https://6539a6a8e3b530c8d9e89144.mockapi.io/api/casper/products")
      .then((res) => res.json())
      .then((data) => {
        const categories = [...new Set(data.map( product => product.category ))]
        setProductList(categories)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <nav className='flex justify-around bg-lime-200 w-full py-2 text-gray-600'>
      <section className="flex items-center">
        <img src="./images/store.png" alt="cart icon" />
        <Link to={"/"} className="flex justify-center items-center h-10 w-24 transition-all ease-in-out bg-[#ff7799] rounded p-2 drop-shadow-sm hover:bg-lime-300 ms-3 font-sansSerif">Home</Link>
      </section>
      <section className=' flex items-center gap-3 font-sansSerif '>
        { productList.map( cat => 
          <Link key={cat} to={`/category/${cat}`} 
            className=' transition-all ease-in-out bg-pink-100 rounded p-2 drop-shadow-sm hover:bg-lime-300'>
            {cat}
          </Link> 
        )}
      </section>
      <ToogleThemeWidget themeChange={ handleToogle } />
      <CartWidget />
    </nav>
  )
}

export default Navbar;