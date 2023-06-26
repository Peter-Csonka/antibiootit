import React from "react";
import { NavLink } from "react-router-dom";

export default function PenicillinInfo(props) {
    return (
        <div className="penicillin-info">
            <ion-icon className="alert-icon-big" src="./icons/alert-circle-outline.svg" alt="alert-icon"></ion-icon>
            <p><strong>Lasten penisilliiniallergia on erittäin harvinainen.</strong> Kaikista antibioottiallergiaepäilystä alle 5 % varmistuu allergiaksi. Vaikean penisilliiniallergian esiintyvyys on noin 0.0005 %. Diagnoosin varmistamiseksi tai turhan allergiamerkinnän poistamiseksi suositellaan tarkempia jatkotutkimuksia.</p>
            <div className="penicillin-info-btn">
                <NavLink to="/penisilliiniallergia" state="penicillin-navlink" target="_blank"> Lue lisää </NavLink>
            </div>
        </div>
    )
}