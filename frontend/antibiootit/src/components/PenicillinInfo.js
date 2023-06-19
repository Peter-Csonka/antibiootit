import React from "react";
import { NavLink } from "react-router-dom";

export default function PenicillinInfo(props) {
    return (
        <div className="penicillin-info">
            <p><strong>Lasten penisilliiniallergia on erittäin harvinainen.</strong> Kaikista antibioottiallergiaepäilystä alle 5 % varmistuu allergiaksi. Vaikean penisilliiniallergian esiintyvyys on noin 0.0005 %. Diagnoosin varmistamiseksi tai turhan allergiamerkinnän poistamiseksi suositellaan tarkempia jatkotutkimuksia.</p>
            {/* <button className="penicillin-info-btn" onClick={props.onAccept}>Lue lisää</button> */}
        </div>
    )
}