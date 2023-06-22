import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEamil] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setErr(false);

        try{
            const res = await axios.post('https://mern-tutorials-blog-api.vercel.app/api/auth/register', {
                username: username,
                email: email,
                password: password
            })

            res.data && window.location.replace('/login');
            alert('Registration Successful!')
        }catch(err){
            // console.log(err);
            setErr(true);
        }
    };

    return (
        <div className='register'>
            <span className="registerTitle">Register</span>

            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input required onChange={(e)=>setUsername(e.target.value)} className='registerInput' type="text" placeholder='Enter your username...' />

                <label>Email</label>
                <input required onChange={(e)=>setEamil(e.target.value)} className='registerInput' type="email" placeholder='Enter your email...' />
                
                <label>Password</label>
                <input required minLength={'4'} onChange={(e)=>setPassword(e.target.value)} className='registerInput' type="password" placeholder='Enter your password...' />

                <button className="registerButton">Register</button>
            </form>

            <button className="registerLoginButton" type='submit'><Link className='link' to='/login'>Login</Link></button>
            {
                err && <span style={{color: 'red', marginTop: '10px'}}>Something went wrong!</span>
            }
        </div>
    );
};

export default Register;
