
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"

export default function Component() {

  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategory, setSelectedCategory] = useState("")
  const categories = [
    { id: 1, name: "Clothing" },
    { id: 2, name: "Accessories" },
    { id: 3, name: "Electronics" },
    { id: 4, name: "Home & Garden" },
    { id: 5, name: "Beauty" },
    { id: 6, name: "Sports" },
  ]
  const products = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Cozy Sweater",
      tagline: "Soft and warm for chilly days",
      price: 49.99,
      rating: 4.5,
      category: "Clothing",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Leather Bag",
      tagline: "Stylish and practical",
      price: 99.99,
      rating: 4.0,
      category: "Accessories",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Bluetooth Speaker",
      tagline: "Crisp sound for your favorite tunes",
      price: 79.99,
      rating: 4.8,
      category: "Electronics",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Garden Hose",
      tagline: "Keep your garden green and lush",
      price: 29.99,
      rating: 4.2,
      category: "Home & Garden",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Lipstick Set",
      tagline: "Matte and glossy shades for any occasion",
      price: 19.99,
      rating: 4.7,
      category: "Beauty",
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Yoga Mat",
      tagline: "Non-slip and comfortable for all poses",
      price: 34.99,
      rating: 4.6,
      category: "Sports",
    }
  ]
  const filteredProducts = products.filter(
    (product) =>
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedCategory === "" || product.category === selectedCategory),
  )
  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      case "low":
        return a.price - b.price
      case "high":
        return b.price - a.price
      default:
        return 0
    }
  })
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
  }
  const handleSortChange = (value: string) => {
    setSortBy(value)
  }
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }
  return (
    <div className="flex overflow-y-hidden" style={{ height: 'calc(100vh - 4rem)' }}>

      <div
        className={`fixed top-16 left-0 md:relative md:top-0 z-20 h-full w-64 bg-background shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0`}
      >
        <div className="flex h-full flex-col gap-8 p-6">
          <div>
            <div className="mb-6 flex items-center justify-between fixed top-0 right-0">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                Close
              </Button>
            </div>
            <div className="space-y-2 mt-4">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Price Range</h3>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[...priceRange]}
                onValueChange={handlePriceRangeChange}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Sort By</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>
                      {sortBy === "featured"
                        ? "Featured"
                        : sortBy === "newest"
                          ? "Newest"
                          : sortBy === "low"
                            ? "Price: Low to High"
                            : "Price: High to Low"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortChange}>
                    <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="low">Price: Low to High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="high">Price: High to Low</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-[#f7f7f7]">

        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <FilterIcon className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Products</h1>
          {/* <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FilterIcon className="h-5 w-5" />
                  <span>Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" />
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ListOrderedIcon className="h-5 w-5" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" />
            </DropdownMenu>
          </div> */}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-background rounded-lg shadow-md overflow-hidden">
              <img
                src="/placeholder.svg"
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.tagline}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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


function ListOrderedIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}


function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
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