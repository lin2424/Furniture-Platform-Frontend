//  react_hook_form/Step_1.jsx
export const handleAddressCheckbox = (e, setValue, setChecked, postalCodeWatch, countryWatch, stateWatch, cityWatch, addressWatch) => {
    if (e.target.checked) {
        setValue("billing_postalCode", postalCodeWatch);
        setValue("billing_country", countryWatch);
        setValue("billing_state", stateWatch);
        setValue("billing_city", cityWatch);
        setValue("billing_address", addressWatch);
    } else {
        setValue("billing_address", "");
        setValue("billing_city", "");
        setValue("billing_state", "");
        setValue("billing_postalCode", "");
        setValue("billing_country", "");
    }
    setChecked(e.target.checked);
}

// mainPage-products/productTile_1.jsx
export const filterAndSort = (data, sortOrder, setFilterSortData) => {
    // let filteredData = [];

    // Filter
    // if (data.length !== 0) {
    //     const dataObj = data.data;
    //     filteredData = dataObj?.filter((ele) =>
    //         // When there is no price, return all
    //         priceRange.every(range => range === null) ? ele : priceRange?.some(range => range && ele.price >= range[0] && ele.price <= range[1]));
    //     // console.log('filteredData',filteredData)
    // }

    // Sort
    if (sortOrder) {
        switch (sortOrder) {
            case "sortPriceDown":
                data.sort((a,b) => Number(b.price) - Number(a.price))
                break;
            case "sortPriceUp":
                data.sort((a,b) => Number(a.price) - Number(b.price))
                break;
            case "sortNameUp":
                data.sort((a,b) => a.slug < b.slug ? -1 : 1)
                break;
            case "sortNameDown":
                data.sort((a,b) => b.slug < a.slug ? -1 : 1)
                break;
            default:
                return;
        }
    }
    // return final manipulated array
    setFilterSortData(data);
}