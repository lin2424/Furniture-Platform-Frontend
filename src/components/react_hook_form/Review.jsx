import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Typography, Table } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MainContainer from './MainContainer.jsx';
import PrimaryButton from './PrimaryButton.jsx';
import { useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { stripePublishableKey } from '../../constants.js';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../customHook/useAxiosPrivate.js';

const Review = () => {
    const { personalInfo } = useSelector(state => state.form);
    const [displayPayBtn, setDisplayPayBtn] = useState(false);
    const [entries, setEntries] = useState(personalInfo || {});
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const item = {
        price: "price_1LUDdLA8y6PPVv2erojeXjVf",
        quantity: 1,
    }

    const checkoutOptions = {
        lineItems: [item],
        mode: "payment",
        successUrl: `${window.location.origin}/confirm/${localStorage.getItem('order')}`,
        cancelUrl: `${window.location.origin}/checkout/review`,
    }

    const handleStripe = async () => {
        const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
        let orderId = null;
        if (localStorage.getItem('order')) {
            orderId = localStorage.getItem('order');
        } else {
            window.alert('Oops! We lost your order information! Please try again!');
            navigate(`/myAccount/${localStorage.getItem('user')}`);
        }

        try {
            const paymentInfo = {
                "orderId": orderId,
                "paymentStatus": 1,
                "firstName": shippingInfo.firstName,
                "lastName": shippingInfo.lastName,
                "phone": shippingInfo.cellPhone,
                "shipping_address": shippingArray.join(", "),
                "billing_address": billingArray.join(", "),
                "payment_Plan": "one time",
                "payment_type": "stripe",
                "shipping_option": shippingInfo.shipping_option
            }
            await axiosPrivate.post('/payment', paymentInfo)
        } catch (e) {
            window.alert('Error on creating order! Please try again or double check your order.')
        }

        const stripe = await loadStripe(stripePublishableKey);
        await stripe.redirectToCheckout(checkoutOptions);
        stripe.confirmCardPayment(clientSecret).then(async function(response) {
            if (response.error) {
                console.log(response.error);
            } else if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
                try { 
                    const paymentSuccess = {
                        "paymentStatus": 2,
                        "paymentId": localStorage.getItem('order')
                    }

                    await axiosPrivate.put(`/payment/${localStorage.getItem('user')}`, paymentSuccess) // update paymentStatus upon successful payment

                    navigate(`/confirm/${localStorage.getItem('order')}`, {replace: true});
                } catch(e) {
                    console.log('payment failed!', e);
                    return;
                }
            }
        });
    }

    useEffect(() => {
        if (localStorage.getItem('shippingInfo')) {
            const dataFromStorage = JSON.parse(localStorage.getItem('shippingInfo'));
            setEntries({...dataFromStorage});
        }
    }, [])

    const cbClick = () => {
        if (Object.values(entries).some(value => !value)) {
            window.alert('Please fill in all required information before proceed!');
            return;
        } else {
            setDisplayPayBtn(true);
        }

        paypal.Buttons({
            // Configure environment
            env: 'sandbox',
            client: {
                sandbox: 'AT00CBFees-dWFZkvRZIdRoC-HcSBflw-Bi2e7S1Y1mCGOlY46BUkBEOTElGDUFwfPEuyy9afsitY7xF',
                production: 'AWy7L0BwPpJU1qoh9hNZiR9-sadMHUpnOhlRbTw9ha-4LOhB9y4biARxSpBnk1KjbaXEHCnv1pBhumgI'
            },
            // Customize button (optional)
            locale: 'en_US',
            funding: {
                allowed: [paypal.FUNDING.CARD],
                disallowed: [paypal.FUNDING.CREDIT]
            },
            // Enable Pay Now checkout flow (optional)
            commit: true,
            style: {
                layout: 'horizontal',
                color:  'blue',
                shape:  'pill',
                label:  'pay',
                height: 40
            },
            createOrder: async (data, actions) => {
                const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
                let orderId = null;
                if (localStorage.getItem('order')) {
                    orderId = localStorage.getItem('order');
                } else {
                    window.alert('Oops! We lost your order information! Please try again!');
                    navigate(`/myAccount/${localStorage.getItem('user')}`);
                }
                const shippingArray = [shippingInfo.shipping_address, shippingInfo.shipping_city, shippingInfo.shipping_state, shippingInfo.shipping_postalCode, shippingInfo.shipping_country];
                const billingArray = [shippingInfo.billing_address, shippingInfo.billing_city, shippingInfo.billing_state, shippingInfo.billing_postalCode, shippingInfo.billing_country];

                const paymentInfo = {
                    "orderId": orderId,
                    "paymentStatus": 1,
                    "firstName": shippingInfo.firstName,
                    "lastName": shippingInfo.lastName,
                    "phone": shippingInfo.cellPhone,
                    "shipping_address": shippingArray.join(", "),
                    "billing_address": billingArray.join(", "),
                    "payment_Plan": "one time",
                    "payment_type": "payPal",
                    "shipping_option": shippingInfo.shipping_option
                }

                await axiosPrivate.post('/payment', paymentInfo)

                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '77.44' // Can also reference a variable or function
                        }
                    }] 
                });
            },
            onApprove: async () => {
                try { 
                        const paymentSuccess = {
                            "paymentStatus": 2,
                            "paymentId": localStorage.getItem('order')
                        }

                        await axiosPrivate.put(`/payment/${localStorage.getItem('user')}`, paymentSuccess) // update paymentStatus upon successful payment

                        navigate(`/confirm/${localStorage.getItem('order')}`, {replace: true});
                    } catch(e) {
                        console.log('payment failed!', e);
                        return;
                    }
            }
        }).render('#paypal-button-container');
    }

    return (
        <MainContainer>
            <Typography variant='h4' component='h1' >
                Review you information
            </Typography>

            <TableContainer component={ Paper } sx={{my: 5}}> 
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'  sx={{fontSize: 20}} >Field</TableCell>
                            <TableCell align='center'  sx={{fontSize: 20}} >Value</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {Object.entries(entries).length && Object.entries(entries).map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>{entry[0]}</TableCell>
                                <TableCell>{entry[1]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className='payment-btn'>
                <div id="paypal-button-container"></div>
                {!displayPayBtn ? <PrimaryButton onClick={cbClick}>
                    Continue to secure payment
                </PrimaryButton> : 
                    <button onClick={handleStripe}>Stripe</button>
                }
            </div>
        </MainContainer>
    )
}

export default Review