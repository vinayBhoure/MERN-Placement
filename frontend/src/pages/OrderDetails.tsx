import Loader from "@/components/Loader";
import { useGetOrderDetailsQuery } from "@/redux/api/orderAPI";
import { server } from "@/redux/store";
import { CustomError } from "@/types/apiTypes";
import { OrderItemType, OrderResponseType } from "@/types/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


function OrderDetails() {

  const params = useParams();
  const { data: orderDetail, isLoading, isError, error } = useGetOrderDetailsQuery(params.id!);

  if (isError) {
    toast.error((error as CustomError).data.message);
  }

  const [order, setOrder] = useState<OrderResponseType>({
    orderItems: [],
    shippingInfo: {
      city: '',
      country: '',
      state: '',
      address: '',
      pinCode: 0,

    },
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    status: '',
    user: {
      name: '',
      _id: ''
    },
    _id: ''
  })

  useEffect(() => {
    if (orderDetail) {
      setOrder(orderDetail.order)
    }
  }, [orderDetail])

  return (
    <main className=" p-8 col-span-4 flex justify-center items-center gap-4 bg-[#f7f7f7]" style={{ minHeight: 'calc(100vh - 4rem)' }}>

      {isLoading ? <Loader /> :
        <>
          <button className="h-[2.5rem] w-[2.5rem] bg-black grid place-content-center fixed top-20 left-12 rounded-full pointer transition-all duration-300" onClick={() => { history.go(-1) }}
          ><BiArrowBack color="white" className="hover:-translate-x-1"></BiArrowBack></button>

          <section className="overflow-y-auto w-full h-[85vh] max-w-[500px] shadow-md bg-white p-8 flex flex-col gap-4 relative rounded">
            <h2 className="text-xl text-center">Order Items</h2>
            {order.orderItems.map((item) => (
              <ProductCard
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                photo={`${server}/${item.photo}`}
                productId={item.productId}
                _id={item._id} />
            ))}
          </section>

          <section className=" overflow-y-auto h-[85vh] p-8 w-full max-w-[400px] bg-white rounded-md shadow-md">

            <h1 className="text-2xl text-center">Order Info</h1>
            <h5 className="text-lg mt-6 ml-2 font-semibold border-b-2">User Info</h5>
            <p className="m-2">Name: {order.user.name}</p>
            <p className="m-2">
              Address: {`${order.shippingInfo.address}, 
                ${order.shippingInfo.city}, 
                ${order.shippingInfo.state}, 
                ${order.shippingInfo.country}, 
                ${order.shippingInfo.pinCode}`}
            </p>

            <h5 className="text-lg mt-6 ml-2 font-semibold border-b-2">Amount Info</h5>
            <p className="m-2">Subtotal: {order.subtotal}</p>
            <p className="m-2">Shipping Charges: {order.shippingCharges}</p>
            <p className="m-2">Tax: {order.tax}</p>
            <p className="m-2">Discount: {order.discount}</p>
            <p className="m-2">Total: {order.total}</p>

            <h5 className="text-lg mt-6 ml-2 font-semibold border-b-2">Status Info</h5>
            <p className="m-2">
              Status:{" "}
              <span
                className={
                  order.status === "Delivered"
                    ? "text-purple-600"
                    : order.status === "Shipped"
                      ? "text-green-600"
                      : "text-red-600"
                }
              >
                {order.status}
              </span>
            </p>
          </section>
        </>}
    </main>
  )
}

const ProductCard = ({ name, price, quantity, photo, _id }: OrderItemType) => {
  return (
    <div className="flex items-center gap-2">
      <img src={photo} alt={name} className="h-full max-h-[4rem] max-w-[4rem] w-full rounded object-cover"></img>
      <Link to={`/product/${_id}`}>{name}</Link>
      {": "}
      <span>${price} X {quantity} = ${price * quantity}</span>
    </div>
  )
}

export default OrderDetails
