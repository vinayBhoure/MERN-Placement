import { handleResponse } from '@/features';
import { useNewProductMutation, useUpdateProductMutation } from '@/redux/api/productAPI';
import { UserState } from '@/redux/reducer/userReducer';
import { server } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

interface FormDataType {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: File | string;
}

interface ProductFormProps {
  data?: FormDataType,
  updateState?: boolean,
}

const nullData = {
  name: '',
  price: 0,
  stock: 0,
  category: '',
  photo: new File([], '')
}


function ProductForm({ data = nullData, updateState }: ProductFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector((state: { userReducer: UserState }) => state.userReducer);
  const [newProduct] = useNewProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [formData, setFormData] = useState<FormDataType>(nullData as FormDataType)
  

  const [image, setImage] = useState<string>('' as string)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();

    if(file){
      reader.readAsDataURL(file);
      reader.onload = () => {
        if(typeof reader.result  === "string"){
          setImage(reader.result);
          setFormData({
            ...formData,
            photo: file
          })
        }
      }
    }
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.stock || !formData.photo) {
      toast.error('Please fill all the fields');
      return
    };

    const formDataToSend = new FormData();
    formDataToSend.set('name', formData.name);
    formDataToSend.set('price', formData.price.toString());
    formDataToSend.set('stock', formData.stock.toString());
    formDataToSend.set('category', formData.category);
    formDataToSend.set('photo', formData.photo);

    const response = await newProduct({ formData: formDataToSend, id: user?._id as string });
    handleResponse(response, navigate, '/admin/products')
  }

  const updateProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.set('name', formData.name);
    formDataToSend.set('price', formData.price.toString());
    formDataToSend.set('stock', formData.stock.toString());
    formDataToSend.set('category', formData.category);
    formDataToSend.set('photo', formData.photo);

    const response = await updateProduct({ formData: formDataToSend, id: id!, user_id: user?._id as string });
    handleResponse(response, navigate, `/admin/products`);
  }

  useEffect(() => {
    setFormData(data)
    setImage(`${server}/${data.photo as string}`)
  },[data])


  return (
    <form className="flex flex-col items-center gap-8" onSubmit={(e) => (updateState ? updateProductHandler(e) : onSubmitHandler(e))}>

      <h2 className="uppercase tracking-wide">Product Info</h2>

      <div className="w-full relative">
        <label htmlFor="name"
          className="absolute left-0 top-[-1.5rem]">
          Product Name
        </label>
        <input type="text" required id="name" placeholder="name" value={formData.name} onChange={(e) => handleChange(e)}
          className="rounded w-full p-4 border border-[#0d0d0d] outline-none"
        />
      </div>

      <div className="w-full relative">
        <label htmlFor="category"
          className="absolute left-0 top-[-1.5rem]">
          Product Category
        </label>
        <input type="text" required id="category" placeholder="category" value={formData.category} onChange={(e) => handleChange(e)}
          className="rounded w-full p-4 border border-[#0d0d0d] outline-none"
        />
      </div>

      <div className="w-full relative">
        <label htmlFor="price"
          className="absolute left-0 top-[-1.5rem]">
          Product Price
        </label>
        <input type="number" required id="price" placeholder="price" value={formData.price} onChange={(e) => handleChange(e)}
          className="rounded w-full p-4 border border-[#0d0d0d] outline-none"
        />
      </div>

      <div className="w-full relative">
        <label htmlFor="stock"
          className="absolute left-0 top-[-1.5rem]">
          Product stock
        </label>
        <input type="number" required id="stock" placeholder="stock" value={formData.stock} onChange={(e) => handleChange(e)}
          className="rounded w-full p-4 border border-[#0d0d0d] outline-none"
        />
      </div>

      <div className="w-full relative">
        <label htmlFor="photo"
          className="absolute left-0 top-[-1.5rem]">
          Product image
        </label>
        <input type="file" required={updateState ? false : true} id="photo" onChange={changeImageHandler}
          className="rounded w-full p-4 border border-[#0d0d0d] outline-none"
        />
      </div>
      {
        image && <img className="h-[5rem] w-[5rem] object-cover rounded" src={image} alt="product" />
      }

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >Submit</button>
    </form>
  )
}

export default ProductForm
