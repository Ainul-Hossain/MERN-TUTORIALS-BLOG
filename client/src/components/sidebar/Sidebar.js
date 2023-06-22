import React, { useContext, useEffect, useState } from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagramSquare, faPinterestSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [cats, setCats] = useState([]);
    const {user} = useContext(Context);
    const PF = "http://localhost:5000/images/";

    useEffect(()=>{
        const fetchedCats = async function (){
            const res = await axios.get('http://localhost:5000/api/categories');

            setCats(res.data);
        };

        fetchedCats();
    }, [])

    // console.log(user);

    // if(!user.profilePic){
    //     user.profilePic = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
    // }

    // {user ? PF + user.profilePic : "https://res.cloudinary.com/practicaldev/image/fetch/s--Qhu3PUis--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y63ie8bmktwik5w3mhlg.png"}

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">
                    {user ? `About ${user.username}` : `It's all about JS, React and Node`}
                </span>
                <img className='sidebarImage' src={user ? user.profilePic ? PF + user.profilePic : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png` : "https://res.cloudinary.com/practicaldev/image/fetch/s--Qhu3PUis--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y63ie8bmktwik5w3mhlg.png"} alt="" />
                
                <p>This website offers blog tutorials on JavaScript, React and NodeJS. Would you like to blog here? Open an account today.</p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">
                    CATEGORIES
                </span>
                <ul className="sidebarList">
                    {
                        cats.map((cat, i)=>{
                            return <li key={i} className="sidebarListItem"><Link className='link' to={`/?cat=${cat.name}`}>{cat.name}</Link></li>
                        })
                    }
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">
                    FOLLOW US
                </span>
                <div className="sidebarSocial">
                    <FontAwesomeIcon className="sidebarIcon" icon={faFacebookSquare}/>
                    <FontAwesomeIcon className="sidebarIcon" icon={faTwitterSquare}/>
                    <FontAwesomeIcon className="sidebarIcon" icon={faPinterestSquare}/>
                    <FontAwesomeIcon className="sidebarIcon" icon={faInstagramSquare}/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;