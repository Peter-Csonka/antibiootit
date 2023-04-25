import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GetInfoTexts from "./GetInfoTexts";
import getReferences from "./GetReferences";

export default function Info() {

    const [content, setContent] = useState("background");
    const [activeButton, setActiveButton] = useState("background");
    const [infoTexts, setInfoTexts] = useState(null);
    const [references, setReferences] = useState(null);

    const location = useLocation();
    let from = location.state ? location.state : "";

    useEffect(() => {
        if (from === "footer-disclaimer") {
            setContent("disclaimer");
            setActiveButton("disclaimer")
        }
        else if (from === "footer-makers") {
            setContent("makers");
            setActiveButton("makers")
        }
    }, [from])

    async function fetchData() {
        const infoTextsList = await GetInfoTexts();
        setInfoTexts(infoTextsList);
        const referencesList = await getReferences();
        setReferences(referencesList);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const Background = () => {
        if (!!infoTexts && !!references) {
            const backgroundInfo = infoTexts[1].text;
            const paragraphs = backgroundInfo.split("\n\n");
            return (
                <>
                    <div>{paragraphs.map((paragraph, index) => (
                        <p className="info-paragraph" key={index}>{paragraph.split("\n").join("<br>")}</p>
                    ))}</div>
                    <ul className="info-references">{references.map((item) => (
                        <li key={item.id}>
                            [{item.id}] {item.text}
                        </li>
                    ))}</ul>
                </>
                
            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }
    
    }
    const Makers = () => {
        if (!!infoTexts) {
            const leaderInfo = infoTexts[3]
            const paragraphs1 = leaderInfo.text.split("\n\n");
            const medicalProfessionalsInfo = infoTexts[4];
            const paragraphs2 = medicalProfessionalsInfo.text.split("\n\n");
            const itProfessionalsInfo = infoTexts[5];
            const paragraphs3 = itProfessionalsInfo.text.split("\n\n");

            return (
                <>
                <h3>{leaderInfo.header}</h3>
                    <div>
                        {paragraphs1.map((paragraph, index) => (
                        <p className="info-paragraph" key={index}>{paragraph.split("\n").join("<br>")}</p>
                    ))}</div>

                <h3>{medicalProfessionalsInfo.header}</h3>
                    <div>
                        {paragraphs2.map((paragraph, index) => (
                        <p className="info-paragraph" key={index}>{paragraph.split("\n").join("<br>")}</p>
                    ))}</div>

                <h3>{itProfessionalsInfo.header}</h3>
                    <div>
                        {paragraphs3.map((paragraph, index) => (
                        <p className="info-it" key={index}>{paragraph.split("\n").join("<br>")}</p>
                    ))}</div>
                </>
                
            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }
    }

    const Disclaimer = () => {
        if (!!infoTexts) {
            const disclaimerInfo = infoTexts[2].text;
            const paragraphs = disclaimerInfo.split("\n\n");
            return (
                <>
                    <div>{paragraphs.map((paragraph, index) => (
                        <p className="info-paragraph" key={index}>{paragraph.split("\n").join("<br>")}</p>
                    ))}</div>
                </>
                
            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }
    
    }

    const Privacy = () => {
        if (!!infoTexts) {
            const privacyPolicy = infoTexts[18].text;
            return (
                <p>{privacyPolicy}</p> 
            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }
    }



    return (
        <div className="info-container">
            <h2>Tietoa sivustosta</h2>
            <div className="info-links">
                <button
                    className={activeButton === "background" ? 'info-active' : ''}
                    onClick={() => {
                        setContent("background")
                        setActiveButton("background")
                    }} >Tausta ja tavoitteet</button>
                <button
                    className={activeButton === "makers" ? 'info-active' : ''}
                    onClick={() => {
                        setContent("makers")
                        setActiveButton("makers")
                    }}
                    >Tekijät</button>
                <button
                    className={activeButton === "disclaimer" ? 'info-active' : ''}
                    onClick={() => {
                        setContent("disclaimer")
                        setActiveButton("disclaimer")
                    }}>Vastuuvapauslauseke</button>
                <button
                    className={activeButton === "privacy" ? 'info-active' : ''}
                    onClick={() => {
                        setContent("privacy")
                        setActiveButton("privacy")
                    }}>Tietosuojaseloste</button>
            </div>
            <hr className="info-line" />
            {content === "background" && <Background />}
            {content === "makers" && <Makers />}
            {content === "disclaimer" && <Disclaimer />}
            {content === "privacy" && <Privacy />}
        </div>
        
    )
}