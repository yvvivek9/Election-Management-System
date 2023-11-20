import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../Styling/login.css';

export default function Login({ setLogIn, setLoading }) {
    useEffect(() => {
        setLoading(false);
    }, []);

    const navigate = useNavigate();

    const handleClick = async () => {
        var inputID = document.getElementById('login-id');
        var inputPWD = document.getElementById('login-password');
        if (inputID.value.length !== 0 && inputPWD.value.length !== 0) {
            if (inputID.value === "admin" && inputPWD.value === "admin") {
                setLoading(true);
                setLogIn({ status: true, user: 'Admin', id: '34567' });
                navigate('/owner/dashboard');
            }
            else {
                alert("Invalid Credentials");
                inputID.value = "";
                inputPWD.value = "";
            }
        }
        else {
            alert("Please enter your credentials");
        }

    }

    return <div className='login-screen'>
        <div className='login-container'>
            <div style={{ height: '10vh' }} />
            <input type='text' id='login-id' placeholder='Enter your ID' /><br />
            <div style={{ height: '3vh' }} />
            <input type='password' id='login-password' placeholder='Enter your password' /><br />
            <div style={{ height: '5vh' }} />
            <button onClick={handleClick}>Login</button>
        </div>
    </div>
}