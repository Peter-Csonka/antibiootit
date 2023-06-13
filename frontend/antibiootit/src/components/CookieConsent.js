import React from "react";

export default function CookieConsent(props) {
    const value = "toPrivacy";
    return (
        <div className="cookie">
            <p>Tämä sivusto käyttää evästeitä Antibiootit.fi-sivuston kehittämiseen. <a href={`/tietoa?param=${value}`} onClick={props.onAccept}>Lisätietoja</a> evästeisiin liittyen ja kuinka estää evästeet.</p>
            <button className="cookie-accept-btn" onClick={props.onAccept}>Sulje</button>
        </div>
    )
}