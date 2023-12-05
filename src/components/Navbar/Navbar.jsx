import CartWidget from "../CartWidget/CartWidget.jsx"
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import ToogleThemeWidget from "../ToogleThemeWidget/ToogleThemeWidget.jsx";
import { db } from '../../firebaseConfig/firebaseConfig.js'
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getAuth, signOut } from 'firebase/auth';
import ViewListIcon from '@mui/icons-material/ViewList';

const Navbar = () => {

  const { theme, setTheme } = useContext(ThemeContext);
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [productsList, setProductList] = useState([]);
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
    if (category) {
      navigate(`/category/${category}`);
    }
  }

  const handleLogout = () => {
    try {
      const auth = getAuth();
      signOut(auth);
      setTimeout(() => {
        setAuthUser(null);
        navigate('/')
      }, 1000);
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  useEffect(() => {
    getAllCategories()
    return () => {
      clearCategories()
    }
  }, [productsList])

  return (
      authUser?.auth?.currentUser &&
    <nav className='flex justify-between w-full px-8 text-gray-600'>

      <section className="flex items-center">
        <img src="/images/store.png" alt="cart icon" />
        <Link to={"/home"} className="flex justify-center items-center h-10 w-24 transition-all ease-in-out bg-[#30E0A1] rounded p-2 drop-shadow-sm hover:bg-[#ff7799] ms-3 font-sansSerif">Home</Link>
      </section>

      <section className=' flex justify-center items-center gap-3 font-sansSerif w-1/3'>
        <label className="flex w-full">
          <select name="categories" id="selectedOption" className='bg-[#CBD5E1] rounded p-2 drop-shadow-sm w-full' onChange={handleSelectChange}>
            <option value="all">All</option>
            {categories && categories.map(cat =>
              <option key={cat.id} value={cat.description} className="hover:bg-[#ff7799]">{cat.description}</option>
            )}
          </select>
        </label>
      </section>

      <section className="flex items-center gap-4">
        <ToogleThemeWidget themeChange={handleToogle} />
        <Link to={"/wishList"}>
          <ViewListIcon fontSize='large' titleAccess="Wish List"/>
        </Link>
        <Link to={"/cart"} className="flex items-center">
          <CartWidget />
        </Link>
        <button className="flex self-center justify-center items-center h-10 w-24 transition-all ease-in-out bg-[#ff7799] rounded p-2 drop-shadow-sm duration-300 hover:scale-95 hover:bg-[#30E0A1] ms-3 font-sansSerif" onClick={handleLogout}>Logout</button>
      </section>
      
    </nav>

  )
}

export default Navbar;