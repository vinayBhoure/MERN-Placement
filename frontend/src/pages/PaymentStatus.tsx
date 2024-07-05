import toast from "react-hot-toast";
import { handleResponse } from "@/features";
import { useNewOrderMutation } from "@/redux/api/orderAPI";
import { useCheckPayementStatusQuery } from "@/redux/api/payment";
import { CartState, resetCart } from "@/redux/reducer/cartReducer"
import { UserState } from "@/redux/reducer/userReducer";
import Loader from '../components/Loader'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router";
import { CustomError, NewOrderRequest } from "@/types/apiTypes";
import { useEffect, useState } from "react";


function PaymentStatus() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { transactionId, productInfo } = useParams();
  const [newOrder] = useNewOrderMutation();
  // const { data, isError, isLoading, error } = useCheckPayementStatusQuery(transactionId!);

  // if (isError) {
  //   toast.error((error as CustomError).data.message)
  //   navigate("/")
  // }

  // const { user } = useSelector((state: { userReducer: UserState }) => state.userReducer)
  // const {
  //   shippingInfo,
  //   total,
  //   cartItems,
  //   discount,
  //   tax,
  //   subtotal,
  //   shippingCharges

  // } = useSelector((state: { cartReducer: CartState }) => state.cartReducer);

  // const orderData: NewOrderRequest = {
  //   shippingInfo,
  //   user: user?._id!,
  //   subtotal,
  //   tax,
  //   shippingCharges,
  //   discount,
  //   total,
  //   orderItems: cartItems
  // }
  async function placeOrder() {
    const storedData = localStorage.getItem(productInfo!);
    const parsedData = storedData ? JSON.parse(storedData) : null;

    const response = await newOrder(parsedData);
    handleResponse(response, navigate, "/orders");
    localStorage.removeItem(productInfo!);

    dispatch(resetCart());
  }

  // if (data?.data.status === "succeeded") {
  //   toast.success("Payment successful, Your Order Placed Successfully")
  //   placeOrder();
  //   navigate("/orders")
  // }
  useEffect(() => {
    placeOrder();
  }, [1]);

  return (
    <>
      {
        false ?
          <Loader /> :
          <div className="flex flex-col items-center justify-center gap-8" style={{ minHeight: 'calc(100vh - 4rem)' }}>
            <p className="text-4xl font-semibold">Payment Status</p>
            <p className="text-2xl font-semibold">Checking Payment Status</p>

          </div>
      }
    </>
  )
}

export default PaymentStatus
