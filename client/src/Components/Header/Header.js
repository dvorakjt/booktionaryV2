import React from 'react'
import logo from '../../Images/logo192.png';
import bg from '../../Images/isometric-books-vector.jpg';
import './style.css';

function Header() {
    return (
        <header style={{ backgroundImage: "url(" + bg + ")" }}>
            <div id="logoDiv">
                <img src={logo} alt="B" id="logoImg" /><h1>ook Search</h1>
            </div>
        </header>
    )
}

export default Header;