import React, {useState} from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   
    function toggleMenu() {
        if (showMobileMenu) {
            setShowMobileMenu(false);
            setIsMenuOpen(false);
        } else {
            setShowMobileMenu(!showMobileMenu);
            setIsMenuOpen(!isMenuOpen);
            console.log("click")
            console.log(showMobileMenu)
        }
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
                        (isActive ? "active-class" : "not-active-class")} data-testid="calculator-link">
                    Laskuri
                </NavLink>
                <NavLink to="/penisilliiniallergia" 
                    className={({ isActive }) => 
                        (isActive ? "active-class" : "not-active-class")} data-testid="allergy-link">
                    Antibiootti-info
                </NavLink>
                <NavLink to="/tietoa" 
                    className={({ isActive }) => 
                        (isActive ? "active-class" : "not-active-class")} data-testid="info-link">
                    Tietoa sivustosta
                </NavLink>
                <NavLink to="/palaute" 
                    className={({ isActive }) => 
                        (isActive ? "active-class" : "not-active-class")} data-testid="feedback-link">
                    Palaute
                </NavLink>          
            </div>
            <div className="mobile-container">            
                    <button
                        className="mobile-menu-btn"
                        onClick={toggleMenu}>
                            {isMenuOpen ? (
                            <ion-icon name="close-outline" size="large"></ion-icon>
                             ) : (
                            <ion-icon name="menu" size="large"></ion-icon>
                            )}
                     </button>    
                    <nav className="mobile-nav">
                    <div className={`mobile-nav-links ${showMobileMenu ? 'show-menu' : ''}`}>
                        <NavLink 
                            to="/"
                            className="nav-link"
                            onClick={() =>  {
                                setShowMobileMenu(false);
                                setIsMenuOpen(false);
                            }}>
                            Laskuri
                        </NavLink>
                        <NavLink
                            to="/penisilliiniallergia"
                            className="nav-link"
                            onClick={() =>  {
                                setShowMobileMenu(false);
                                setIsMenuOpen(false);
                            }}>
                            Antibiootti-info
                        </NavLink>    
                        <NavLink 
                            to="/tietoa"
                            className="nav-link"
                            onClick={() =>  {
                                setShowMobileMenu(false);
                                setIsMenuOpen(false);
                            }}>
                            Tietoa sivustosta
                        </NavLink>
                        <NavLink 
                            to="/palaute"
                            className="nav-link"
                            onClick={() =>  {
                                setShowMobileMenu(false);
                                setIsMenuOpen(false);
                            }}>
                            Palaute
                        </NavLink>
                    </div>
                </nav>    
            </div>
        </header>
    )
};