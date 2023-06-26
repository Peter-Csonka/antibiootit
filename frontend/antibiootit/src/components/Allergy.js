import React, { useState, useRef, useEffect } from "react";
import getReferences from "./GetReferences";
import { useLocation } from "react-router-dom";
import antibioticinfotexts from "../data/antibioticinfotexts";


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

    async function fetchData() {
        const infoTextsList = await GetInfoTexts();
        setAntibioticInfoTexts(infoTextsList);
        console.log("fetchdata")
        /*const referencesList = await getReferences();
        setReferences(referencesList);*/
    }

    useEffect(() => {
        fetchData();
    }, []);

    const Penicillin = () => {
        if (!!antibioticInfoTexts) {
            return (
                <>  
                    <AntibioticInfoTexts antibioticInfoTexts={antibioticInfoTexts} />
                </>
            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }

    }

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