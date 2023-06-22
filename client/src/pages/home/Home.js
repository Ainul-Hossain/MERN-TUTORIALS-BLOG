import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import './home.css';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const {search} = useLocation();

    // console.log(search);

    useEffect(()=>{
        const fetchPosts = async function (){
            const res = await axios.get("https://mern-tutorials-blog-api.vercel.app/api/posts"+search);  // proxy is not working that's why full backend link here
            
            setPosts(res.data);
        }

        fetchPosts();
    }, [search]);

    return (
        <>
            <Header />
            <div className='home'>
                <Posts posts={posts}/>
                <Sidebar/>
            </div>
        </>
    );
};

export default Home;
