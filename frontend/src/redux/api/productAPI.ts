import {
    AllCategoriesResponse,
    AllProductResponse,
    DeleteProductRequest,
    MessageTypes,
    NewProductRequest,
    ProductResponse,
    SearchProductsRequest,
    SearchProductsResponse,
    UpdateProductRequest

} from '@/types/apiTypes';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const productAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/product` }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        latestProducts: builder.query<AllProductResponse, string>({
            query: () => '/latest',
            providesTags: ['Product'],
        }),
        allProducts: builder.query<AllProductResponse, string>({
            query: (id: string) => `/allproducts?id=${id}`,
            providesTags: ['Product'],
        }),
        categories: builder.query<AllCategoriesResponse, string>({
            query: () => '/categories',
            providesTags: ['Product'],
        }),
        searchProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
            query: ({
                price,
                page,
                category,
                search,
                sort
            }) => {
                let base = `/allproducts?search=${search}&page=${page}`;

                if (price) base += `&price=${price}`;
                if (sort) base += `&sort=${sort}`;
                if (category) base += `&category=${category}`;

                return base;
            },
            providesTags: ['Product'],
        }),
        productDetails: builder.query<ProductResponse, string>({
            query: (id) => `/${id}`,
            providesTags: ['Product'],
        }),
        newProduct: builder.mutation<MessageTypes, NewProductRequest>({
            query: ({ formData, id }) => ({
                url: `/new?id=${id}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<MessageTypes, UpdateProductRequest>({
            query: ({ formData, id, user_id }) => ({
                url: `/${id}?id=${user_id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<MessageTypes, DeleteProductRequest>({
            query: ({user_id, id}) => ({
                url: `/${id}?id=${user_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],   
        })
    }),
   
})

export const {
    useLatestProductsQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
    useNewProductMutation,
    useProductDetailsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productAPI;