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
        setLoading(true);
        var inputID = document.getElementById('login-id');
        var inputPWD = document.getElementById('login-password');
        var inputData = {
            id: inputID.value,
            password: inputPWD.value
        }
        try {
            var response = await axios.post('/validateLogin', inputData);
            if (response.data.success) {
                setLogIn(response.data.details);
                navigate('/dashboard');
            }
            else {
                inputID.value = null;
                inputPWD.value = null;
                setLoading(false);
                alert('Invalid Credentials');
            }
        } catch (error) {
            console.log('In logging in' + error);
            setLoading(false);
        }
    }

    return <div className='login-screen'>
        <div className='login-container'>
            <div style={{ height: '10vh' }} />
            <input type='text' id='login-id' placeholder='Enter your ID' /><br />
            <div style={{ height: '3vh' }} />
            <input type='text' id='login-password' placeholder='Enter your password' /><br />
            <div style={{ height: '5vh' }} />
            <button onClick={handleClick}>Login</button>
        </div>
    </div>
}