import React from 'react';
import './Posts.css';
import Post from '../post/Post';

const Posts = ({posts}) => {
    return (
        <div className='posts'>
            {
                posts.map((post, i)=>{
                    return <Post key={i} post={post}/>
                })
            }
        </div>
    );
};

export default Posts;