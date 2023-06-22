import React, { useContext } from "react";
import "./topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagramSquare, faPinterestSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Topbar = () => {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = ()=>{
    dispatch({type: 'LOGOUT'})
  }

  return (
    <div className="top">
      <div className="topLeft">
        <FontAwesomeIcon className="topIcon" icon={faFacebookSquare}/>
        <FontAwesomeIcon className="topIcon" icon={faTwitterSquare}/>
        <FontAwesomeIcon className="topIcon" icon={faPinterestSquare}/>
        <FontAwesomeIcon className="topIcon" icon={faInstagramSquare}/>
      </div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem"><Link className="link" to='/'>HOME</Link></li>
          <li className="topListItem"><Link className="link" to='/about'>ABOUT</Link></li>
          <li className="topListItem"><Link className="link" to='/contact'>CONTACT</Link></li>
          <li className="topListItem"><Link className="link" to='/write'>WRITE</Link></li>
          <li className="topListItem" onClick={handleLogout}>
            {user && 'LOGOUT'}
          </li>
        </ul>
      </div>

      {/* {PF + user.profilePic} */}

      <div className="topRight">
        {
          user ? ( <Link to='/settings'><img className="topImg" src={user.profilePic?PF+user.profilePic:`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} alt="" /></Link> ) : ( 
            <ul className="topList">
              <li className="topListItem"><Link className="link" to='/login'>LOGIN</Link></li>
              <li className="topListItem"><Link className="link" to='/register'>REGISTER</Link></li>
            </ul>
          )
        }
        <FontAwesomeIcon className="topSearchIcon" icon={faSearch}/>
      </div>
    </div>
  )
};

export default Topbar;
