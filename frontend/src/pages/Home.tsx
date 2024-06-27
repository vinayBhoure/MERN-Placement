import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import image from '../assets/coverImg.jpeg'

function Home() {

  const addToCartHandler = (id: string) => {
    console.log('Add to cart', id)
  }

  return (
    <div className="py-8 px-[5%] flex flex-col w-full bg-[#f7f7f7]" style={{height: 'calc(100vh - 4rem)'}}>

      <section>
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold">Latest Products  </h1>
          <Link to="/search" className="text-base">More</Link>
        </div>
        <main className="w-full flex gap-6 overflow-x-auto scroll-bar-none">

          <ProductCard
            productId="1"
            name="Product 1"
            photo={image}
            price={100}
            stock={10}
            handler={addToCartHandler} />
          <ProductCard
            productId="1"
            name="Product 1"
            photo={image}
            price={100}
            stock={10}
            handler={addToCartHandler} />
          <ProductCard
            productId="1"
            name="Product 1"
            photo={image}
            price={100}
            stock={10}
            handler={addToCartHandler} />
          <ProductCard
            productId="1"
            name="Product 1"
            photo={image}
            price={100}
            stock={10}
            handler={addToCartHandler} />
          <ProductCard
            productId="1"
            name="Product 1"
            photo={image}
            price={100}
            stock={10}
            handler={addToCartHandler} />
        </main>
      </section>
    </div>
  )
}

export default Home
