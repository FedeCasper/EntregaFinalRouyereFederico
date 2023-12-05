import { useEffect } from "react";

const ItemDetail = ( { productSelected, children } ) => {

  const { title, image, price, description } = productSelected

  useEffect(() => {
    console.log(title);
  }, [productSelected]);

  return (
    <>
      <div className='flex justify-between gap-4 w-10/12 lg:w-3/6 bg-[#E5E5E5] p-3 shadow-md'>
        <img src={image} alt={title} className="h-full w-3/6 object-cover mb-2 bg-white p-1"/>
        <article className="h-full flex flex-col w-3/6">
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