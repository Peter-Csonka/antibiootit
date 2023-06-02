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
                    <p className="aside-update">Versio 1.0 julkaistu 2.6.2023</p>
                    <p className="aside-version-update">Viimeisin päivitys 2.6.2023</p>
                </aside>
            </main>}

        </>

    )
}