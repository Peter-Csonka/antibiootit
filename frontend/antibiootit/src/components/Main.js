import React from "react";
import Antibiotics from "./Antibiotics";
import Info from "./Info";
import Feedback from "./Feedback";

export default function Main(props) {
    let path = props.path;
    return (
        <>
            {path !== "/" && <div className="main-centered">
                {path === "/tietoa" && <Info />}
                {path === "/palaute" && <Feedback />}
            </div>}

            {path === "/" &&
            <main>    
                 <Antibiotics />
                 <aside>
                    <p className="aside-text_temp">HUOM! Antibiootit.fi-sivusto on kehitysvaiheessa. Sivuston toiminnallisuus on puutteellista, eikä sitä ole tarkoitettu vielä käytettäväksi.</p>
                    <p className="aside-text">Antibiootit.fi on terveydenhuollon ammattilaisten käyttöön suunniteltu antibioottilaskuri, joka laskee suositellun antibioottiannostuksen diagnoosin ja lapsen painon perusteella. Suositukset perustuvat Käypähoitosuosituksiin. </p>
                    <p className="aside-update">Päivitetty viimeksi: 6.2.2023</p>
                </aside>
            </main>}

        </>

    )
}