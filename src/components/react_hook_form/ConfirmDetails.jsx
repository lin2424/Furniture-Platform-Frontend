import React, { useEffect, useState } from 'react';
import ItemInfo from "./ItemInfo";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../customHook/useAxiosPrivate.js';


const ConfirmDetails = ({inputRef}) => {
    const [orderItem, setOrderItem] = useState(null);
    const { orderId } = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/login');
            return;
        }

        const controller = new AbortController();

        const getOrderDetail = async () => {
            try {
                const response = await axiosPrivate.get(`/order/${orderId}`, {
                    signal: controller.signal
                });
                setOrderItem(response.data.data)
            } catch (err) {
                console.error("error:", err);
                navigate('/login');
            }
        }

        getOrderDetail();

        return () => {
            controller.abort();
        }
    }, [])
    
    const oneChairPaymentArray = orderItem?.order?.pricePerSingleChair.split("|");
    const profileItemforOneChairList = orderItem?.order?.profileItemNameforEachChair.split("|");
    const displayItems = () => orderItem?.order?.orderProduct.map((ele, index) => {
        return <ItemInfo key={index} profileItems={profileItemforOneChairList.slice(index*7, (index+1)*7)} name={ele.product.name}  price={Number(oneChairPaymentArray[index])} qty={ele.amount}  mediaSrc={ele.product.media.split("|")[0]} />
    })

    let today = new Date(orderItem?.createdAt);
    let date = `${today.getFullYear()} / ${today.getMonth() + 1} / ${today.getDate()}`

    return (
        <div ref={inputRef}>
            <div className="check-out-container">
                <div className="confirm-message">
                    <h2>Your Order Confirmed! </h2>
                    <TaskAltOutlinedIcon style={{color : 'green', fontSize : '5rem', translate: ''}}/>
                    <p>{` Hi, ${orderItem?.firstName}, \n
         Your order has been confirmed and will be shipping soon`}</p>
                </div>
                <div className="confirm-details">
                    <div className="order-date-row">
                        <div className="order-date">Order Date
                            <div className="date">
                                {date}
                            </div>
                        </div>
                        <div className="payment">Payment
                            <div className="pay">
                                {orderItem?.payment_type.toUpperCase()}
                            </div></div>
                        <div className="address-title">Address
                            <div className="address-data">
                                {orderItem?.shipping_address}
                            </div></div>
                    </div>

                    {/*product details*/}
                    {displayItems()}

                    <div className="price-section">
                        <div className="subtotal-row">
                            <p>Subtotal</p>
                            <p>${orderItem?.preTaxTotalPrice.toFixed(2)}</p>
                        </div>
                        <div className="shipping-row">
                            <p>{orderItem?.shipping_option}</p>
                            <p>{orderItem?.shipping_option === "Standard Shipping" ? "0.00" : orderItem?.shipping_option === "Express Shipping" ? "7.99" : "15.99"}</p>
                        </div>
                        <div className="tax-row">
                            <p>Taxes</p>
                            <p>${(orderItem?.afterTaxTotalPrice - orderItem?.preTaxTotalPrice).toFixed(2)}</p>
                        </div>
                        <div className="total-row">
                            <p><strong>Total</strong></p>
                            <p>${orderItem?.afterTaxTotalPrice.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="thank-you-message-row">
                        <p>We will send you shipping confirmation when your item(s) are on the way!
                            We appreciate your business, and hope you enjoy your purchase.</p>
                        <p>
                            Thank you!
                        </p>
                        <p>
                            Herman miller
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ConfirmDetails;
