import CartWidget from "../CartWidget/CartWidget.jsx"
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import ToogleThemeWidget from "../ToogleThemeWidget/ToogleThemeWidget.jsx";
import { ProductsContext } from '../../context/ProductsContext.jsx';

const Navbar = () => {

  const { theme, setTheme } = useContext(ThemeContext);
  const { productsList } = useContext(ProductsContext)
  const [ categories, setCategories ] = useState([]);

  const handleToogle = () => {
    setTheme(theme === "bg-slate-100" ? "bg-slate-700" : "bg-slate-100")
  }

  const getCategories = () => {
    if (productsList) {
      const categories = [...new Set(productsList.map(product => product.category))];
      setCategories(categories);
    }
    return [];
  }

  useEffect(() => {
    getCategories()
  }, [productsList])

  return (
    <nav className='flex justify-around border border-b-2 border-b-[#FF7799] w-full py-2 text-gray-600'>
      <section className="flex items-center">
        <img src="/images/store.png" alt="cart icon" />
        <Link to={"/"} className="flex justify-center items-center h-10 w-24 transition-all ease-in-out bg-[#ff7799] rounded p-2 drop-shadow-sm hover:bg-lime-300 ms-3 font-sansSerif">Home</Link>
      </section>
      <section className=' flex items-center gap-3 font-sansSerif '>
        { categories && categories.map( cat => 
          <Link key={cat} to={`/category/${cat}`} 
            className=' transition-all ease-in-out bg-pink-100 rounded p-2 drop-shadow-sm hover:bg-lime-300'>
            {cat}
          </Link> 
        ) }
      </section>
      <ToogleThemeWidget themeChange={ handleToogle } />
      <Link to={"/cart"}>
        <CartWidget />
      </Link>
    </nav>
  )
}

export default Navbar;