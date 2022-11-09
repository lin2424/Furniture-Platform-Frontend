import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { axiosPrivate } from '../../customHook/axios.js';

export default function AlertDialog() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = () => {
        navigate('/login');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const displayCheckout = async () => {
        const cart = JSON.parse(localStorage.getItem('cartArr'));
        let orderItems = []
        for (let cartItem of cart) {
            const { chairObj, qty, profileItems } = cartItem;
            orderItems.push({
                "quantity": qty,
                "product": chairObj,
                "profileItems": profileItems
            })
        }

        try {
            const order = ({
                "isActive": true,
                "isDelete": false,
                "orderItems": orderItems,
                "user": localStorage.getItem('user')
            })
            const response = await axiosPrivate.post('/order', order, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
                }
            })

            if (response.data.code !== 200) {
                window.alert('some of your choosen products might not available any more!');
            } else {
                if (response?.data?.data?.order) {
                    const {data: {data : {order}}} = response;
                    localStorage.setItem('order', order);
                    localStorage.removeItem('cartArr');
                    navigate('/checkout/step1');
                } else {
                    window.alert('Oops! We have some problems of processing your order. Please try again!');
                } 
            }
        } catch (e) { 
           handleClickOpen(); 
        }


    }

    return (
        <div>
            <Button variant="outlined" onClick={displayCheckout} color="error">
                Checkout
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"You need to login first!"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Turn to login page now?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleYes}>Yes</Button>
                    <Button onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}