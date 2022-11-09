import "./styles/LoginPage.scss";
import React, {useState} from "react";
import { FaAngleRight } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../../features/furnitureSlice.js";
import { useChangePasswordMutation, useLoginMutation, useRegisterMutation } from "../../features/userApiSlice.js";
import ScrollToSomewhereOnMount from "../helps/ScrollToSomewhereOnMount";


const LoginPage = () => {
    const [changePasswordMode, setChangePasswordMode] = useState(false);
    const dispatch = useDispatch();
    const [loginErrorDisplay, setLoginErrorDisplay] = useState('none');
    const [login] = useLoginMutation();
    const [changePassword] = useChangePasswordMutation();
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const [passwordWarning, setPasswordWarning] = useState('none');
    const [duplicateAccount, setDuplicateAccount] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
    
    const handleShowPasswordReset = () => {
        setChangePasswordMode(true);
        setLoginErrorDisplay('none');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        try {
            const response = await login({"email": `${data.get('email')}`, "password": `${data.get('password')}`});
            const { accessToken, id } = response?.data;
            dispatch(LOGIN_USER(`${id}`));
            localStorage.setItem('TOKEN', accessToken);
            localStorage.setItem('user', `${id}`);
            if (localStorage.getItem('cartArr')){
                navigate('/cart', { replace: true })
            } else {
                navigate(`/myAccount/${id}`, { replace: true }); 
            }
        } catch(e) {
            if (loginErrorDisplay === 'none') setLoginErrorDisplay('block');
        } 
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        if (data.get('password') !== data.get("confirmpassword")){
            setDuplicateAccount(false);
            setPasswordWarning('block');
        } else {
            const json = {
                "firstName": data.get('firstname'),
                "lastName": data.get('lastname'),
                "email": data.get('email'),
                "password": data.get('password')
            }

            try {
                const response = await register(json);

                if (response.error && response.error.originalStatus === 409) {
                    setDuplicateAccount(true);
                    if (passwordWarning === 'none') setPasswordWarning('block');
                } else if (response.data) {
                    setPasswordWarning('none');
                    setLoginSuccess(true);
                }
            } catch(e) {
                console.log('fail to register!', e); 
            }
        }
    }


    const handleChangePassword = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        try {
            const response = await changePassword({
                "email": data.get('email'),
                "password": data.get('password'),
                "newPassword": data.get('newPassword')
            })

            if (response.error && response.error.originalStatus === 401) {
                setLoginErrorDisplay('block');
                return;
            } else if (response.data.code === 200) {
                setLoginErrorDisplay('none');
                setChangePasswordMode(false);
                setChangePasswordSuccess(true);
            }

        } catch(e) {
            window.alert('change password attempt failed!');
            console.log('error:', e);
        }
    }

  return (
    <>
        <ScrollToSomewhereOnMount/>
        <div className="breadcrumb-nav">
            <div className="breadcrumb-nav__ele">
                <a href="/home">
                    <span>Office</span>
                    <FaAngleRight size={11} style={{position:"relative", top:'2px'}} />
                </a>
            </div>
            <div className="breadcrumb-nav__ele last">
                <a href="/login">Sign In</a>
            </div>
        </div>

        <div className="log-container">
            <div className="log-wrapper">
                <h1 style={{marginBottom: "60px"}}>Sign In or Register</h1>

                <div className="col-container">
                    <div className="col-1">
                        <div className="log-box">
                            <legend className="legend-heading">
                                <h2>Sign In</h2>
                                <div className="log-required">
                                    * Required
                                </div>
                            </legend>

                            {!changePasswordMode ? <form onSubmit={handleLogin}>
                                <div className="left-form">
                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="email">
                                                Email*
                                            </label>
                                            <div>
                                                <input type="text" name="email" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="password">
                                                Password*
                                            </label>
                                            <div>
                                                <input type="password" name="password" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="loginError" style={{display:`${loginErrorDisplay}`}}>
                                        <IoWarningOutline color="red" size={36} />
                                        <div className="loginError-msg">
                                            <h2>There was a problem</h2>
                                            <span>Either email or password is wrong!</span>
                                        </div>
                                    </div>

                                    {changePasswordSuccess && <div className="registerSuccess">
                                             <span>You have successfully changed your password! Please sign in!</span>
                                    </div>}

                                    <div className="form-row">
                                        <button className="loginPageBtn" type="submit" disabled="">
                                            Sign In
                                        </button>
                                        <button className="loginPageBtn reset" onClick={handleShowPasswordReset}>Reset Password</button>
                                    </div>
                                </div>
                            </form> :
                            
                            <form onSubmit={handleChangePassword}>
                                <div className="left-form">
                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="email">
                                                Email*
                                            </label>
                                            <div>
                                                <input type="text" name="email" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="password">
                                                Old password*
                                            </label>
                                            <div>
                                                <input type="password" name="password" required/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="password2">
                                                Type new password*
                                            </label>
                                            <div>
                                                <input type="password" name="newPassword" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="loginError" style={{display:`${loginErrorDisplay}`}}>
                                        <IoWarningOutline color="red" size={36} />
                                        <div className="loginError-msg">
                                            <h2>There was a problem</h2>
                                            <span>Your old password is wrong!</span>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <button className="loginPageBtn" type="submit" disabled="">
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                            </form>
                            
                            }

                        </div>
                    </div>
                
                    <div className="col-2"> 
                        <div className="log-box">
                            <legend>    
                                <h2>Register</h2>
                                <div className="log-required">
                                    * Required
                                </div>
                            </legend>
                            
                            <form onSubmit={handleRegister}>
                                <div>
                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="first name">
                                                First name*
                                            </label>
                                            <div>
                                                <input type="text" name="firstname" required/>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="last name">
                                                Last name*
                                            </label>
                                            <div>
                                                <input type="text" name="lastname" required/>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="email">
                                                Email*
                                            </label>
                                            <div>
                                                <input type="email" name="email" required/>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="password">
                                                Password*
                                            </label>
                                            <div>
                                                <input type="password" name="password" required/>
                                            </div>
                                        </div>
                                    </div>
                            
                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="confirm password">
                                                Confirm password*
                                            </label>
                                            <div>
                                                <input type="password" name="confirmpassword" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="loginError" style={{display:`${passwordWarning}`}}>
                                        <IoWarningOutline color="red" size={36} />
                                        <div className="loginError-msg">
                                            <h2>There was a problem</h2>
                                            {duplicateAccount ? <span>The email address you specified is already in use. Do you already have an account?</span> : <span>Passwords do not match!</span>}
                                        </div>
                                    </div>

                                    {loginSuccess && <div className="registerSuccess">
                                             <span>You have successfully registered your account! Please sign in!</span>
                                    </div>}


                            
                                    <div className="form-row">
                                        <button className="loginPageBtn" type="submit" disabled="">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage