export const useBillingAddress = (setValue, ref, setChecked) => {
    const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById( 'autocomplete2'),
        {
            types: ['address'],
            componentRestrictions: {'country': 'CA'},
        }
    )
    autocomplete.addListener('place_changed', () => {

        let addressArray = autocomplete.getPlace().address_components;
        const address = {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: ""
        }
        addressArray.forEach(ele => {
            if (ele.types.includes('street_number')) {
                address.street += ele.long_name;
            }
            if (ele.types.includes('route')) {
                if (address.street === "") {
                    address.street += ele.short_name;
                } else {
                    address.street += ` ${ele.short_name}`;
                }
            }
            if (ele.types.includes('postal_code')) {
                address.postalCode += ele.long_name;
            }
            if (ele.types.includes('locality')) {
                address.city += ele.long_name; 
            }
            if (ele.types.includes('administrative_area_level_1')) {
                address.state += ele.short_name;
            }
            if (ele.types.includes('country')) {
                address.country += ele.long_name;
            }
        })
        if (ref.current.checked) setChecked(false);
        
        setValue("billing_postalCode", address.postalCode)
        setValue("billing_country", address.country) 
        setValue("billing_state", address.state)
        setValue("billing_city", address.city)
        setValue("billing_address", address.street);
    })
}