import React, { useContext, useEffect, useState } from 'react';
import {Context} from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './singlePost.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SinglePost = () => {
    const location = useLocation();
    
    const path = location.pathname.split('/')[2];

    const [post, setPost] = useState({});

    const PF = "http://localhost:5000/images/";

    const {user} = useContext(Context);

    // for edit in the post
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);


    useEffect(()=>{
        const getPost = async function (){
            const res = await axios.get('http://localhost:5000/api/posts/'+path);

            //console.log(res)

            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }

        getPost();
    }, [path])

    const handleDelete = async ()=>{
        try{
            await axios.delete('http://localhost:5000/api/posts/'+path, {
                data: {username: user.username},
            });
            window.location.replace('/');
        } catch(err){

        }
    }

    const handleUpdate = async ()=>{
        try{
            await axios.put('http://localhost:5000/api/posts/'+post._id, {
                username: user.username,
                title: title,
                desc: desc,
            })
            // window.location.reload();
            setUpdateMode(false);
        }catch(err){
             
        }
    }

    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {
                    post.photo && (
                        <img className="singlePostImg" src={PF + post.photo} alt="" />
                    )
                }

                {
                    updateMode ? <input type="text" value={title} className='singlePostTitleInput' autoFocus onChange={(e)=>setTitle(e.target.value)} /> : (

                        <h1 className="singlePostTitle">
                            {title}
        
                            {
                                post.username === user?.username && (
                                    <div className="singlePostEdit">
                                        <FontAwesomeIcon className='singlePostIcon' icon={faEdit} onClick={()=>setUpdateMode(true)}/>
                                        <FontAwesomeIcon className='singlePostIcon' icon={faTrashAlt} onClick={handleDelete}/>
                                    </div>
                                )
                            }
                        </h1>

                    )
                }

                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Author: <b><Link className='link' to={`/?user=${post.username}`}>{post.username}</Link></b></span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>

                {
                    updateMode ? <textarea rows="20" cols="80" className='singlePostDescInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/>: (

                        <p style={{whiteSpace:"pre-wrap"}} className='singlePostDesc'>{desc}</p>

                    )
                }

                {
                    updateMode && <button className='singlePostButton' onClick={handleUpdate}>Update</button>
                }
            </div>
        </div>
    );
};

export default SinglePost;