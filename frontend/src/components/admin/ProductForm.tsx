import React, { useState } from 'react'

interface FormDataType {
  name: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductFormProps {
  data?: FormDataType,
  setData?: React.Dispatch<React.SetStateAction<FormDataType>>,
}

const nullData = {
  name: '',
  price: 0,
  stock: 0,
  image: ''
}


function ProductForm({ data = nullData, setData  }: ProductFormProps) {

  const [formData, setFormData] = useState<FormDataType>({
    name: data.name,
    price: data.price,
    stock: data.stock,
    image: data.image
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          image: reader.result as string
        }));
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setData && setData(formData)
    console.log(formData)
  }


  return (
    <form className="flex flex-col items-center gap-8" onSubmit={(e) => onSubmitHandler(e)}>

      <h2 className="uppercase tracking-wide">Product Info</h2>

      <div className="w-full relative">
        <label htmlFor="name"
          className="absolute left-0 top-[-1.5rem]">
          Product Name
        </label>
        <input type="text" id="name" placeholder="name" value={formData.name} onChange={(e) => handleChange(e)} 
          className="rounded w-full p-4 border border-[#0d0d0d] outline-none"
        />
      </div>

      <div className="w-full relative">
        <label htmlFor="price"
          className="absolute left-0 top-[-1.5rem]">
          Product Price
        </label>
        <input type="number" id="price" placeholder="price" value={formData.price} onChange={(e) => handleChange(e)} 
          className="rounded w-full p-4 border border-[#0d0d0d] outline-none"
        />
      </div>

      <div className="w-full relative">
        <label htmlFor="stock"
          className="absolute left-0 top-[-1.5rem]">
          Product stock
        </label>
        <input type="number" id="stock" placeholder="stock" value={formData.stock} onChange={(e) => handleChange(e)} 
          className="rounded w-full p-4 border border-[#0d0d0d] outline-none"
        />
      </div>

      <div className="w-full relative">
        <label htmlFor="image"
          className="absolute left-0 top-[-1.5rem]">
          Product image
        </label>
        <input type="file" id="image" onChange={changeImageHandler} 
          className="rounded w-full p-4 border border-[#0d0d0d] outline-none"  
        />
      </div>
      {
        formData.image && <img className="h-[5rem] w-[5rem] object-cover rounded" src={formData.image} alt="product" />
      }

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >Submit</button>
    </form>
  )
}

export default ProductForm
