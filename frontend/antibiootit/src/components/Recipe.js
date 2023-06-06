import React, { useState, useEffect } from "react";
import { logUserInputDataRecipe } from "./logUserInputDataRecipe";

export default function Recipe(props) {

    const treatments = props.treatments;
    const activeRecipe = props.activeRecipe;
    const diagnosisData = props.diagnosisData;
    const noTreatment = props.noTreatment;

    const [chosenAb, setChosenAb] = useState(null);
    const [dosageInstructions, setDosageInstructions] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const diagnosisCode = diagnosisData.id;



    const TIMEOUT_DURATION = 1000;


    if (noTreatment === null && !!treatments && !activeRecipe && !chosenAb) {
        setChosenAb(treatments[0].antibiotic);
    }

    useEffect(() => {
        const diagnosisForRecipe = new Map([
            ["J03.0", "Streptokokkinielutulehduksen hoitoon."],
            ["H66.0", "Äkillisen välikorvatulehduksen hoitoon."],
            ["J01.9", "Äkillisen sivuontelotulehduksen hoitoon."],
            ["J18.9", "Bakteeriperäisen keuhkokuumeen hoitoon."]
        ]);
        
        const recipeTextEnding = diagnosisForRecipe.get(diagnosisData.id);

        if (noTreatment === null) {
            setChosenAb(activeRecipe.antibioteName + " " + activeRecipe.antibioteStrength);
            if (activeRecipe.dosage.doseMultipliers.length === 1) {
                setDosageInstructions(`${activeRecipe.text}. ${recipeTextEnding}`)
            }
            else {
                
                const firstDayDose = activeRecipe.dosage.doseMultipliers[1].multiplier * activeRecipe.dose.value;
                const dosage = `Ensimmäisenä päivänä annetaan kerran ${firstDayDose} ${activeRecipe.dose.unit} ja tämän jälkeen ${activeRecipe.dose.value} ${activeRecipe.dose.unit} ${activeRecipe.dosage.recipeText}. Hoidon kokonaispituus on yhteensä ${activeRecipe.dosage.days} vuorokautta. ${recipeTextEnding}`
                setDosageInstructions(dosage)
            }
        }
        else {
            setChosenAb("");
            setDosageInstructions(noTreatment.text);
        }
    }, [activeRecipe, chosenAb, treatments, diagnosisData, noTreatment]);

    /**
     * Copies the dosage instructions to clipboard when user clicks the copy button.
     * Activates notification.
     */
    const copy = async () => {
        await navigator.clipboard.writeText(dosageInstructions);
        setShowNotification(true);
        let chosenRecipe = `Valinta: ${chosenAb}
Reseptiteksti: ${dosageInstructions}
ICD-10 koodi: ${diagnosisCode}`;
        
        logUserInputDataRecipe(
            diagnosisData.name, 
            props.weight, 
            props.penicillinAllergy, 
            props.concurrentEBV, 
            props.concurrentMycoplasma,
            chosenRecipe
        );
    }

    const [copyText, setCopyText] = useState("Kopioi resepti")
    const [hasMounted, setHasMounted] = useState(false);

    /**
     * Sets a timeout for notification when user copies the dosage instructions.
     */
    useEffect(() => {
        if(hasMounted) {
            const timeout = setTimeout(() => {
            setCopyText("Kopioi resepti")
            setShowNotification(false);
            }, TIMEOUT_DURATION);
            return () => {
                setCopyText("Resepti kopioitu")
                clearTimeout(timeout);
            };
        } else {
            setHasMounted(true);
        }
    }, [showNotification, hasMounted])

    const CopyButton = () => {
        return (
            <button
                style={styles}
                className="copy-button"
                onClick={copy} 
                disabled={dosageInstructions === ""}>
                <img className="copy--image" src="./copy.png" alt=""/>
                <span className="copy-text">{copyText}</span>
            </button>
        )
    }

    const styles = {
        fontStyle: copyText==="Resepti kopioitu" ? "italic" : "normal"
    }

    return (
        <div className="recipe-container">
            <div className="recipe-header">
                <div className="recipe-icon-container">
                    <img className="pen-icon" src="./icons/pen-icon.svg" alt="pen icon"/>
                </div>
                <div className="recipe-header-container">
                    <h3>Reseptin kirjoittaminen:</h3>
                    {props.loading ? <></> : <h4>{chosenAb}</h4>}
                </div>
            </div>
            <div className="recipe-text-container">
                <p className="recipe-text">{dosageInstructions}
                </p>
                <div className="recipe-container-bottom">
                    <span>ICD-10 koodi: <span className="bold">{diagnosisCode}</span></span>
                    <CopyButton />
                </div>
            </div>
        </div>
    );

    
};