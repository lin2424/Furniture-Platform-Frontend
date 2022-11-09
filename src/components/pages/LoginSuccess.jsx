import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHistoryTable from "./OrderHistory.jsx";


const LoginSuccess = () => {
    const [canRender, setCanRender] = useState(localStorage.getItem('TOKEN') || '');
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!canRender) {
            navigate('/login', { replace: true });
        }
    }, [canRender])

    const handleLogout = () => {
        const keysToRemove = ['TOKEN', 'user', 'order', 'shippingInfo'];
        keysToRemove.forEach(key => { localStorage.removeItem(key); }); 
        setCanRender('');

        navigate('/login', { replace: true });
    }

  return (
    canRender &&
    <div className="log-out-wrapper">
        <h2>Thank you for choosing Herman Miller</h2>
        <div>{`This is your Homepage!`}</div>

        <OrderHistoryTable />
        
        <button className="logOut-Btn" onClick={handleLogout}>Sign Out</button>
    </div>
  )
}
export default LoginSuccess