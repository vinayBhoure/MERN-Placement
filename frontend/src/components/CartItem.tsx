import { Link } from "react-router-dom"
import { Button } from "./ui/button"

interface CartItemProps {
  cartItem: any,
  handleIncrement: (id: string) => void,
  handleDecrement: (id: string) => void,
  handleRemove: (id: string) => void
}

// image, productId name, price quantity

function CartItem({ cartItem, handleIncrement, handleDecrement, handleRemove }: CartItemProps) {
  return (
    // <div className="flex w-full">
    //   <img src={cartItem.imageUrl} alt={cartItem.name} />
    //   <div className="flex justify-between w-full">
    //     <article>
    //       <Link to={`/product/${cartItem.productId}`}><h3>{cartItem.name}</h3></Link>
    //       <span>{cartItem.price}</span>
    //     </article>
    //     <div className="w-[4rem]">
    //       <button>-</button>
    //       <span>{cartItem.quantity}</span>
    //       <button>+</button>
    //     {/* <button>Remove</button> */}
    //     </div>
    //   </div>

    // </div>
    <>
      <li
        key={cartItem.productId}
        className="grid grid-cols-[100px_1fr_80px] md:grid-cols-[100px_1fr_100px] items-center gap-4"
      >
        <img
          src={cartItem.photo}
          alt={cartItem.name}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
        <div className="grid gap-1">
          <Link to={`/product/${cartItem.productId}`}>
            <h3 className="font-semibold">{cartItem.name}</h3>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-6 h-6 md:w-8 md:h-8"
              onClick={() => handleDecrement(cartItem.productId)}
            >
              <MinusIcon className="w-4 h-4" />
            </Button>
            <span>{cartItem.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="w-6 h-6 md:w-8 md:h-8"
              onClick={() => handleIncrement(cartItem.productId)}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-semibold">${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
          <Button
            variant="outline"
            size="icon"
            className="w-6 h-6 md:w-8 md:h-8"
            onClick={() => handleRemove(cartItem.productId)}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </li>
    </>
  )
}

export default CartItem

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
