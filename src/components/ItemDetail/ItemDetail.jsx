
const ItemDetail = ( {productSelected} ) => {
  console.log(productSelected);
  const {id, name, image, price, description} = productSelected
  return (
    <>
      <h1>Estoy en el detalle del producto</h1>
      <div className='flex h-2/3 w-10/12 bg-lime-200 p-3'>
        <img src={image + "?id=" +id} alt={name} className="h-full w-1/3 object-cover mb-2"/>
        <article className="px-4">
          <h2 className=" font-bold first-letter:uppercase text-2xl mb-2">{name}</h2>
          <p className="font-medium first-letter:uppercase text-xl mb-2">{price}</p>
          <p className=" italic text-sm mb-2">{description}</p>
        </article>
      </div>
    </>
  )
}

export default ItemDetail