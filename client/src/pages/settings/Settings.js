import React, { useContext, useState } from 'react';
import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../context/Context';
import axios from 'axios';

const Settings = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const {user, dispatch} = useContext(Context);
    
    const PF = "https://mern-tutorials-blog-api.vercel.app/images/";

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type: 'UPDATE_START'})

        const updatedUser = {
            userId: user._id,
            username: username,
            email: email,
            password: password
        }

        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file)
            updatedUser.profilePic = filename;

            try{
                await axios.post("https://mern-tutorials-blog-api.vercel.app/api/upload", data);
            }catch(err){
                
            }
        }
        
        try{
            const res = await axios.put('https://mern-tutorials-blog-api.vercel.app/api/users/'+user._id, updatedUser);
            setSuccess(true);
            
            dispatch({type: 'UPDATE_SUCCESSFUL', payload: res.data});
        }catch(err){
            dispatch({type: 'UPDATE_FAILURE'});
        }
    }

    const handleDelete = async ()=>{
        
        try{
            await axios.delete('https://mern-tutorials-blog-api.vercel.app/api/users/'+user._id, {
                data: {
                    username: user.username,
                    userId: user._id
                }
            })
            dispatch({type: 'LOGOUT'})
            alert('Your profile is deleted!');
            // window.location.replace('/');
        }catch(err){

        }
    }

    console.log(user);

    return (
        <div className='settings'> 
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className='settingsUpdateTitle'>Update Your Account</span>
                    <span onClick={handleDelete} className='settingsDeleteTitle'>Delete Your Account</span>
                </div>

                {/* {file ? URL.createObjectURL(file) : PF + user.profilePic} */}

                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>

                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : user.profilePic ? PF + user.profilePic : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} alt="" />

                        <label htmlFor="fileInput">
                            <FontAwesomeIcon className='settingsPPIcon' icon={faUserCircle}/>
                        </label>
                        <input type="file" id='fileInput' style={{display: 'none'}} onChange={(e)=>setFile(e.target.files[0])} />
                    </div>

                    <label>Username</label>
                    <input required type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)} />

                    <label>Email</label>
                    <input required type="email" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)} />
                    
                    <label>Password</label>
                    <input required minLength={'4'} type="password" onChange={(e)=>setPassword(e.target.value)} />

                    <button className="settingsSubmit" type='submit'>Update</button>

                    {success && <span style={{color:'green', marginTop:'20px', alignSelf:'center'}}>Profile has been updated!</span>}
                </form>
            </div>

            <Sidebar/>
        </div>
    );
};

export default Settings;
