import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './style.css'

function Breadcrumb() {
    const location = useLocation();

    return (
        <nav>
            <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Find a book! </Link><span> / </span>
            <Link to="/mybooks" className={location.pathname === "/mybooks" ? "active-link" : ""}>View my books! </Link>
        </nav>
    )
}

export default Breadcrumb;