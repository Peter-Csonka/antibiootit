import React from "react";
import { NavLink } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="page-not-found" data-testid="page-not-found">
            <h2>Sivua ei löydy</h2>
            <NavLink 
                to="/" 
                className="page-not-found-btn">
                    Takaisin etusivulle
            </NavLink>
        </div>
    )
}