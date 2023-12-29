import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export default function Aside() {

    const [updated, setUpdated] = useState(null);
    const [description, setDescription] = useState(null);

    async function GetDescription() {
        const response = await fetch('/markdowns/laskuri/kuvaus.md');
        return await response.text();
    }

    async function getUpdated() {
        const response = await fetch('/markdowns/laskuri/päivitetty-viimeksi.md');
        return await response.text();
    }

    useEffect(() => {
        async function fetchData() {
            setDescription(await GetDescription());
            setUpdated(await getUpdated());
        }
        fetchData();
    }, []);

    const Updated = ({ updated }) => {
        const renderers = {
            p: (props) => <p className="aside-version-update">{props.children}</p>
        }
        return (
        <>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>{updated}</ReactMarkdown>
        </>
      );
    };

    const Description = ({ description }) => {
        const renderers = {
            p: (props) => <p className="aside-text">{props.children}</p>
        }
        return (
        <>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>{description}</ReactMarkdown>
        </>
      );
    };

    if (!!updated && !!description) {
        return (
            <aside>
                <Description description={description}/>
                <Updated updated={updated}/>
            </aside>
        );
    } else {
        return <p>Haetaan tietoja...</p>
    }
}