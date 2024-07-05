import { BiArrowBack } from "react-icons/bi"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CartState, saveShippingInfo } from "@/redux/reducer/cartReducer"
import { useNavigate } from "react-router";
import { ShippingInfo } from "@/types/types";
import { useInitiatePaymentMutation } from "@/redux/api/payment";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { NewOrderRequest } from "@/types/apiTypes";
import { UserState } from "@/redux/reducer/userReducer";

function ShippingPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state: { cartReducer: CartState }) => state.cartReducer);

    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        address: "",
        city: "",
        state: "",
        pinCode: 0,
        country: ""
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value
        })
    }

    const { total } = useSelector((state: RootState) => state.cartReducer)
    const [initiatePayment] = useInitiatePaymentMutation();

    //store data to local storage
    const { user } = useSelector((state: { userReducer: UserState }) => state.userReducer)
    const { discount, tax, subtotal, shippingCharges } = useSelector((state: { cartReducer: CartState }) => state.cartReducer);
    const orderDataToStore: NewOrderRequest = {
        shippingInfo,
        user: user?._id!,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
        orderItems: cartItems
    }

    const payHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(saveShippingInfo(shippingInfo));
        const uniqueId = Math.random().toString(36).substring(7);
        localStorage.setItem(uniqueId, JSON.stringify(orderDataToStore));


        try {
            const { data, error } = await initiatePayment({ amount: total, info: uniqueId });

            if (error) {
                toast.error("Payment failed")
                localStorage.removeItem(uniqueId);
                navigate("/shipping")
                return
            }

            // setTimeout(() => {
            //     localStorage.removeItem(uniqueId);
            // }, 30000)

            if (data) {
                const redirectURI = data?.data.data.instrumentResponse.redirectInfo.url
                window.open(redirectURI, "_self")
            }
        } catch (err) {
            toast.error("Payment failed")
            localStorage.removeItem(uniqueId);
            navigate("/shipping")
        }
    }

    useEffect(() => {
        if (cartItems.length <= 0) return navigate("/cart");
    }, [cartItems]);

    return (
        <div className="flex justify-center bg-[#f7f7f7] items-center py-8" style={{ height: 'calc(100vh - 4rem)' }}>
            <button className="h-[2.5rem] w-[2.5rem] bg-black grid place-content-center fixed top-20 left-12 rounded-full pointer transition-all duration-300" onClick={() => { history.go(-1) }}
            ><BiArrowBack color="white" className="hover:-translate-x-1"></BiArrowBack></button>

            <div className="bg-white rounded-lg shadow-md sm:min-w-[350px] mx-2">

                <form className="max-w-[450px] w-full flex flex-col items-stretch justify-center gap-8 p-8 " onSubmit={(e) => payHandler(e)}>
                    <h1 className="m-6 text-center font-bold text-2xl">Shipping Address</h1>
                    <input
                        required
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={shippingInfo.address}
                        onChange={(e) => changeHandler(e)}
                        className="border rounded p-1"
                    />
                    <input
                        required
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shippingInfo.city}
                        onChange={(e) => changeHandler(e)}
                        className="border rounded p-1"
                    />
                    <input
                        required
                        type="text"
                        name="state"
                        placeholder="State"
                        value={shippingInfo.state}
                        onChange={(e) => changeHandler(e)}
                        className="border rounded p-1"
                    />
                    <input
                        required
                        type="number"
                        name="pinCode"
                        placeholder="Postal Code"
                        value={shippingInfo.pinCode}
                        onChange={(e) => changeHandler(e)}
                        className="border rounded p-1"
                    />
                    <select
                        name="country"
                        required
                        value={shippingInfo.country}
                        onChange={changeHandler}
                        className="border rounded p-1"
                    >
                        <option value="">Choose Country</option>
                        <option value="india">India</option>
                    </select>
                    <button type="submit" className="bg-[#767676] hover:bg-[#4d4d4d] p-2 rounded text-white font-bold">Continue</button>

                </form>
            </div>
        </div>
    )
}

export default ShippingPage
