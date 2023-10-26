const Item = ({name, description, price, image, component}) => {

   return (
      <div className="flex flex-col justify-between bg-slate-300 rounded-md h-min-48 w-48 p-2 cursor-pointer shadow-md">
         <img src={image} alt={name} className="h-32 w-full object-cover mb-2"/>
         <h2 className=" font-bold first-letter:uppercase mb-2">{name}</h2>
         <p className=" italic text-sm mb-2">{description}</p>
         <p className="font-medium first-letter:uppercase">{price}</p>
         {component}
      </div>
   )
}

export default Item