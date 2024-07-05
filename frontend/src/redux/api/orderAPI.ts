
import { AllOrderResponse, MessageTypes, MyOrderResponse, NewOrderRequest, OrderDetailsResponse, UpdateOrderRequest } from "@/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/order` }),
    tagTypes: ['order'],
    endpoints: (builder) => ({
        myOrder: builder.query<MyOrderResponse, string>({
            query: (user_id: string) => (`/myorders?id=${user_id}`),
            providesTags: ['order']
        }),
        allOrder: builder.query<AllOrderResponse, string>({
            query: (id: string) => (`/allOrders?id=${id}`),
        
        }),
        getOrderDetails: builder.query<OrderDetailsResponse, string>({
            query: (id: string) => (`/${id}`),
        }),
        newOrder: builder.mutation<MessageTypes, NewOrderRequest>({
            query: (order) => ({
                url: `/new`,
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['order']
        }),
        updateOrder: builder.mutation<MessageTypes, UpdateOrderRequest>({
            query: ({ user_id, order_id }) => ({
                url: `/${order_id}?id=${user_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['order']
        }),
        deleteOrder: builder.mutation<MessageTypes, UpdateOrderRequest>({
            query: ({ user_id, order_id }) => ({
                url: `/${order_id}?id=${user_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['order']
        })
    })
});

export const {
    useDeleteOrderMutation,
    useGetOrderDetailsQuery,
    useMyOrderQuery,
    useNewOrderMutation,
    useUpdateOrderMutation,
    useAllOrderQuery
} = orderAPI;