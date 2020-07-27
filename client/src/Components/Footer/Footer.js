import React from 'react';
import bg from '../../Images/isometric-books-vector.jpg';
import './style.css';

function Footer() {
    return (
        <footer style={{ backgroundImage: "url(" + bg + ")" }}>
            <a href="https://www.wowpatterns.com/free-vector-art">SVG Background by Wow Patterns</a>
        </footer>
    )
}

export default Footer;