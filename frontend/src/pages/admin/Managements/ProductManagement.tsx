import ProductForm from "../../../components/admin/ProductForm"
import Sidebar from "../../../components/admin/Sidebar"
import { useState } from "react"

interface FormDataType {
  name: string;
  price: number;
  stock: number;
  image: string;
}

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

function ProductManagement() {

  const [productDetails, setProductDetails] = useState<FormDataType>({
    name: 'Nike',
    price: 2,
    stock: 3,
    image: img
  })

  return (
    <div className="grid grid-cols-5 gap-8 h-[100vh] bg-slate-200">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 flex justify-center items-center gap-4 p-8 lg:p-0">

        <section className="overflow-y-auto w-full h-[85vh] max-w-[500px] shadow-md bg-white p-20 flex flex-col gap-4 relative rounded">

          <strong className="font-300">Product Id - afnkjafkd</strong>

          <img className="w-full h-full object-cover" src={productDetails.image} alt={productDetails.image} />

          <p className="text-center tracking-wide uppercase ">{productDetails.name}</p>

          {productDetails.stock > 0 ? (<span className="absolute right-8 top-8 text-green-600">{productDetails.stock} Availables</span>) : (<span className="absolute right-8 top-8 text-red-500">Not Availvable</span>)}

          <h3 className="text-center text-2xl">{productDetails.price}</h3>

        </section>

        <section className="h-[85vh] p-8 w-full max-w-[400px] bg-white rounded-md shadow-md">
          <ProductForm data={productDetails} setData={setProductDetails} />
        </section>

      </main>

    </div>
  )
}

export default ProductManagement
