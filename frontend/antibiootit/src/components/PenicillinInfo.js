import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'


async function getPenicillinInfo() {
    const response = await fetch('/markdowns/penisilliini-info/penisilliini-info.md');
    return await response.text();
}

export default function PenicillinInfo({handleClick}) {

    const [penicillinInfo, setPenicillinInfo] = useState(null);

    async function fetchData() {
        setPenicillinInfo(await getPenicillinInfo());
    }
    useEffect(() => {
        fetchData();
    }, []);


    const PenicillinInfo = ({ penicillinInfo }) => {
        const renderers = {
        }
        if (!!penicillinInfo) {
            return (
                <>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>{penicillinInfo}</ReactMarkdown>
                </>
              );
        } else {
            return <p>Haetaan tietoja...</p>
        }
    };


    return (
        <div className="penicillin-info">
            <ion-icon className="alert-icon-big" src="./icons/alert-circle-outline.svg" alt="alert-icon"></ion-icon>
            <PenicillinInfo penicillinInfo={penicillinInfo}/>
            <div className="penicillin-info-btn">
                <NavLink to="/penisilliiniallergia" state="penicillin-navlink" target="_blank" onClick={handleClick}> Lue lisää </NavLink>
            </div>
        </div>
    )
}