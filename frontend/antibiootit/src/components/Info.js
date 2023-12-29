import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'


async function getFunding() {
    const response = await fetch('/markdowns/tietoa-sivustosta/rahoitus.md');
    return await response.text();
}

async function getPrivacy() {
    const response = await fetch('/markdowns/tietoa-sivustosta/tietosuojaseloste.md');
    return await response.text();
}

async function getDisclaimer() {
    const response = await fetch('/markdowns/tietoa-sivustosta/vastuuvapautuslauseke.md');
    return await response.text();
}

async function getCreators() {
    const response = await fetch('/markdowns/tietoa-sivustosta/tekijät.md');
    return await response.text();
}

async function getBackgroundInfo() {
    const response = await fetch('/markdowns/tietoa-sivustosta/tausta-ja-tavoitteet/tausta-ja-tavoitteet.md');
    return await response.text();
}

async function getReferences() {
    const response = await fetch('/markdowns/tietoa-sivustosta/tausta-ja-tavoitteet/viitteet.md');
    return await response.text();
}



export default function Info() {

    const [content, setContent] = useState("background");
    const [activeButton, setActiveButton] = useState("background");
    const [funding, setFunding] = useState(null);
    const [privacy, setPrivacy] = useState(null);
    const [disclaimer, setDisclaimer] = useState(null);
    const [creators, setCreators] = useState(null);
    const [backgroundInfo, setBackgroundInfo] = useState(null);
    const [references, setReferences] = useState(null);

    const location = useLocation();
    let from = location.state ? location.state : "";

    //if the page needs to go to a certain sub page
    // now there is only need to go to privacy page but in the future 
    // checks can be made to the param value and act accordingly
    const searchParams = new URLSearchParams(location.search); 
    const paramValue = searchParams.get('param');

    // Check if the param1Value exists before using it
    useEffect(() => {
        if (paramValue) {
            setContent("privacy")
            setActiveButton("privacy")
        }
    }, [paramValue]);

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
        setFunding(await getFunding());
        setPrivacy(await getPrivacy());
        setDisclaimer(await getDisclaimer());
        setCreators(await getCreators());
        setBackgroundInfo(await getBackgroundInfo());
        setReferences(await getReferences());
    }
    useEffect(() => {
        fetchData();
    }, []);


    const InfoTexts = ({ infoTexts }) => {
      
        const renderers = {
            p: (props) => <p className="info-paragraph">{props.children}</p>
        }
        return (
          <>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>{infoTexts}</ReactMarkdown>
          </>
        );
      };

    const References = ({ references }) => {
        const renderers = {
            p: (props) => <p className="info-references">{props.children}</p>
        }
        return (
          <>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>{references}</ReactMarkdown>
          </>
        );
    };

    const Background = () => {
        if (!!backgroundInfo && !!references) {

            return (
                <>
                    <InfoTexts infoTexts={backgroundInfo}/>
                    <References references={references}/>
                </>

            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }

    }
    const Creators = () => {
        if (!!creators) {
            const renderers = {
                p: (props) => <p className="info-paragraph">{props.children}</p>
            }
            return (
                <>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>{creators}</ReactMarkdown>
                </>

            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }
    }

    const Disclaimer = () => {
        if (!!disclaimer) {
            const renderers = {
                p: (props) => <p className="info-paragraph">{props.children}</p>
            }
            return (
                <>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>{disclaimer}</ReactMarkdown>
                </>

            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }

    }

    const Privacy = () => {
        if (!!privacy) {
            return (
                <>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{privacy}</ReactMarkdown>
                </>
            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }
    }

    const Funding = () => {
        if (!!funding) {
            const renderers = {
                li: (props) => <li style={{marginLeft : '20px', marginTop : '5px'}}>{props.children}</li>,
                p: (props) => <p className="info-paragraph">{props.children}</p>
            }
            return (
                <>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>{funding}</ReactMarkdown>
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
            {content === "makers" && <Creators />}
            {content === "disclaimer" && <Disclaimer />}
            {content === "privacy" && <Privacy />}
            {content === "funding" && <Funding />}
        </div>

    )
}