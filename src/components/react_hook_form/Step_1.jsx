import { Box, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Form from './Form.jsx';
import { Input } from './Input.jsx';
import MainContainer from './MainContainer.jsx';
import PrimaryButton from './PrimaryButton.jsx';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { PERSONAL_INFO } from '../../features/formSlice.js';
import { useShippingAddress } from '../../customHook/useShippingAddress.js';
import { useBillingAddress } from '../../customHook/useBillingAddress.js';
import { handleAddressCheckbox } from '../../helperFunc.js';


const schema = yup.object({
    firstName: yup.string().min(2)
    .matches(/^([^0-9]*)$/, "first name should not contain numbers")
    .required(), 
    lastName: yup.string().min(2)
    .matches(/^([^0-9]*)$/, "last name should not contain numbers")
    .required(),
    email: yup.string().email().required(),
    cellPhone: yup.string().required(),
    shipping_address: yup.string().max(100).required(),
    shipping_city: yup.string().max(30).required(),
    shipping_state: yup.string().max(30).required(),
    shipping_postalCode: yup.string().max(10).required(),
    shipping_country: yup.string().max(30).required(),
    billing_address: yup.string().max(100).required(),
    billing_city: yup.string().max(30).required(),
    billing_state: yup.string().max(30).required(),
    billing_postalCode: yup.string().max(10).required(),
    billing_country: yup.string().max(30).required()
}).required();


const Step_1 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { firstName, lastName, email, cellPhone, shipping_address, shipping_city, shipping_state, shipping_postalCode, shipping_country, billing_address, billing_city, billing_state, billing_postalCode, billing_country } = useSelector(state => state.form.personalInfo);
    const [checked, setChecked] = useState(false);
    const ref = useRef();

    const { watch, setValue, register, handleSubmit, formState:{ errors } } = useForm({
        defaultValues: {
            firstName,
            lastName,
            email,
            cellPhone,
            shipping_address,
            shipping_city,
            shipping_state,
            shipping_postalCode,
            shipping_country,
            billing_address,
            billing_city,
            billing_state,
            billing_postalCode,
            billing_country 
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const addressWatch = watch("shipping_address");
    const cityWatch = watch("shipping_city");
    const stateWatch = watch("shipping_state");
    const postalCodeWatch = watch("shipping_postalCode");
    const countryWatch = watch("shipping_country");


    setTimeout(() => useShippingAddress(setValue), 0)
    setTimeout(() => useBillingAddress(setValue, ref, setChecked), 0)


    const cbClick = (data) => {
        const personalInfo = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            cellPhone: data.cellPhone,
            shipping_address: data.shipping_address,
            shipping_city: data.shipping_city,
            shipping_state: data.shipping_state,
            shipping_postalCode: data.shipping_postalCode,
            shipping_country: data.shipping_country,
            billing_address: data.billing_address,
            billing_city: data.billing_city,
            billing_state: data.billing_state,
            billing_postalCode: data.billing_postalCode,
            billing_country: data.billing_country, 
        };
        if (Object.values(personalInfo).includes('')) {
            window.alert('Please fill in all required fields!');
        } else {
            dispatch(PERSONAL_INFO(personalInfo));
            navigate('/checkout/step2');
        }
    }

    const handleClick = (e) => {
        return handleAddressCheckbox(
            e, 
            setValue, 
            setChecked, 
            postalCodeWatch, 
            countryWatch, 
            stateWatch, 
            cityWatch, 
            addressWatch
        );
    }

    return (
        <MainContainer>
            <Typography variant='h4' component='div' sx={{marginBottom: 8, maxWidth:{xs:"80%", sm:"75%", md:"70%", lg:"60%"}}}>
                Enter your Personal Information
            </Typography>

            <Form onSubmit={handleSubmit(cbClick)}>

                {/* Shipping Address */}
                <Typography variant='h5' component='span'>Shipping Address</Typography>
                <Box sx={{
                    '& > :not(style)': { width: '30ch', m: "3ch" },
                }}>
                    <Input
                        type="text"
                        label="first name"
                        {...register('firstName', { required: true })}
                        error={!!errors.firstName}
                        helperText={errors?.firstName?.message}
                    />
                    <Input 
                        type="text"
                        label="last name"
                        {...register('lastName', { required: true })}
                        error={!!errors.lastName}
                        helperText={errors?.lastName?.message}
                    />
                </Box>
                
                <Box sx={{
                    '& > :not(style)': { width: '30ch', m: "3ch" },
                }}>
                    <Input 
                        type="email"
                        label="email"
                        {...register('email', { required: true })}
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                    />
                    <Input 
                        type="tel"
                        label="cell phone number"
                        {...register('cellPhone', { required: true })}
                        error={!!errors.cellPhone}
                        helperText={errors?.cellPhone?.message}
                    />
                </Box>
                
                <Input
                    id="autocomplete1"
                    type="text"
                    label="address"
                    {...register('shipping_address', { required: true })}
                    error={!!errors.shipping_address}
                    helperText={errors?.shipping_address?.message}
                    sx={{my: "2ch"}}
                />


                <Box sx={{
                    '& > :not(style)': { width: '19ch', mx: "1ch", mt: "3ch", mb: "5ch" },
                }}>
                    <Input 
                        type="text"
                        label="city"
                        {...register('shipping_city', { required: true })}
                        error={!!errors.shipping_city}
                        helperText={errors?.shipping_city?.message}
                    />
                    <Input 
                        type="text"
                        label="state"
                        {...register('shipping_state', { required: true })}
                        error={!!errors.shipping_state}
                        helperText={errors?.shipping_state?.message}
                    />
                    <Input 
                        type="text"
                        label="postalCode"
                        {...register('shipping_postalCode', { required: true })}
                        error={!!errors.shipping_postalCode}
                        helperText={errors?.shipping_postalCode?.message}
                    />
                    <Input 
                        type="text"
                        label="country"
                        {...register('shipping_country', { required: true })}
                        error={!!errors.shipping_country}
                        helperText={errors?.shipping_country?.message}
                    />
                </Box> 
                

                {/* Billing Address */}
                <FormControlLabel label="Use as Billing address" 
                    control={
                        <Checkbox 
                            inputRef={ref} 
                            checked={checked} 
                            onChange={handleClick} 
                            inputProps={{ 'aria-label': 'controlled' }} 
                        /> 
                    }
                />
                <Divider variant="middle" />

                <Typography variant='h5' component='div' sx={{ my: "3ch" }}>Billing Address</Typography>
                <Input
                    id="autocomplete2"
                    type="text"
                    label="address"
                    {...register('billing_address', { required: true })}
                    error={!!errors.billing_address}
                    helperText={errors?.billing_address?.message}
                    sx={{my: "2ch"}}
                />

                <Box sx={{
                    '& > :not(style)': { width: '19ch', mx: "1ch", my: "3ch" },
                }}>
                    <Input 
                        type="text"
                        label="city"
                        {...register('billing_city', { required: true })}
                        error={!!errors.billing_city}
                        helperText={errors?.billing_city?.message}
                    />
                    <Input 
                        type="text"
                        label="state"
                        {...register('billing_state', { required: true })}
                        error={!!errors.billing_state}
                        helperText={errors?.billing_state?.message}
                    />
                    <Input 
                        type="text"
                        label="postalCode"
                        {...register('billing_postalCode', { required: true })}
                        error={!!errors.billing_postalCode}
                        helperText={errors?.billing_postalCode?.message}
                    />
                    <Input 
                        type="text"
                        label="country"
                        {...register('billing_country', { required: true })}
                        error={!!errors.billing_country}
                        helperText={errors?.billing_country?.message}
                    />
                </Box>

                <PrimaryButton >
                    Next: Shipping Method
                </PrimaryButton>
            </Form>


        </MainContainer>
    )
}

export default Step_1