
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss'
import LoginPage from './components/pages/LoginPage.jsx';
import React, { useState, useEffect } from "react";
import CartPage from "./components/pages/CartPage";
import Footer from "./components/Footer/Footer";
import Header from './components/headers/Header.jsx';
import MobileHeaderMenu from './components/headers/MobileHeaderMenu.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER, MOBILE_MENU_ACTIVE } from './features/furnitureSlice.js';
import {ProductPage} from "./components/mainPage-products/ProductPage";
import ProductMain from './components/product_Page/ProductMain.jsx';
import PageNotFound from './components/pages/PageNotFound.jsx';
import LoginSuccess from './components/pages/LoginSuccess.jsx';
import Step_1 from './components/react_hook_form/Step_1.jsx';
import Step_2 from './components/react_hook_form/Step_2.jsx';
import Review from './components/react_hook_form/Review.jsx';
import ConfirmationPage from "./components/react_hook_form/ConfirmationPage";
import "@stripe/stripe-js";
import ScrollToTop from "./components/helps/ScrollToTop";


function App() {
    const dispatch = useDispatch();

    const { mobileMenuActive } = useSelector(state => state.furniture.toggleItemClass);
    const [maskDisplay, setMaskDisplay] = useState('none');
    const token = localStorage.getItem('TOKEN') || '';


    useEffect(() => {
        if (mobileMenuActive === 'active') {
            setMaskDisplay('block');
        }
    }, [mobileMenuActive])

    useEffect(() => {
        if (token) {
            dispatch(LOGIN_USER(token));
        }
    }, [])


    const deactivateMobileMenu = () => {
        if (maskDisplay === 'block') {
            setMaskDisplay('none');
            dispatch(MOBILE_MENU_ACTIVE());
        }
    }

    return (
        <div className='mainbody'>
            <MobileHeaderMenu />
            <div className={`mainbody-mainpage ${mobileMenuActive}`} onClick={deactivateMobileMenu}>
                <div className="mask" style={{display:`${maskDisplay}`}}></div>
                <ScrollToTop/>
                <Header/>

                <Routes>
                    <Route path="/" element={<Navigate to="Home/1" />}/>
                    <Route path="/Home" element={<Navigate to="Home/1" />}/> 
                    <Route path="/Home/:pageNum" element={<ProductPage/>}/>
                    <Route path="/product/:id" element={<ProductMain/>} />
                    <Route path="/product/edit/:id/:row" element={<ProductMain editMode="true" />} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/cart" element={<CartPage/>} />
                    <Route path="/myAccount/:id" element={ <LoginSuccess />} />

                    <Route path="/checkout/step1" element={<Step_1 />} />
                    <Route path="/checkout/step2" element={<Step_2 />} />
                    <Route path="/checkout/review" element={<Review />} />
                    <Route path="/confirm/:orderId" element={<ConfirmationPage />} />
                    <Route path="*" element={<PageNotFound/>}></Route>
                </Routes>

                <Footer/>
            </div>      
        </div>
    )

    // else if (isError) {
    //     return (
    //         <div className='mainbody'>
    //             <MobileHeaderMenu />
    //             <div className={`mainbody-mainpage ${mobileMenuActive}`} onClick={deactivateMobileMenu}>
    //                 <div className="mask" style={{display:`${maskDisplay}`}}></div>
    //                 <Header/>
    //                 <div style={{minHeight: "50vh"}}>
    //                     <h1>404 Error!</h1>
    //                     <h3 className='apiErrorMsg'>Sorry, the server is down! But we will be back soon!</h3>
    //                 </div>
    //                 <Footer/>
    //             </div>      
    //         </div>
    //     )
    // }
        
}

export default App;