import { CartWidget } from "../CartWidget/CartWidget"

export const Navbar = () => {
  return (
    <div className='flex justify-around bg-lime-200 w-full py-2 text-gray-600'>
      <h1 className=' flex items-center font-serif '>Casper's Store</h1>
      <section className=' flex items-center gap-3 font-sansSerif '>
        <button className=' transition-all ease-in-out bg-green-300 rounded p-2 drop-shadow-md hover:bg-teal-500 hover:text-lime-200'>Category_1</button>
        <button className=' transition-all ease-in-out bg-green-300 rounded p-2 drop-shadow-md hover:bg-teal-500 hover:text-lime-200'>Category_2</button>
        <button className=' transition-all ease-in-out bg-green-300 rounded p-2 drop-shadow-md hover:bg-teal-500 hover:text-lime-200'>Category_3</button>
        <button className=' transition-all ease-in-out bg-green-300 rounded p-2 drop-shadow-md hover:bg-teal-500 hover:text-lime-200'>Category_4</button>
      </section>
      <CartWidget />
    </div>
  )
}
