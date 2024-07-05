import Sidebar from "../../../components/admin/Sidebar"
import { OrderItemType } from "../../../types"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDeleteOrderMutation, useGetOrderDetailsQuery, useUpdateOrderMutation } from "@/redux/api/orderAPI";
import toast from "react-hot-toast";
import { CustomError } from "@/types/apiTypes";
import { Loader } from "lucide-react";
import { OrderResponseType } from "@/types/types";
import { server } from "@/redux/store";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/reducer/userReducer";
import { handleResponse } from "@/features";
import { AiOutlineDelete } from "react-icons/ai";

function TransactionManagement() {

  const { id } = useParams();
  const navigate = useNavigate();

  if(!id) navigate('/admin/transactions');

  const { data: orderDetail, isLoading, isError, error } = useGetOrderDetailsQuery(id!);
  const { user } = useSelector((state: { userReducer: UserState }) => state.userReducer);

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

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

  const updateHandler = async () => {

    const response = await updateOrder({ user_id: user?._id!, order_id: order._id });
    handleResponse(response, navigate, "/admin/transactions");

    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };

  const deleteHandler = async () => {
    // delete product
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;
    
    const response = await deleteOrder({ user_id: user?._id!, order_id: id as string });
    handleResponse(response, navigate, '/admin/transactions')
  }


  return (
    <div className="grid grid-cols-5 gap-8 h-[100vh] bg-slate-200">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 flex justify-center items-center gap-4">

        {isLoading ? <Loader /> :
          <>
            <section className="overflow-y-auto w-full h-[85vh] max-w-[500px] shadow-md bg-white p-8 flex flex-col gap-4 relative rounded">
              <h2 className="text-xl text-center">Order Items</h2>
              {order.orderItems.map((item) => (
                <ProductCard
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  photo={`${server}/${item.photo}`}
                  _id={item._id} />
              ))}
            </section>

            <section className="relative h-[85vh] p-8 w-full max-w-[400px] bg-white rounded-md shadow-md">

              <h1 className="text-2xl text-center">Order Info</h1>
              <h5 className="text-lg mt-6 ml-2 font-700">User Info</h5>
              <p className="m-2">Name: {order.user.name}</p>
              <p className="m-2">
                Address: {`${order.shippingInfo.address}, 
                ${order.shippingInfo.city}, 
                ${order.shippingInfo.state}, 
                ${order.shippingInfo.country}, 
                ${order.shippingInfo.pinCode}`}
              </p>

              <h5 className="text-lg mt-6 ml-2 font-700">Amount Info</h5>
              <p className="m-2">Subtotal: {order.subtotal}</p>
              <p className="m-2">Shipping Charges: {order.shippingCharges}</p>
              <p className="m-2">Tax: {order.tax}</p>
              <p className="m-2">Discount: {order.discount}</p>
              <p className="m-2">Total: {order.total}</p>

              <h5 className="text-lg mt-6 ml-2 font-700">Status Info</h5>
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
              <button className="my-8 p-4 bg-blue-600 text-white w-full rounded cursor-pointer hover:opacity-80"
                onClick={updateHandler}>{order.status}</button>

              <div className="absolute bg-black text-white rounded-full p-2 hover:cursor-pointer" style={{ top: '-3%', right: '-5%' }} onClick={deleteHandler} >
                <AiOutlineDelete size={25} />
              </div>
            </section>

          </>}
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
      <span>${price} X {quantity} = ${price * quantity}</span>
    </div>
  )
}

export default TransactionManagement
