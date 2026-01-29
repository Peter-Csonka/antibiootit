import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'


export default function Allergy() {

    const [references, setReferences] = useState(null);
    const [antibioticInfoTexts, setAntibioticInfoTexts] = useState(null);
    const [content, setContent] = useState("penicillin");
    
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

        const openModal = (image) => {
            setSelectedImage(image);
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
          };

        const closeModal = () => {
            setIsModalOpen(false);
            document.body.style.overflow = 'auto';
          }; 

        if (!!antibioticInfoTexts && !!references) {
            return (
                <>  
                    <AntibioticInfoTexts antibioticInfoTexts={antibioticInfoTexts} />
                    <img className="penicillin-info-image" src="penicillinallergyimage.png" alt="Penisilliiniallergia riskiarvio" onClick={() => openModal('./penicillinallergyimage.png')}/>
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