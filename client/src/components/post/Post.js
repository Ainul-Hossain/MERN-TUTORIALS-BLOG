import React from 'react';
import './post.css';
import {Link} from 'react-router-dom';

const Post = ({post}) => {
    // console.log(post);

    const PF = "http://localhost:5000/images/";

    return (
        <div className='post'>
            {
                post.photo && (
                    <img className='postImage' src={PF + post.photo} alt="" />
                )
            }

            <div className="postInfo">
                <div className="postCats">
                    {
                        post.categories.map((cat, i)=>{
                            return <span key={i} className="postCat">{cat.name}</span>
                        })
                    }
                </div>
                
                <Link to={`/post/${post._id}`} className='link'><span className="postTitle">{post.title}</span></Link>
                <hr />
                <span className="postDate">{post.username}</span>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                <p className='postDesc'>{post.desc}</p>
            </div>
        </div>
    );
};

export default Post;