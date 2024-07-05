
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import CartItem from "@/components/CartItem"
import { useDispatch, useSelector } from "react-redux"
import { CartState, addToCart, calculatePrice, deleteItem, discountApplied, removeFromCart } from "@/redux/reducer/cartReducer"
import toast from "react-hot-toast"
import { VscError } from "react-icons/vsc"
import { server } from "@/redux/store"

export default function Component() {

  const {
    cartItems,
    subtotal,
    tax,
    shippingCharges,
    discount: cartDiscount,
    total
  } = useSelector((state: { cartReducer: CartState }) => state.cartReducer)
  const dispatch = useDispatch()


  const [cart, setCart] = useState([...cartItems])
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const [discount, setDiscount] = useState(cartDiscount)

  const handleIncrement = (id: string) => {
    const item = cart.find((item) => item.productId === id)
    if (item?.quantity === item?.stock) {
      toast.error('Reached maximum quantity');
      return
    }
    dispatch(addToCart(item!))
  }
  const handleDecrement = (id: string) => {
    if (cart.find((item) => item.productId === id)?.quantity === 1) return
    dispatch(deleteItem(id))
  }
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id))
    toast.success('Item removed from cart')
  }
  const handleCoupon = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value)
  }


  useEffect(() => {

    const timeoutId = setTimeout(async () => {

      try {

        //Write a code to cancel the fetch request?

        const result = await fetch(`${server}/api/v1/payment/discount?code=${couponCode}`);
        const data = await result.json();

        if (data.success) {
          if (total <= discount) {
            toast.error('Add more items to apply coupon code');
          }
          dispatch(discountApplied(data.discount));
          setIsValidCouponCode(true);
          setDiscount(data.discount);
          dispatch(calculatePrice())
        } else {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          setDiscount(0);
          dispatch(calculatePrice());
        }
      } catch (err) {
        console.log(err);
      }

    }, 1000)

    return () => {
      clearTimeout(timeoutId);
      // cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode])

  useEffect(() => {

    setCart(cartItems)
    dispatch(calculatePrice())
  }, [cartItems])
  return (
    <section className="w-full py-12 bg-[#f7f7f7]" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-6">

        <div className="col-span-2 gap-6 md:gap-8 p-4 bg-white shadow-md rounded-md overflow-y-hidden">
          <div className="gap-6 md:gap-8 p-4 h-full flex flex-col">
            <h1 className="text-2xl pb-4 font-bold tracking-tight">Your Cart</h1>
            <Separator />
            <ul className="grid overflow-y-auto py-4 gap-4 ">
              {cart.length === 0 ? <p>No Item Added</p> : cart.map((item) => (

                <CartItem
                  cartItem={item}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleRemove={handleRemove} />
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 md:gap-8 p-4 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold tracking-tight">Order Summary</h1>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="text-green-600">+${shippingCharges.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span className="text-green-600">+${tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span className="text-red-600">-${discount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="coupon">Coupon Code</Label>
            <div className="flex flex-col gap-2">
              <Input id="coupon" placeholder="Enter coupon code" value={couponCode} onChange={handleCoupon} />
              {couponCode &&
                (
                  isValidCouponCode ?
                    <span className="text-green-600"> ₹{discount} off using the <code>{couponCode}</code></span> :
                    <span className="text-red-600 flex items-center gap-1">Invalid Coupon <VscError /></span>
                )
              }
            </div>
          </div>
          <Link to="/shipping">
            <Button className="w-full"> Book Now</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}