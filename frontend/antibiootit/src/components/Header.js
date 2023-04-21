import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
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
        </header>
    )
};