import { CartWidget } from "../CartWidget/CartWidget"

export const Navbar = () => {
  return (
    <div className='flex justify-around bg-lime-200 w-full py-2'>
      <h1 className=' flex items-center'>Casper's Store</h1>
      <section className=' flex items-center gap-3 '>
        <button className=' bg-green-300 rounded p-2 drop-shadow-md'>Category_1</button>
        <button className=' bg-green-300 rounded p-2 drop-shadow-md'>Category_2</button>
        <button className=' bg-green-300 rounded p-2 drop-shadow-md'>Category_3</button>
        <button className=' bg-green-300 rounded p-2 drop-shadow-md'>Category_4</button>
      </section>
      <CartWidget />
    </div>
  )
}
