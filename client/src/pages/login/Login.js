import React, { useContext, useRef } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';

const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching} = useContext(Context);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type: "LOGIN_START"})

        try{
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value
            })

            dispatch({type: 'LOGIN_SUCCESSFUL', payload: res.data});
            alert('Login Successful!')
        }catch(err){
            dispatch({type: 'LOGIN_FAILURE'});
            alert('Please give correct info!');
            window.location.reload();
        }
    }

    return (
        <div className='login'>
            <span className="loginTitle">Login</span>

            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input required className='loginInput' type="text" placeholder='Enter your username...' ref={userRef} />
                
                <label>Password</label>
                <input required className='loginInput' type="password" placeholder='Enter your password...' ref={passwordRef} />

                <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
            </form>

            <button className="loginRegisterButton"><Link className='link' to='/register'>Register</Link></button>
        </div>
    );
};

export default Login;