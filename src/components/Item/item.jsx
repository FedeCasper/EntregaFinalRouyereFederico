const Item = ({title, description, price, image, category}) => {

   return (
      <div className="flex flex-col justify-between h-full bg-[#CCCCCC] rounded-md h-min-48 w-48 p-2 cursor-pointer shadow-md transition hover:bg-[#FF7799] hover:scale-95">
         <section>
            <img src={image} alt={title} className="h-32 w-full object-contain mb-2 bg-white p-3"/>
            <h2 className=" font-bold first-letter:uppercase mb-2">{title.length > 18 ? `${title.substring(0, 18)}` : title}</h2>
         </section>
            <p className=" italic text-sm mb-2">{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
            <p className="font-medium first-letter:uppercase">USD {price}</p>
            <p className=" italic text-sm mb-2 font-semibold">Category: {category}</p>
      </div>
   )
}

export default Item