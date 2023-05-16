import React, {useState} from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
   
    function toggleMenu() {
      setShowMobileMenu(!showMobileMenu);
      console.log("click")
      console.log(showMobileMenu)
    }
    return (
        <header className="header">
            
            <NavLink to="/" 
                className="header--title-link"
                onClick={() => window.location.href = "/"}>
                    <img src="./icons/Antibiootit.fi-logo.svg" className="logo" alt="logo" /></NavLink>
            <div className="header--links">
                <NavLink to="/" 
                    className={({ isActive }) => 
                        (isActive ? "active-class" : "not-active-class")}>
                    Laskuri
                </NavLink>
                <NavLink to="/tietoa" 
                    className={({ isActive }) => 
                        (isActive ? "active-class" : "not-active-class")}>
                    Tietoa sivustosta
                </NavLink>
                <NavLink to="/palaute" 
                    className={({ isActive }) => 
                        (isActive ? "active-class" : "not-active-class")}>
                    Palaute
                </NavLink>          
            </div>
            <div className="mobile-container">            
                    <button
                        className="mobile-menu-btn"
                        onClick={toggleMenu}>
                        <ion-icon  name="menu" size="large"></ion-icon>
                    </button>
                    <nav className="mobile-nav">
                    <div className={`mobile-nav-links ${showMobileMenu ? 'show-menu' : ''}`}>
                        <NavLink 
                            to="/"
                            className="nav-link"
                            onClick={() => setShowMobileMenu(false) }>
                            Laskuri
                        </NavLink>
                        <NavLink 
                            to="/tietoa"
                            className="nav-link"
                            onClick={() => setShowMobileMenu(false)}>
                            Tietoa sivustosta
                        </NavLink>
                        <NavLink 
                            to="/palaute"
                            className="nav-link"
                            onClick={() => setShowMobileMenu(false)}>
                            Palaute
                        </NavLink>
                    </div>
                </nav>    
            </div>
        </header>
    )
};