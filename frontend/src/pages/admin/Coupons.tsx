import Sidebar from "@/components/admin/Sidebar"
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button"
import { useCreateCouponMutation, useDeleteCouponMutation, useGetAllCouponsQuery } from "@/redux/api/dashboard"
import { CustomError } from "@/types/apiTypes";
import { RiCoupon2Fill } from "react-icons/ri";
import { useState } from "react"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { handleResponse } from "@/features";
import { useNavigate } from "react-router";
import { MdDeleteOutline } from "react-icons/md";

function Coupons() {

  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data, isLoading, isError, error } = useGetAllCouponsQuery();
  const [ createCoupon ] = useCreateCouponMutation();
  const [ deleteCoupon ] = useDeleteCouponMutation();

  if (isError) {
    toast.error((error as CustomError).data.message);
  }

  const [formDate, setFormData] = useState({
    name: '',
    discount: 0,
  })

  const submitHandler = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const body = {
      user_id: user?._id!,
      code: formDate.name,
      amount: formDate.discount
    }
    const response = await createCoupon(body)
    handleResponse(response, navigate, '/admin/coupons')
    setFormData({ name: '', discount: 0 })
  }

  const deleteHandler = async( id: string) => {
    // e.preventDefault();
    const response = await deleteCoupon({ id, user_id: user?._id! })
    handleResponse(response, navigate, '/admin/coupons')
  }


  return (
    <div className="grid grid-cols-5 gap-8 bg-[#f7f7f7]" style={{ minHeight: 'calc(100vh - 4rem)' }}>

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 px-4  grid lg:grid-cols-2 gap-10 py-8">
        <div className="bg-white rounded-md">
          {
            isLoading ?
              <Loader /> :
              <div className="overflow-y-auto h-full">
                {data?.coupons.map((coupon) => (
                  <div className="flex items-center gap-4 h-[4rem] px-2 mx-2 py-2 my-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow-lg">
                    <RiCoupon2Fill size={30} />

                    <div className="flex justify-between w-full px-2 items-center">
                      <div>
                        <p className="text-2xl font-semibold">{coupon.code}</p>
                        <p>Discount:{" "}{coupon.amount}</p>
                      </div>
                      <div
                      onClick={() => deleteHandler(coupon._id)} 
                      className="cursor-pointer hover:bg-gray-700 drop-shadow-lg hover:text-white rounded-full h-8 w-8 grid place-content-center p-2" >

                      <MdDeleteOutline size={25} />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
          }

        </div>
        <div className="bg-white rounded-md flex flex-col items-center justify-center px-4">

          <form className="flex flex-col gap-6 w-[400px] px-4 py-8 border rounded shadow-lg my-4">
            <label htmlFor="name">
              <span className="">Coupon Code</span>
              <input
                type="text"
                id="name"
                value={formDate.name}
                onChange={(e) => setFormData({ ...formDate, name: e.target.value.toLocaleUpperCase() })}
                className="w-full mt-2 p-1 focus:outline-none bg-[#f7f7f7] rounded-md"
                placeholder="Coupon Code" />
            </label>
            <label htmlFor="discount">
              <span>Discount</span>
              <input
                type="number"
                id="discount"
                value={formDate.discount}
                onChange={(e) => setFormData({ ...formDate, discount: Number(e.target.value) })}
                className="w-full mt-2 p-1 focus:outline-none bg-[#f7f7f7] rounded-md"
                placeholder="Discount" />

            </label>
            <Button className="w-full" onClick={(e) => submitHandler(e)}> Add Coupon</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Coupons
