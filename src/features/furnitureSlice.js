import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    toggleItemClass:{
        mobileMenuActive: '',
        priceListDisplay: 'none',
        materialListDisplay: 'none',
    },
    optionSelected: {
        "0": null,
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
    },
    optionSelectedId: [],
    priceRange: Array(6).fill(null),
    sortOrder: '',
    loginUser: '',
};

const furnitureSlice = createSlice({
    name: 'furniture',
    initialState,
    reducers: {
        MOBILE_MENU_ACTIVE(state) {
             state.toggleItemClass.mobileMenuActive === '' ?  state.toggleItemClass.mobileMenuActive = 'active' : state.toggleItemClass.mobileMenuActive = ''
        },
        PRICE_LIST_DISPLAY(state) {
             state.toggleItemClass.priceListDisplay === 'none' ?  state.toggleItemClass.priceListDisplay = 'block' : state.toggleItemClass.priceListDisplay = 'none'
        },
        MATERIAL_LIST_DISPLAY(state) {
             state.toggleItemClass.materialListDisplay === 'none' ?  state.toggleItemClass.materialListDisplay = 'block' : state.toggleItemClass.materialListDisplay = 'none'
        },
        CART_PRICE_UPDATE_OPTIONSELECT(state, actions) {
            state.optionSelected[actions.payload[0]] = actions.payload[1];
        },
        UPDATE_OPTIONSELECTED_ID(state, actions) {
            state.optionSelectedId[actions.payload[0]] = actions.payload[1];
        },
        TOGGLE_PRICE_RANGE(state, actions) {
            const index = actions.payload[0];
            state.priceRange[index] = state.priceRange[index] === null ? actions.payload[1] : null;
        },
        SORT_PRICE_DOWN(state) { state.sortOrder = 'sortPriceDown' },
        SORT_PRICE_UP(state) { state.sortOrder = 'sortPriceUp' },
        SORT_NAME_UP(state) { state.sortOrder = 'sortNameUp' },
        SORT_NAME_DOWN(state) { state.sortOrder = 'sortNameDown' },
        SORT_DEFAULT(state) { state.sortOrder = '' },
        LOGIN_USER(state, actions) { state.loginUser = actions.payload }
    }
})


export const { MOBILE_MENU_ACTIVE, PRICE_LIST_DISPLAY, MATERIAL_LIST_DISPLAY, MOBILE_SEARCHBAR_ACTIVE , CART_PRICE_UPDATE_OPTIONSELECT, UPDATE_OPTIONSELECTED_ID, TOGGLE_PRICE_RANGE, SORT_PRICE_DOWN, SORT_PRICE_UP, SORT_NAME_UP, SORT_NAME_DOWN, SORT_DEFAULT, LOGIN_USER } = furnitureSlice.actions;
export default furnitureSlice.reducer;