
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import ProductCard from "@/components/ProductCard"
import { useCategoriesQuery, useSearchProductsQuery } from "@/redux/api/productAPI"
import toast from "react-hot-toast"
import { CustomError } from "@/types/apiTypes"
import { Loader } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { addToCart } from "@/redux/reducer/cartReducer"
import { useDispatch } from "react-redux"
import { CartItem } from "@/types/types"

export default function Component() {
  const searchQuery = useSearchParams()[0];

  const { data: categoriesResponse, isLoading: categoryLoading, isError, error } = useCategoriesQuery("");

  const [isOpen, setIsOpen] = useState(false)

  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [maxPrice, setMaxPrice] = useState(1000000000)
  const [category, setCategory] = useState(searchQuery.get("category") || "")
  const [page, setPage] = useState(1)

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    price: maxPrice,
    page,
    category,
    search,
    sort,
  })

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }
  const handleSortChange = (value: string) => {
    setSort(value)
  }

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    
    if(cartItem.quantity > cartItem.stock) {
      return toast.error('Out of stock')
    }

    dispatch(addToCart(cartItem))
    toast.success('Added to cart')
  }

  const isNextPage = true;
  const isPrevPage = true;

  if (isError) toast.error((error as CustomError).data.message)
  if (productIsError) toast.error((productError as CustomError).data.message)

  return (
    <div className="flex overflow-y-hidden" style={{ height: 'calc(100vh - 4rem)' }}>

      <div
        className={`fixed top-16 left-0 md:relative md:top-0 z-20 h-full w-64 bg-background shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0`}
      >
        <div className="flex h-full flex-col gap-8 p-6">

          {/* CATEGORIES */}
          <div>
            <div className="mb-6 flex items-center justify-between fixed top-0 right-0">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                Close
              </Button>
            </div>
            <div className="space-y-2 mt-4">
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  {!categoryLoading && categoriesResponse?.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">

            {/* PRICE RANGE */}
            <div >
              <h4>Max Price: {maxPrice || ""}</h4>
              <input
                type="range"
                min={100}
                step={100}
                max={100000}
                value={maxPrice}
                className="w-[90%]"
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            {/* SORT BY */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Sort By</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>
                      {sort === ""
                        ? "None"
                        :
                        sort === "asc"
                          ? "Price: Low to High"
                          : "Price: High to Low"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
                    <DropdownMenuRadioItem value="">None</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="asc">Price: Low to High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dsc">Price: High to Low</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#f7f7f7]">
        <div className="flex items-center gap-10">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <FilterIcon className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Products</h1>
          <input
            type="text"
            name="search"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-full w-[18rem] p-1 rounded-lg" />

        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">

          {/* PRODUCT CARDS */}
          {productLoading ? <Loader /> : searchedData?.products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              photo={product.photo}
              stock={product.stock}
              handler={addToCartHandler}
            />
          ))}
        </div>

        {searchedData && searchedData.totalPage > 1 && (
          <article>
            <button onClick={() => setPage(prev => prev - 1)}
              disabled={!isPrevPage}
            >Prev</button>
            <span>{page} of {searchedData.totalPage}</span>
            <button onClick={() => setPage(prev => prev + 1)}
              disabled={!isNextPage}
            >Next</button>
          </article>
        )}

      </div>
    </div>
  )
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}