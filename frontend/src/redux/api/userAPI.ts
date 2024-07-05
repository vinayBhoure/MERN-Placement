import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllUserResponse, DeleteUserRequest, MessageTypes, UserResponse } from '@/types/apiTypes';
import { User } from '@/types/types';


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/user` }),
    tagTypes: ['user'],
    endpoints: (builder) => ({
        login: builder.mutation<MessageTypes, User>({
            query: (user) => ({
                url: '/new',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['user']
        }),
        allUser: builder.query<AllUserResponse, string>({
            query: (id) => `all?id=${id}`,
            providesTags: ['user']
        }),
        deleteUser: builder.mutation<MessageTypes, DeleteUserRequest>({
            query: ({ userId, id }) => ({
                url: `/${id}?id=${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['user']
        })

    })
})

export const getUser = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/${id}`);
        const data: UserResponse = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}


export const { 
    useLoginMutation, 
    useAllUserQuery,
    useDeleteUserMutation,
 } = userAPI;