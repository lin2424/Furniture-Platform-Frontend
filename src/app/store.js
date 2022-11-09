import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/furnitureApiSlice.js";
import furnitureReducer from '../features/furnitureSlice.js'
import formRuducer from '../features/formSlice.js'
import { userApiSlice } from "../features/userApiSlice.js";


export const store = configureStore({
    reducer: {
        furniture: furnitureReducer,
        form: formRuducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware, userApiSlice.middleware);
    }
});

