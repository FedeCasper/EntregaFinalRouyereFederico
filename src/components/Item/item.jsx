import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Item = ({title, description, price, image, category, quantity, stock}) => {

   return (
      <div className="flex flex-col justify-between h-full bg-[#CCCCCC] rounded-md h-min-48 w-48 p-2 cursor-pointer shadow-md transition hover:bg-[#FF7799] hover:scale-95">
         <section className='relative'>
            
            {
               image && <img src={image} alt={title} className="h-32 w-full object-cover mb-2 bg-white p-2"/>
            }
            <h2 className=" font-bold first-letter:uppercase mb-2">{title.length > 18 ? `${title.substring(0, 18)}` : title}</h2>
            {
               category && <p className=" italic text-sm mb-2 font-semibold"><LocalOfferIcon className='text-[#30E0A1]'/> {category}</p>
            }
         </section>
            {
               description && <p className=" italic text-sm mb-2">{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
            }
            <p className="font-medium first-letter:uppercase">USD {price}</p>
            {
               quantity && <p className=" italic text-sm mb-2 font-semibold"><AddShoppingCartIcon className='text-[#FF7799]'/> {quantity}</p>
            }
            {
               stock ?
               <h6 className=" italic text-xs mb-2 font-semibold">Stock: {stock}</h6> :
               <p> Not available in stock </p>
            }
      </div>
   )
}

export default Item