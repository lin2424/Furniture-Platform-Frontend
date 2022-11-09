import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BasicUrl } from "../constants.js";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BasicUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('TOKEN');

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            
            return headers
        },
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getFurnitures: builder.query({
            query: () => `/product`,
        }),
        login: builder.mutation({
            query(userInfo) {
                return {
                    url: `/auth/login`,
                    method: 'POST',
                    body: userInfo,
                }
            },
        }),
    }),
});


export const { useGetFurnituresQuery, useLoginMutation } = apiSlice