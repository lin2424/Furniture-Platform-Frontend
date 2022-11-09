import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    personalInfo: {
        firstName: '',
        lastName: '', 
        email: '', 
        cellPhone: '', 
        shipping_address: '', 
        shipping_city: '',
        shipping_state: '',
        shipping_postalCode: '', 
        shipping_country: '', 
        billing_address: '', 
        billing_city: '', 
        billing_state: '', 
        billing_postalCode: '', 
        billing_country: '',
        shipping_option: '' 
    }, // personal info and shipping address
}

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {
        PERSONAL_INFO: (state, actions) => { state.personalInfo = {...state.personalInfo, ...actions.payload } },
        CHOOSE_SHIPPING: (state, actions) => { state.personalInfo = {...state.personalInfo, "shipping_option": actions.payload } },
    }
})

export default formSlice.reducer;

export const { PERSONAL_INFO, CHOOSE_SHIPPING } = formSlice.actions;