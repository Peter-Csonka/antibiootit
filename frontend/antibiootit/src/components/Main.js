import React from "react";
import Antibiotics from "./Antibiotics";
import Info from "./Info";
import Feedback from "./Feedback";
import PageNotFound from "./PageNotFound";

export default function Main(props) {
    let path = props.path;
        return (
        <>
            {path !== "/" && <div className="main-centered">
                {path === "/tietoa" && <Info />}
                {path === "/palaute" && <Feedback />}
                {path === "not-found" && <PageNotFound />}
            </div>}

            {path === "/" &&
            <main>    
                 <Antibiotics />
                 <aside>
                    <p className="aside-text">Antibiootit.fi on terveydenhuollon ammattilaisten käyttöön suunniteltu antibioottilaskuri, joka laskee suositellun antibioottiannostuksen diagnoosin ja lapsen painon perusteella. Suositukset perustuvat Käypä hoito -suosituksiin. </p>
                    <p className="aside-update">Päivitetty viimeksi: 22.5.2023</p>
                </aside>
            </main>}

        </>

    )
}