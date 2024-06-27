
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import CartItem from "@/components/CartItem"

export default function Component() {
  const [cart, setCart] = useState([
    {
      productId: "asfklsmdg",
      name: "Cozy Blanket",
      price: 29.99,
      quantity: 2,
      photo: "/placeholder.svg",
      stock: 10,
    },
    {
      productId: "asfklsg",
      name: "Pillow",
      price: 19.99,
      quantity: 1,
      photo: "/placeholder.svg",
      stock: 10,
    },
    {
      productId: "fklsmdg",
      name: "Candle",
      price: 9.99,
      quantity: 3,
      photo: "/placeholder.svg",
      stock: 10,
    },

  ])


  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)

  const handleIncrement = (id: string) => {
    setCart(cart.map((item) => (item.productId === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }
  const handleDecrement = (id: string) => {
    setCart(cart.map((item) => (item.productId === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)))
  }
  const handleRemove = (id: string) => {
    setCart(cart.filter((item) => item.productId !== id))
  }
  const handleCoupon = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value)
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shippingCharges = subtotal > 100 ? 0 : 10
  const total = subtotal - discount + shippingCharges + tax

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (coupon === "SAVE20") {
        setDiscount(20)
      } else {
        setDiscount(0)
      }
    }, 1000)
    return () => {
      clearTimeout(timeoutId)
    }
  })
  return (
    <section className="w-full py-12 bg-[#f7f7f7]" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="container grid lg:grid-cols-3 gap-6 px-4 md:px-6">

        <div className="grid col-span-2  gap-6 md:gap-8 p-4 bg-white shadow-md rounded-md overflow-y-hidden">
          <h1 className="text-2xl font-bold tracking-tight">Your Cart</h1>
          <Separator />
          <ul className="grid gap-6 overflow-y-auto ">
            {cart.map((item, i) => (
              // <>
              //   <li
              //     key={item.productId}
              //     className="grid grid-cols-[100px_1fr_80px] md:grid-cols-[100px_1fr_100px] items-center gap-4"
              //   >
              //     <img
              //       src="/placeholder.svg"
              //       alt={item.name}
              //       width={100}
              //       height={100}
              //       className="rounded-lg object-cover"
              //     />
              //     <div className="grid gap-1">
              //       <h3 className="font-semibold">{item.name}</h3>
              //       <div className="flex items-center gap-2">
              //         <Button
              //           variant="outline"
              //           size="icon"
              //           className="w-6 h-6 md:w-8 md:h-8"
              //           onClick={() => handleDecrement(item.productId)}
              //         >
              //           <MinusIcon className="w-4 h-4" />
              //         </Button>
              //         <span>{item.quantity}</span>
              //         <Button
              //           variant="outline"
              //           size="icon"
              //           className="w-6 h-6 md:w-8 md:h-8"
              //           onClick={() => handleIncrement(item.productId)}
              //         >
              //           <PlusIcon className="w-4 h-4" />
              //         </Button>
              //       </div>
              //     </div>
              //     <div className="flex flex-col items-end gap-1">
              //       <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              //       <Button
              //         variant="outline"
              //         size="icon"
              //         className="w-6 h-6 md:w-8 md:h-8"
              //         onClick={() => handleRemove(item.productId)}
              //       >
              //         <TrashIcon className="w-4 h-4" />
              //       </Button>
              //     </div>
              //   </li>
              // </>
              <CartItem 
              cartItem={item} 
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              handleRemove={handleRemove} />
            ))}
          </ul>
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
              <span>${shippingCharges.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="coupon">Coupon Code</Label>
            <div className="flex gap-2">
              <Input id="coupon" placeholder="Enter coupon code" value={coupon} onChange={handleCoupon} />
              <Button variant="outline">Apply</Button>
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