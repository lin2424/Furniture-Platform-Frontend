import React, { useRef } from 'react';
import './styles/confirmPage.scss'
import ConfirmFooter from "./ConfirmFooter";
import ConfirmDetails from "./ConfirmDetails";
import { useBackListener } from '../../constants.js';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

const ConfirmationPage = () => {
    const navigate = useNavigate();

    useBackListener(() => {
            navigate(`/myAccount/${localStorage.getItem('user')}`, { replace: true });
        }
    );
    
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'order-confirmation',
    });


    return (
        <div className='confirmation-page' >
            <Grid container justifyContent="flex-end">
                <Button variant="contained" color='error' onClick={handlePrint} >Print PDF</Button>
            </Grid>
            <ConfirmDetails inputRef={componentRef} />
            <ConfirmFooter/>
        </div>
    );
};

export default ConfirmationPage;

