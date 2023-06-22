import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className="headerTitles">
                <span className='headerTitleSm'>JavaScript, React & Node</span>
                <span className='headerTitleLg'>Blog</span>
            </div>

            <img className='headerImg' src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" alt="" />
        </div>
    );
};

export default Header;