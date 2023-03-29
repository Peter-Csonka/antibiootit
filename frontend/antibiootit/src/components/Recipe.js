import React, { useState, useEffect } from "react";

export default function Recipe(props) {

    const treatments = props.treatments;
    const activeRecipe = props.activeRecipe;

    console.log(activeRecipe)

    const [chosenAb, setChosenAb] = useState(null);
    const [dosageInstructions, setDosageInstructions] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const diagnosisCode = props.treatments[0].id;

    const TIMEOUT_DURATION = 1000;

    if (!activeRecipe && !chosenAb) {
        setChosenAb(treatments[0].antibiotic);
    }

    useEffect(() => {
        
        setChosenAb(activeRecipe.name);
        setDosageInstructions(activeRecipe.instruction);
        
        
        // NB! This hardcoding is temporary!
        if (props.diagnosis === "Bronkiitti") {
            setDosageInstructions("Ei antibioottihoitoa")
            setChosenAb("Ei antibioottisuositusta")
        }
    }, [activeRecipe, chosenAb, treatments, props.diagnosis]);


    /**
     * Copies the dosage instructions to clipboard when user clicks the copy button.
     * Activates notification.
     */
    const copy = async () => {
        await navigator.clipboard.writeText(dosageInstructions);
        setShowNotification(true);
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
                <img className="copy--image" src="./copy.png" alt=""/> {copyText}
            </button>
        )
    }

    const styles = {
        fontStyle: copyText==="Resepti kopioitu" ? "italic" : "normal"
    }

    return (
        <div className="recipe-container">
            <h3>Reseptin kirjoittaminen:</h3>
            <h4>{chosenAb}</h4>
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