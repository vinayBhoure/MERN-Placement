import { CartItem } from "@/types/types";
import { FaPlus } from "react-icons/fa6";

interface ProductCardProps {
  productId: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => void;
}
const server = 'http://localhost:3000';

function ProductCard({ productId, name, photo, price, stock, handler }: ProductCardProps) {
  return (

    <div key={productId} className="bg-background relative rounded-lg shadow-md overflow-hidden md:min-w-[15rem] min-w-[13rem]">
      <img
        src={`${server}/${photo}`} // {server + photo}
        alt={name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        {/* <p className="text-sm text-muted-foreground">{product.tagline}</p> */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold">₹ {price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4" />
              {/* <span>{product.rating}</span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-full w-full top-0 left-0 bg-[#0000006b] flex justify-center items-center opacity-0 hover:opacity-100">
        <button onClick={() => handler({
          productId,
          name,
          photo,
          price,
          stock,
          quantity: 1
        })} className="grid h-[3rem] w-[3rem] place-content-center rounded-full border-none bg-[#006A88] pointer transition-all duration-300 hover:rotate-[30deg]">
          <FaPlus size={'1.1rem'} color="white" />
        </button>
      </div>
    </div>
  )
}

export default ProductCard

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
