import { CartWidget } from "../CartWidget/CartWidget"

export const Navbar = () => {
  return (
    <div className='flex justify-around bg-lime-200 w-full py-2 text-gray-600'>
      
      <img src="./store.png" alt="" /> 
      <section className=' flex items-center gap-3 font-sansSerif '>
        <button className=' transition-all ease-in-out bg-pink-100 rounded p-2 drop-shadow-md hover:bg-lime-300'>Category_1</button>
        <button className=' transition-all ease-in-out bg-pink-100 rounded p-2 drop-shadow-md hover:bg-lime-300 '>Category_2</button>
        <button className=' transition-all ease-in-out bg-pink-100 rounded p-2 drop-shadow-md hover:bg-lime-300 '>Category_3</button>
        <button className=' transition-all ease-in-out bg-pink-100 rounded p-2 drop-shadow-md hover:bg-lime-300 '>Category_4</button>
      </section>
      <CartWidget />
    </div>
  )
}
