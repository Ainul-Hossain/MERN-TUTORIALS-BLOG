import React, { useContext, useState } from 'react';
import './write.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../context/Context';
import axios from 'axios';

const Write = () => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);

    const {user} = useContext(Context);

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const newPost = {
            username: user.username,
            title,
            desc,
        }

        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file)
            newPost.photo = filename;

            try{
                await axios.post("https://mern-tutorials-blog-api.vercel.app/api/upload", data);
            }catch(err){

            }
        }

        try{
            const res = await axios.post('https://mern-tutorials-blog-api.vercel.app/api/posts', newPost);
            window.location.replace('/post/'+res.data._id);
        }catch(err){

        }
    }

    return (
        <div className='write'>
            {
                file && (<img className='writeImg' src={URL.createObjectURL(file)} alt="" />)
            }
            
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <FontAwesomeIcon className='writeIcon' icon={faPlus}/>
                    </label>
                    <input style={{display: 'none'}} type="file" id='fileInput' onChange={(e)=>setFile(e.target.files[0])} />
                    
                    <input className='writeInput' autoFocus={true} type="text" placeholder='Title...' onChange={(e)=>setTitle(e.target.value)} />
                </div>

                <div className="writeFormGroup">
                    <textarea rows="20" cols="80" className='writeInput writeText' placeholder='Tell your story...' type='text' onChange={(e)=>setDesc(e.target.value)}></textarea>
                </div>

                <button className='writeSubmit' type='submit'>Publish</button>
            </form>
        </div>
    );
};

export default Write;
