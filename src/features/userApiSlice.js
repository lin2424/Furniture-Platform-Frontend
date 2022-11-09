import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ServerURL } from '../constants.js';


export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${ServerURL}`,
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
        register: builder.mutation({
            query(userInfo) {
                return {
                    url: `/user/register`,
                    method: 'POST',
                    body: userInfo,
                }
            }
        }),
        login: builder.mutation({
            query(userInfo) {
                return {
                    url: `/user/login`,
                    method: 'POST',
                    body: userInfo,
                }
            },
        }),
        changePassword: builder.mutation({
            query(userInfo) {
                return {
                    url: `/user/login`,
                    method: 'PUT',
                    body: userInfo,
                }
            },
        }),
    }),
});


export const { useLoginMutation, useRegisterMutation, useChangePasswordMutation } = userApiSlice;