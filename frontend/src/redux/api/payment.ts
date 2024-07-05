import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const paymentAPI = createApi({
    reducerPath: 'paymentAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/payment`}),
    endpoints: (builder) => ({
        initiatePayment: builder.mutation<any, {amount: number, info:string}>({
            query: ({amount, info}) => ({
                url: `/create-payment-intent?productInfo=${info}`,
                method: 'POST',
                body: {
                    amount
                }
            })
        }),
        checkPayementStatus: builder.query<any, string>({
          query: (merchantTransactionId) => `/checkPayment/${merchantTransactionId}`
        }) 
    })
})

export const {useInitiatePaymentMutation, useCheckPayementStatusQuery} = paymentAPI;