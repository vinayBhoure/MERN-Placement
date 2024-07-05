import { BarChartResponse, CouponRequest, DashboardStatsResponse, LineChartResponse, MessageTypes, NewCouponResponse, PieChartResponse } from "@/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/dashboard` }),
    tagTypes: ['Dashboard'],
    endpoints: (builder) => ({
        getDashboardStats: builder.query<DashboardStatsResponse, string>({
            query: (id) => `/stats?id=${id}`,
            providesTags: ['Dashboard']
        }),
        getPie: builder.query<PieChartResponse, string>({
            query: (id) => `/pie?id=${id}`,
            providesTags: ['Dashboard']
        }),
        getBar: builder.query<BarChartResponse, string>({
            query: (id) => `/bar?id=${id}`,
            providesTags: ['Dashboard']
        }),
        getLine: builder.query<LineChartResponse, string>({
            query: (id) => `/line?id=${id}`,
            providesTags: ['Dashboard']
        })
    })
});

export const couponAPI = createApi({
    reducerPath: 'couponAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/payment` }),
    tagTypes: ['Coupon'],
    endpoints: (builder) => ({
        getAllCoupons: builder.query<{
            success: boolean,
            coupons: {
                _id: string,
                code: string,
                amount: number
            }[]
        }, void>({
            query: () => `/coupon/all`,
            providesTags: ['Coupon']
        }),
        createCoupon: builder.mutation<NewCouponResponse, CouponRequest>({
            query: (body) => ({
                url: `/coupon/new?id=${body.user_id}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Coupon']
        }),
        deleteCoupon: builder.mutation<MessageTypes, { id: string, user_id: string }>({
            query: ({ id, user_id }) => ({
                url: `/coupon/delete/${id}?id=${user_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Coupon']
        })
    })
});


export const {
    useGetDashboardStatsQuery,
    useGetPieQuery,
    useGetBarQuery,
    useGetLineQuery
} = dashboardApi;

export const {
    useGetAllCouponsQuery,
    useCreateCouponMutation,
    useDeleteCouponMutation
} = couponAPI;