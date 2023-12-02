import CartWidget from "../CartWidget/CartWidget.jsx"
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import ToogleThemeWidget from "../ToogleThemeWidget/ToogleThemeWidget.jsx";
import db from "../../firebaseConfig/firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";


const Navbar = () => {

  const { theme, setTheme } = useContext(ThemeContext);
  const [categories, setCategories] = useState([]);
  const [ productsList, setProductList ] =  useState([]);
  const navigate = useNavigate();

  const getAllProducts = () => {
    const productCollection = collection(db, "products");
    getDocs(productCollection)
      .then(snapshot => {
        if (snapshot.size === 0) {
          console.log("There are no products");
        }
        setProductList(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllCategories = () => {
    const categoriesCollection = collection(db, "categories");
    getDocs(categoriesCollection)
      .then(snapshot => {
        if (snapshot.size === 0) {
          console.log("There are no categories");
        }
        setCategories(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToogle = () => {
    setTheme(theme === "bg-slate-100" ? "bg-slate-700" : "bg-slate-100")
  }

  const clearCategories = () => {
    setCategories([]);
  }

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    const category = event.target.value;
    if(category) {
      navigate(`/category/${category}`);
    }
  }

  useEffect(() => {
    getAllCategories()
    return () => {
      clearCategories()
    }
  }, [productsList])

  return (
    <nav className='flex justify-around border border-b-2 border-b-[#FF7799] w-full py-2 text-gray-600'>
      <section className="flex items-center">
        <img src="/images/store.png" alt="cart icon" />
        <Link to={"/"} className="flex justify-center items-center h-10 w-24 transition-all ease-in-out bg-[#30E0A1] rounded p-2 drop-shadow-sm hover:bg-[#ff7799] ms-3 font-sansSerif">Home</Link>
      </section>
      <section className=' flex justify-center items-center gap-3 font-sansSerif w-1/3'>
        <label className="flex w-full">
          <select name="categories" id="selectedOption" className='bg-[#CBD5E1] rounded p-2 drop-shadow-sm w-full' onChange={handleSelectChange}>
            <option value="all">All</option>
            {categories && categories.map( cat =>
                <option key={cat.id} value={cat.description} className="hover:bg-[#ff7799]">{cat.description}</option>
            )}
          </select>
        </label>
      </section>
      <section className="flex items-center gap-8">
        <ToogleThemeWidget themeChange={handleToogle} />
        <Link to={"/cart"} className="flex items-center">
          <CartWidget />
        </Link>
      </section>
    </nav>
  )
}

export default Navbar;