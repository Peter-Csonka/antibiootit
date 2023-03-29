import React, {useEffect, useState} from "react";
import Form from "./Form";
import Treatment from "./Treatment";
import Recipe from "./Recipe";
import GetDiagnoses from "./GetDiagnoses";
import GetInfoTexts from "./GetInfoTexts";
import GetRecommendedTreatment from "./GetRecommendedTreatment";

const STEP1 = 4;
const STEP4 = 11;

export default function Antibiotics() {

    const [chosenDiagnosis, setChosenDiagnosis] = useState("");
    
    const [diagnoses, setDiagnoses] = useState(null);
    const [infoTexts, setInfoTexts] = useState(null);

    const [treatments, setTreatments] = useState(null);

    const [instruction, setInstruction] = useState([]);


    async function fetchData() {
        const diagnosesList = await GetDiagnoses();
        setDiagnoses(diagnosesList);

        const infoTextsList = await GetInfoTexts();
        setInfoTexts(infoTextsList);

        setInstruction(infoTextsList[STEP1]);
    }
    useEffect(() => {
        fetchData();
    }, []);

    console.log(infoTexts);

    
    // Tää pitää tehä sit ekaks niin että kokoaa sen reseptin treatments[0]:sta?
    // Ja sit päivittää uuteen Treatment.js:ssä ku käyttäjä klikkaa vaihtoehtojen
    // välillä
    const [activeRecipe, setActiveRecipe] = useState("");

    useEffect(() => {
        console.log("Active recipe toggled");
    }, [activeRecipe])

    const [formSubmitted, setFormSubmitted] = useState(false);

    const receiveInput = (data) => {
        if (data.diagnosis !== "") {
            setFormSubmitted(true);
            setInstruction(infoTexts[STEP4]);
        }

        // Case bronchitis not yet implemented
        if (data.diagnosisID !== 'J20.9' && data.diagnosisID !== 'J21.9') {
            GetRecommendedTreatment(data)
            .then(response => {
                setTreatments(response.treatments);
                console.log(treatments.length);
            })
            .catch(error => {
                console.log(error)
            });
            
        }
    }

    function changeInstruction(index) {
        setInstruction(infoTexts[index]);
    }
    console.log({chosenDiagnosis})

    if(!diagnoses || !infoTexts) {
        return <p className="loading-text">Loading...</p>
    }
    
    return (
        <div className="antibiotics">
            <section>
                <h1>Lapsen antibioottilaskuri</h1>
                <div className="antibiotic-instructions">
                    <h2>{instruction.id}</h2>
                    <hr className="line"></hr>
                    <p>{instruction.text}</p>
                </div>
            </section>
            <Form 
                diagnoses={diagnoses}
                handleSubmit={receiveInput} 
                changeInstruction={changeInstruction} 
                setChosenDiagnosis={setChosenDiagnosis}
                formSubmitted={formSubmitted} 
            />
            {formSubmitted && treatments && <Treatment 
                diagnosis={chosenDiagnosis}
                antibiotic={treatments}
                setActiveRecipe={setActiveRecipe}
                format={treatments[0].format}
            />}
            {formSubmitted && treatments && <Recipe 
                treatments={treatments} 
                activeRecipe={activeRecipe} 
                diagnosis={chosenDiagnosis} />}
        </div>
    );
}