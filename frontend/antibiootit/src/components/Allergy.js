import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'


export default function Allergy() {

    const [references, setReferences] = useState(null);
    const [antibioticInfoTexts, setAntibioticInfoTexts] = useState(null);
    const [content, setContent] = useState("penicillin");
    const myRef = useRef(null);
    
    const location = useLocation();
    let from = location.state ? location.state : "";

    useEffect(() => {
        if (from === "penicillin-navlink") {
            setContent("penicillin");
        }
    }, [from])

    async function GetInfoTexts() {
        const response = await fetch('/markdowns/antibiootti-info/antibiootti-info.md');
        return await response.text();
    }

    async function getReferences() {
        const response = await fetch('/markdowns/antibiootti-info/viitteet.md');
        return await response.text();
    }

    useEffect(() => {
        async function fetchData() {
            setAntibioticInfoTexts(await GetInfoTexts());
            setReferences(await getReferences());
        }
    
        fetchData();
    }, []);


    const Penicillin = () => {

        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedImage, setSelectedImage] = useState('');
        const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 650);

        const openModal = (image) => {
            setSelectedImage(image);
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
          };

        const closeModal = () => {
            setIsModalOpen(false);
            document.body.style.overflow = 'auto';
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
                        <img className="penicillin-info-image" src="penicillinallergyimage.PNG" alt="Penisilliiniallergia riskiarvio" onClick={() => openModal('./penicillinallergyimage.PNG')}/>
                    ) : (
                        <img className="penicillin-image-mobile" src="penicillinimagemobile.png" alt="Penisilliiniallergia riskiarvio" onClick={() => openModal('./penicillinimagemobile.png')}/>
                    )}
                    <h3 className="risk-evaluation-header">2. Toimintaohjeet</h3>
                    {isLargeScreen ? (
                        <img className="penicillin-info-image2" src="penicillinallergyimage2.PNG" alt="Penisilliiniallergia toimintaohjeet" onClick={() => openModal('./penicillinallergyimage2.PNG')}/>  
                    ) : (
                        <img className="penicillin-image-mobile2" src="penicillinimagemobile2.png" alt="Penisilliiniallergia toimintaohjeet" onClick={() => openModal('./penicillinimagemobile2.png')}/>
                    )}

                    <Modal className="modal" isOpen={isModalOpen} onRequestClose={closeModal}>
                    <div className="modal-content">
                        <img src={selectedImage} alt="Avattu kuva" />
                        <button onClick={closeModal} className="modal-close-btn">Sulje</button>
                    </div>
                    </Modal>
                    <References references={references}/>
                </>
            )
        }
        else {
            return <p>Haetaan tietoja...</p>
        }
    }

    const References = ({ references }) => {
        const referencesRenderers = {
            p: (props) => <p className="info-references">{props.children}</p>
        }
        return (
        <>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={referencesRenderers}>{references}</ReactMarkdown>
        </>
      );
    };

    const AntibioticInfoTexts = ({antibioticInfoTexts}) => {
        const referencesRenderers = {
            p: (props) => <p className="info-paragraph">{props.children}</p>,
            h2: (props) => <h2 className="penicillin-txt-header">{props.children}</h2>
        }

        return (
          <>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={referencesRenderers}>{antibioticInfoTexts}</ReactMarkdown> 
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