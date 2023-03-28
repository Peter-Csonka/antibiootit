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


    /** State muuttuu ku valitaan tauti ja vastaavan taudin tiedot
     * tulee bäkistä? Nyt vaan kovakoodattu. Alle 40kg = mikstuura ja yli tabletti?
     * Bäkistä tulee json/ array mitä tulikaan, niin otetaan indexin mukaan
     * arvo objectiin onko toissijainen vai ensisijainen?
     * {index === 0 ? true : false} esimerkiksi, mutta vaikee tehdä esim vasta
     * propsina, ksoka aktiivisen vaihdossa käytän sitä tuolta? tota
     * "firstChoise"a pitää käyttää myös siihen mihin näytetään reseptinä.
    */

    const [antibiotic, setAntibiotic] = useState([
        {
            id: "J03.0",
            format: "Tabletti",
            name: "Amoksisilliini",
            dosage: "100 mg/ml",
            dose: "2 ml",
            doseInDay: "4 ml",
            instruction: "2 krt/vrk, yht 5 vrk ajan",
            recipe: "Ensimmäisen vaihtoehdon resepti",
            choise: true
        },
        {
            id: "J03.1",
            format: "Tabletti",
            name: "Kefaleksiini",
            dosage: "100 mg/ml",
            dose: "2 ml",
            doseInDay: "4 ml",
            instruction: "2 krt/vrk, yht 6 vrk ajan",
            recipe: "Toisen vaihtoehdon resepti",
            choise: false
        }
    ]);
    
    // Tää pitää tehä sit ekaks niin että kokoaa sen reseptin treatments[0]:sta?
    // Ja sit päivittää uuteen Treatment.js:ssä ku käyttäjä klikkaa vaihtoehtojen
    // välillä
    const [activeRecipe, setActiveRecipe] = useState("");

    const [formSubmitted, setFormSubmitted] = useState(false);

    const receiveInput = (data) => {
        if (data.diagnosis !== "") {
            setFormSubmitted(true);
            setInstruction(infoTexts[STEP4]);
        }

        // Case bronchitis not yet implemented
        if (data.diagnosisID !== 'J20.9') {
            GetRecommendedTreatment(data)
            .then(response => {
                setTreatments(response.treatments);
            })
            .catch(error => {
                console.log(error)
            });
            
        }
    }

    //console.log(treatments.length);
    console.log(treatments);

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
                activeRecipe={activeRecipe}
                setActiveRecipe={setActiveRecipe}
                format={treatments[0].format}
            />}
            {formSubmitted && <Recipe abChoices={antibiotic} activeRecipe={activeRecipe} diagnosis={chosenDiagnosis} />}
        </div>
    );
}