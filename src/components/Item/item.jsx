const Item = ({name, description, price, image, category, component}) => {

   return (
      <>
         <img src={image} alt={name} className="h-32 w-full object-cover mb-2"/>
         <h2 className=" font-bold first-letter:uppercase mb-2">{name}</h2>
         <p className="font-medium first-letter:uppercase">{price}</p>
         <p className=" italic text-sm mb-2">{description}</p>
         <p className=" italic text-sm mb-2">{category}</p>
         {component}
      </>
   )
}

export default Item