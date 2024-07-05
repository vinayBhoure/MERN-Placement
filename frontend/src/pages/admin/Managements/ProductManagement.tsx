
import { useDeleteProductMutation, useProductDetailsQuery } from "@/redux/api/productAPI";
import ProductForm from "../../../components/admin/ProductForm"
import Sidebar from "../../../components/admin/Sidebar"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { server } from "@/redux/store";
import { AiOutlineDelete } from "react-icons/ai";
import { handleResponse } from "@/features";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/reducer/userReducer";


interface ProductType {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
}

function ProductManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useProductDetailsQuery(id as string);
  const [deleteProduct] = useDeleteProductMutation();

  const {user} = useSelector((state: {userReducer: UserState}) => state.userReducer)

  

  const [productDetails, setProductDetails] = useState<ProductType>({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    photo: '',
  })


  const deleteHandler = async () => {
    // delete product
    const response = await deleteProduct({ user_id: user?._id!, id: id as string });
    handleResponse(response, navigate, '/admin/products')
  }
  

  useEffect(() => {
    if (data) {
      setProductDetails({
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        category: data.product.category,
        photo: data.product.photo
      })
    }
  }, [])



  return (
    <div className="grid grid-cols-5 gap-8 h-[100vh] bg-slate-200">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 flex justify-center items-center gap-4 p-8 lg:p-0">

        <section className="overflow-y-auto w-full h-[85vh] max-w-[500px] shadow-md bg-white p-20 flex flex-col gap-4 relative rounded">

          <strong className="font-300">Product Id - {data?.product._id}</strong>

          <img className="w-full h-full object-cover" src={`${server}/${productDetails.photo}`} alt={productDetails.name} />

          <p className="text-center tracking-wide uppercase ">{productDetails.name}</p>

          {productDetails.stock > 0 ? (<span className="absolute right-8 top-8 text-green-600">{productDetails.stock} Availables</span>) : (<span className="absolute right-8 top-8 text-red-500">Not Availvable</span>)}

          <h3 className="text-center text-2xl">{productDetails.price}</h3>

        </section>

        <section className="h-[85vh] p-8 w-full max-w-[400px] bg-white rounded-md shadow-md relative">
          <ProductForm data={productDetails} updateState={true} />
          <div className="absolute bg-black text-white rounded-full p-2 hover:cursor-pointer" style={{top:'-3%', right:'-5%'}} onClick={deleteHandler} >
          <AiOutlineDelete size={25} />
          </div>
        </section>

      </main>

    </div>
  )
}

export default ProductManagement
