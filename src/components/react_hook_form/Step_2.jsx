import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MainContainer from './MainContainer.jsx';
import PrimaryButton from './PrimaryButton.jsx';
import { CHOOSE_SHIPPING } from '../../features/formSlice.js';


const Step_2 = () => {
    const [activeBorder, setActiveBorder] = useState(['3px solid rgba(0,107,200,0.7)','','']);
    const [shippingOption, setShippingOption] = useState('Standard Shipping');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { personalInfo } = useSelector(state => state.form);


    const cbClick = () => {
        dispatch(CHOOSE_SHIPPING(shippingOption));
        localStorage.setItem('shippingInfo', JSON.stringify({...personalInfo, "shipping_option": shippingOption}));

        navigate('/checkout/review');
    }

    const handleChange = (event) => {
        setShippingOption(event.currentTarget.value);
    };

    const handleButton1 = () => {
        setActiveBorder(['3px solid rgba(0,107,200,0.7)','','']) 
    }

    const handleButton2 = () => {
        setActiveBorder(['','3px solid rgba(0,107,200,0.7)','']) 
    }

    const handleButton3 = () => {
        setActiveBorder(['','','3px solid rgba(0,107,200,0.7)']) 
    }

    

    return (
        <MainContainer>
            <Typography variant='h4' component='h1' sx={{marginBottom: 8}}>
                Choose Delivery Method
            </Typography>

            <FormControl sx={{margin: "20px 0"}}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                   Shipping 
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={shippingOption}
                    onChange={handleChange}
                >
                    <FormControlLabel 
                        onClick={handleButton1} 
                        sx={{p: 2, pl: 1, border: activeBorder[0], borderRadius: '10px'}} 
                        value="Standard Shipping" 
                        control={<Radio />} 
                        label={<><Typography>Standard Shipping</Typography><Typography sx={{opacity: 0.5, fontSize: 13}}>3-5 business days</Typography></>} 
                    />

                    <FormControlLabel 
                        onClick={handleButton2} 
                        sx={{p: 2, pl: 1, border: activeBorder[1], borderRadius: '10px'}} 
                        value="Express Shipping" 
                        control={<Radio />} 
                        label={<><Typography>Express Shipping</Typography><Typography sx={{opacity: 0.5, fontSize: 13}}>2-3 business days</Typography></>} 
                    />

                    <FormControlLabel 
                        onClick={handleButton3} 
                        sx={{p: 2, pl: 1, border: activeBorder[2], borderRadius: '10px'}} 
                        value="Next Day Air" 
                        control={<Radio />} 
                        label={<><Typography>Next Day Air</Typography><Typography sx={{opacity: 0.5, fontSize: 13}}>next day arrive</Typography></>} 
                    />
                </RadioGroup>
            </FormControl>
                
            <PrimaryButton onClick={cbClick}>
                Next: Review
            </PrimaryButton>

            <Typography sx={{p:1, transform: "translate(160px, -220px)", border: "1px double grey", borderRadius: "10px"}} variant='div'>{activeBorder[0] ? "+0" : activeBorder[1] ? "+$7.99" : "+$15.99"}</Typography>

        </MainContainer>
    )
}

export default Step_2