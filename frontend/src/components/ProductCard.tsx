import { FaPlus } from "react-icons/fa6";

interface ProductCardProps {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  handler: (id: string) => void;
}
const server = 'http://localhost:3001';

function ProductCard({ productId, name, imageUrl, price, stock, handler }: ProductCardProps) {
  return (
    <div className="min-w-[18.75rem] h-[25rem] p-4 flex flex-col justify-start items-center gap-1  relative rounded-lg bg-white shadow-md my-8">
      <img className="h-[15rem] w-[15rem] m-4 object-cover" src={imageUrl} alt={name} />
      <p>{name}</p>
      <span className="font-bold text-lg">₹ {price}</span>
      <div className="absolute h-full w-full top-0 left-0 bg-[#0000006b] flex justify-center items-center opacity-0 hover:opacity-100">
        <button onClick={() => handler(productId)} className="grid h-[3rem] w-[3rem] place-content-center rounded-full border-none bg-[#006A88] pointer transition-all duration-300 hover:rotate-[30deg]">
          <FaPlus size={'1.1rem'} color="white" />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
