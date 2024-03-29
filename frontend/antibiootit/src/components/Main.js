import React from "react";
import Antibiotics from "./Antibiotics";
import Info from "./Info";
import Feedback from "./Feedback";
import PageNotFound from "./PageNotFound";
import Allergy from "./Allergy";
import Aside from "./Aside";

export default function Main({path, handlePenicillinInfoVisibility}) {
    
    return (
        <>
            {path !== "/" && <div className="main-centered">
                {path === "/tietoa" && <Info />}
                {path === "/penisilliiniallergia" && <Allergy />}
                {path === "/palaute" && <Feedback />}
                {path === "not-found" && <PageNotFound />}
            </div>}

            {path === "/" &&
            <main>
                <Antibiotics handlePenicillinInfoVisibility={handlePenicillinInfoVisibility}/>
                <Aside />
            </main>}

        </>

    )
}
