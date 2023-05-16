import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GetInfoTexts from "./GetInfoTexts";
import getReferences from "./GetReferences";


export default function Info() {

    const [content, setContent] = useState("background");
    const [activeButton, setActiveButton] = useState("background");
    const [infoTexts, setInfoTexts] = useState(null);
    const [references, setReferences] = useState(null);
    const myRef = useRef(null);

    const handleRefClick = (event) => {
        event.preventDefault();
        myRef.current.scrollIntoView({ behavior: 'smooth' });
    };

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

      const InfoParagraph = ({ text, citation, onClick }) => (
        <>
          {text} <a href="scrollToReferences" onClick={onClick}>{citation}</a>
        </>
      );

    const InfoTexts = ({ infoTexts, handleRefClick }) => {
        const { header, text, citation, text2, citation2, text3, citation3, text4, citation4, text5, citation5, text6, citation6, text7, citation7, text8, citation8, text9, citation9, text10, citation10, infoHeader, info1, info2 } = infoTexts[1];
      
        return (
          <>
            <h3>{header}</h3>
            <p className="info-paragraph">
              <InfoParagraph text={text} citation={citation} onClick={handleRefClick} />
              <InfoParagraph text={text2} citation={citation2} onClick={handleRefClick} />
              <InfoParagraph text={text3} citation={citation3} onClick={handleRefClick} />
              <InfoParagraph text={text4} citation={citation4} onClick={handleRefClick} />
            </p>
            <p className="info-paragraph">
              <InfoParagraph text={text5} citation={citation5} onClick={handleRefClick} />
              <InfoParagraph text={text6} citation={citation6} onClick={handleRefClick} />
              <InfoParagraph text={text7} citation={citation7} onClick={handleRefClick} />
              <InfoParagraph text={text8} citation={citation8} onClick={handleRefClick} />
            </p>
            <p className="info-paragraph">
              <InfoParagraph text={text9} citation={citation9} onClick={handleRefClick} />
              <InfoParagraph text={text10} citation={citation10} onClick={handleRefClick} />
            </p>
            <h3>{infoHeader}</h3>
            <p className="info-paragraph">
              <span className="info-bolded-text">{info1}</span>
              <span>{info2}</span>
            </p>
          </>
        );
      };

    const References = ({ references }) => (
        <>
        <h3 ref={myRef}>{references[0].header}</h3>
          {references.map((reference) => (
            <p key={reference.citation} className="info-references">
              <span>{reference.text}</span>
              <span>
                <a href={reference.citation}>{reference.citation}</a>
                {reference.bonusText && <span>{reference.bonusText}</span>}
              </span>
            </p>
          ))}
        </>
      );

    const Background = () => {
        if (!!infoTexts && !!references) {

            return (
                <>
                    <InfoTexts infoTexts={infoTexts} handleRefClick={handleRefClick} />
                    <References references={references}/>
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

    const Funding = () => {
        if (!!infoTexts) {
            const fundingText = infoTexts[19].text;
            const add1 = infoTexts[19].addition1;
            const add2 = infoTexts[19].addition2;
            return (
                <>
                    <p>{fundingText}</p>
                    <br></br>
                    <ul>{add1}
                        <li style={{marginLeft : '20px', marginTop : '5px'}}><a href="https://www.hes-saatio.fi/">{add2}</a></li>
                    </ul>
                </>
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
                    }}>Tekijät</button>
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
                <button
                    className={activeButton === "funding" ? 'info-active' : ''}
                    onClick={() => {
                        setContent("funding")
                        setActiveButton("funding")
                    }}>Rahoitus</button>
            </div>
            <hr className="info-line" />
            {content === "background" && <Background />}
            {content === "makers" && <Makers />}
            {content === "disclaimer" && <Disclaimer />}
            {content === "privacy" && <Privacy />}
            {content === "funding" && <Funding />}
        </div>

    )
}