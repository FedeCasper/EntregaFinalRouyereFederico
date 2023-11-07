
const ItemDetail = ( {productSelected} ) => {
  console.log(productSelected);
  const {id, name, image, price, description, component} = productSelected
  return (
    <>
      <h1>Estoy en el detalle del producto</h1>
      <div className='h-48 w-24'>
        /* <img src={image + "?id=" +id} alt={name} className="h-32 w-full object-cover mb-2"/>
        <h2 className=" font-bold first-letter:uppercase mb-2">{name}</h2>
        <p className="font-medium first-letter:uppercase">{price}</p>
        <p className=" italic text-sm mb-2">{description}</p>
        {component} */
      </div>
    </>
  )
}

export default ItemDetail