import ProductForm from "../../../components/admin/ProductForm";
import Sidebar from "../../../components//admin/Sidebar"

function AddNewProduct() {

  
  return (
    <div className="grid grid-cols-5 gap-8 h-[100vh] bg-slate-200">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 flex justify-center items-center">

        <article className="max-h-[85vh] p-8 w-full max-w-[400px] bg-white rounded-md shadow-md">
          <ProductForm />
        </article>
      </main>

    </div>
  )
}

export default AddNewProduct
