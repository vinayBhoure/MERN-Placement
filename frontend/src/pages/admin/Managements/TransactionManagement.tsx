import Sidebar from "../../../components/admin/Sidebar"
import { OrderType, OrderItemType } from "../../../types"
import { useState } from "react"
import { Link } from "react-router-dom"

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];

function TransactionManagement() {

  const [order, setOrder] = useState<OrderType>({
    name: "vinay bhoure",
    address: "rishi palace colony",
    city: "indore",
    country: "india",
    state: "madhya pradesj",
    pinCode: 452009,
    status: "Processing",
    subtotal: 232,
    discount: 50,
    shippingCharges: 5454,
    tax: 2.5,
    total: 4,
    orderItems,
    _id: "sbanfbnadf",
  })


  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;

  const updateHandler = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };

  
  return (
    <div className="grid grid-cols-5 gap-8 h-[100vh] bg-slate-200">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 flex justify-center items-center gap-4">

        <section className="overflow-y-auto w-full h-[85vh] max-w-[500px] shadow-md bg-white p-8 flex flex-col gap-4 relative rounded">
              <h2 className="text-xl text-center">Order Items</h2>
              {order.orderItems.map((item) => (
                <ProductCard
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  photo={item.photo}
                  _id={item._id} />
              ))}
        </section>

        <section className="h-[85vh] p-8 w-full max-w-[400px] bg-white rounded-md shadow-md">
         
         <h1 className="text-2xl text-center">Order Info</h1>
         <h5 className="text-lg mt-6 ml-2 font-700">User Info</h5>
         <p className="m-2">Name: {name}</p>
         <p className="m-2">
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>

          <h5 className="text-lg mt-6 ml-2 font-700">Amount Info</h5>
          <p className="m-2">Subtotal: {subtotal}</p>
          <p className="m-2">Shipping Charges: {shippingCharges}</p>
          <p className="m-2">Tax: {tax}</p>
          <p className="m-2">Discount: {discount}</p>
          <p className="m-2">Total: {total}</p>

          <h5 className="text-lg mt-6 ml-2 font-700">Status Info</h5>
          <p className="m-2">
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "text-purple-600"
                  : status === "Shipped"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {status}
            </span>
          </p>
          <button className="my-8 p-4 bg-blue-600 text-white w-full rounded cursor-pointer hover:opacity-80" 
          onClick={updateHandler}>Process Status</button>
        </section>
      </main>

    </div>
  )
}

const ProductCard = ({ name, price, quantity, photo, _id }: OrderItemType) => {
  return (
    <div className="flex items-center gap-2"> 
      <img src={photo} alt={name} className="h-full max-h-[4rem] max-w-[4rem] w-full rounded object-cover"></img>
      <Link to={`/product/${_id}`}>{name}</Link>
      {": "}
      <span>${price} X {quantity} = ${price*quantity}</span>
    </div>
  ) 
}

export default TransactionManagement
