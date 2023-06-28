import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import antibioticinfotexts from "../data/antibioticinfotexts";
import antibioticinforeferences from "../data/antibioticinforeferences";
import Modal from 'react-modal';


export default function Allergy() {

    const [references, setReferences] = useState(null);
    const [antibioticInfoTexts, setAntibioticInfoTexts] = useState(null);
    const [content, setContent] = useState("penicillin");
    const [activeButton, setActiveButton] = useState("penicillin");
    const myRef = useRef(null);

    const location = useLocation();
    let from = location.state ? location.state : "";

    useEffect(() => {
        if (from === "penicillin-navlink") {
            setContent("penicillin");
            setActiveButton("penicillin")
        }
    }, [from])

    const handleRefClick = (event) => {
        event.preventDefault();
        myRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    function GetInfoTexts() {
        const infotextsList = antibioticinfotexts.map(item => {
            console.log("infotekstit1")
            return (item)
        })
        console.log("infotekstit2")
        return infotextsList;
    }

    async function getReferences() {
        const referencesList = antibioticinforeferences.map(item => {
            return (item)
        })
        return referencesList;
    }

    async function fetchData() {
        const infoTextsList = await GetInfoTexts();
        setAntibioticInfoTexts(infoTextsList);
        console.log("fetchdata")
        const referencesList = await getReferences();
        setReferences(referencesList);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const Penicillin = () => {
        const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 650);

        useEffect(() => {
            const handleResize = () => {
              setIsLargeScreen(window.innerWidth > 650);
            };
        
            window.addEventListener('resize', handleResize);
        
            return () => {
              window.removeEventListener('resize', handleResize);
            };
          }, []);

        if (!!antibioticInfoTexts && !!references) {
            return (
                <>  
                    <AntibioticInfoTexts antibioticInfoTexts={antibioticInfoTexts} />
                    {isLargeScreen ? (
                        <img className="penicillin-info-image" src="./penicillinallergyimage.png" alt="penicillin info image"/>
                    ) : (
                        <img className="penicillin-image-mobile" src="./penicillinimagemobile.png" alt="penicillin image mobile"/>
                    )}
                    {isLargeScreen ? (
                        <img className="penicillin-info-image2" src="./penicillinallergyimage2.PNG" alt="penicillin info image2"/>  
                    ) : (
                        <img className="penicillin-image-mobile2" src="./penicillinmobile2.png" alt="penicillin image mobile2"/>
                    )}
                    <References references={references}/>
                </>
            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }
    }

    const References = ({ references }) => (
        <>
        <h3 ref={myRef}>{references[1].header}</h3>
          {references.map((reference) => (
            <p key={reference.citation} className="info-references">
              <span>{reference.text}</span>
              <span>
                <a href={reference.citation} target="_blank" rel="noopener noreferrer">{reference.citation}</a>
                {reference.bonusText && <span>{reference.bonusText}</span>}
              </span>
            </p>
          ))}
        </>
      );

    const AntibioticInfoTexts = ({antibioticInfoTexts}) => {
        const {header, text} = antibioticInfoTexts[0];

        return (
          <>
            <h3>{header}</h3>
            <p className="info-paragraph">
                {text}
            </p>  
          </>
        );
    };
    

    return (
        <div className="text-container">
            <h2>Antibiootti-info</h2>
            <div className="penicillin-allergy">   
               {/*} <button
                    className={activeButton === "penicillin" ? 'info-active' : ''}
                    onClick={() => {
                        setContent("penicillin")
                        setActiveButton("penicillin")
                    }} >Penisilliiniallergia</button> */}
            </div>
            {content === "penicillin" && <Penicillin />}
        </div> 
    )
}