import { Link } from "react-router-dom"
import { ThemeContext } from "../../context/ThemeContext.jsx"
import { useContext } from "react"

const NotFound404 = () => {

   const colorTheme = useContext(ThemeContext)

   return (
      <section className={`flex items-center justify-center gap-3 grow ${colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700'}`} >

         <div className="h-fit flex items-center">
            <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
               <div className="w-full lg:w-1/2 mx-8">
                  <div className="text-7xl text-[#FF7799] font-dark font-extrabold mb-8"> 404</div>
                  <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
                     Sorry we couldn't find the page or product you're looking for
                  </p>

                  <Link to={'/'} className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-[#FF7799] hover:bg-[#30E0A1]">back to homepage</Link>
               </div>
               <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
                  <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg" className="" alt="Page not found" />
               </div>

            </div>
         </div>

      </section>
   )
}

export default NotFound404
