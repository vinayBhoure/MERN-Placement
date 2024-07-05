import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useLatestProductsQuery } from "@/redux/api/productAPI"
import { useEffect, useState } from "react";
import { CartItem, Product } from "@/types/types";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/reducer/cartReducer";

function Home() {

  const [products, setProducts] = useState<Product[]>([])
  const { data, isLoading, isError } = useLatestProductsQuery('')

  if (isError) toast.error('Failed to fetch products')


  function getProducts() {
    if (data?.success) {
      setProducts(data?.products)
    }
  }

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    
    if(cartItem.quantity > cartItem.stock) {
      return toast.error('Out of stock')
    }

    dispatch(addToCart(cartItem))
    toast.success('Added to cart')
  }

  useEffect(() => {
    getProducts()
  })

  return (
    <div className="py-8 px-[5%] flex flex-col w-full bg-[#f7f7f7]" style={{ height: 'calc(100vh - 4rem)' }}>

      <section>
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold">Latest Products  </h1>
          <Link to="/search" className="text-base">More</Link>
        </div>
        <main className="w-full flex gap-6 overflow-x-auto scroll-bar-none my-8">

          {isLoading ? <Loader /> : products.map(product => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              photo={product.photo}
              price={product.price}
              stock={product.stock}
              handler={addToCartHandler} />
          ))}

        </main>
      </section>
    </div>
  )
}

export default Home
