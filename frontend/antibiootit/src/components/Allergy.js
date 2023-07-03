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
            return (item)
        })
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
        const referencesList = await getReferences();
        setReferences(referencesList);
    }

    useEffect(() => {
        fetchData();
    }, []);


    const Penicillin = () => {

        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedImage, setSelectedImage] = useState('');
        const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 650);

        const openModal = (image) => {
            setSelectedImage(image);
            setIsModalOpen(true);
          };

        const closeModal = () => {
            setIsModalOpen(false);
          }; 

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
                    <h3 className="risk-evaluation-header">1. Riskin arvioiminen</h3>
                    {isLargeScreen ? (
                        <img className="penicillin-info-image" src="./penicillinallergyimage.png" alt="penicillin info image" onClick={() => openModal('./penicillinallergyimage.png')}/>
                    ) : (
                        <img className="penicillin-image-mobile" src="./penicillinimagemobile.png" alt="penicillin image mobile" onClick={() => openModal('./penicillinimagemobile.png')}/>
                    )}
                    <h3 className="risk-evaluation-header">2. Toimintaohjeet</h3>
                    {isLargeScreen ? (
                        <img className="penicillin-info-image2" src="./penicillinallergyimage2.png" alt="penicillin info image2" onClick={() => openModal('./penicillinallergyimage2.png')}/>  
                    ) : (
                        <img className="penicillin-image-mobile2" src="./penicillinimagemobile2.png" alt="penicillin image mobile2" onClick={() => openModal('./penicillinimagemobile2.png')}/>
                    )}

                    <Modal className="modal" isOpen={isModalOpen} onRequestClose={closeModal}>
                    <img src={selectedImage} alt="Avattu kuva" />
                    <button onClick={closeModal} className="modal-close-btn">Sulje</button></Modal>
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
        <h3 ref={myRef}>{references[0].header}</h3>
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
            <h3 className="penicillin-txt-header">{header}</h3>
            <p className="info-paragraph">
                {text}
            </p>  
          </>
        );
    };

    return (
        <div className="text-container">
            <div className="penicillin-allergy">   
               {/*This is for the future development if there is a need to create more subpages
               } <button
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