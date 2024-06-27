import { BiArrowBack } from "react-icons/bi"
import { useState } from "react"

function ShippingPage() {

    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        console.log(shippingInfo)
    }
    return (
        <div className="flex justify-center bg-[#f7f7f7] items-center py-8" style={{height:'calc(100vh - 4rem)'}}>
            <button className="h-[2.5rem] w-[2.5rem] grid place-content-center fixed top-8 left-8 rounded-full pointer transition-all duration-300" onClick={() => { history.go(-1) }}
            ><BiArrowBack color="#2E2E2E" className="hover:-translate-x-1"></BiArrowBack></button>

            <div className="bg-white rounded-lg shadow-md sm:min-w-[350px] mx-2">

                <form className="max-w-[450px] w-full flex flex-col items-stretch justify-center gap-8 p-8 " >
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
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={shippingInfo.postalCode}
                        onChange={(e) => changeHandler(e)}
                        className="border rounded p-1"
                    />
                    <select
                        required
                        name="country"
                        onChange={(e) => changeHandler(e)}
                        className="border rounded p-1"
                    >
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                    </select>
                    <button onClick={onSubmit} type="submit" className="bg-[#767676] hover:bg-[#4d4d4d] p-2 rounded text-white font-bold">Continue</button>

                </form>
            </div>
        </div>
    )
}

export default ShippingPage
