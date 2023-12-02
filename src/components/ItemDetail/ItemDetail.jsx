
import { useEffect } from "react";
const ItemDetail = ( { productSelected, children } ) => {

  const { title, image, price, description } = productSelected

  useEffect(() => {
    console.log(title);
  }, [productSelected]);

  return (
    <>
      <h1>Product Details</h1>
        <div className='flex w-10/12 lg:w-3/6 bg-lime-200 p-3'>
          <img src={image} alt={title} className="h-full w-1/3 object-cover mb-2 bg-white p-1"/>
          <article className="h-full flex flex-col px-4">
            <h2 className=" font-bold first-letter:uppercase text-2xl mb-2">
              {title}
            </h2>
            <p className="font-medium first-letter:uppercase text-xl mb-2">
              UDS {price}
            </p>
            <p className=" italic text-sm mb-2">
              {description}
            </p>
            <div className="mt-auto">
              {children}
            </div>
          </article>
        </div>
    </>
  )
}

export default ItemDetail