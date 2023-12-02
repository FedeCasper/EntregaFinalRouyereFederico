import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ToogleThemeWidget = ( { themeChange } ) => {

   const { theme } = useContext(ThemeContext);

   return (
      <div className="flex w-16  items-center justify-center">
         {
            theme === 'bg-slate-100' ? (
               <DarkModeIcon className=" text-[#C1C1C1]" />
            ) : (
               <Brightness7Icon className=" text-[#C1C1C1]" />
            )
         }
         <label  className="relative inline-flex cursor-pointer items-center">
            <input id="switch" type="checkbox" className="peer sr-only" />
            <label htmlFor="switch" className="hidden"></label>
            <div 
            onClick={ () => { themeChange() } } 
            className="peer h-6 w-11 rounded-full border bg-slate-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
         </label>
      </div>
   )
}

export default ToogleThemeWidget