import React, { useEffect, useState } from "react";
import { logUserInputData } from "./logUserInputData";

const STEP2 = 8;
const STEP3 = 9;

export default function Form(props) {
    
    let fullInfo = null;
    let diagnosisNames = null;
    if (!!props.diagnoses) {
        fullInfo = props.diagnoses;
        diagnosisNames = fullInfo.map(diagnosisInfo => diagnosisInfo.name);
    }

    const [diagnosis, setDiagnosis] = useState("");
    const [needsAntibiotics, setNeedsAntibiotics] = useState(false);
    const [additionalCheckboxes, setAdditionalCheckboxes] = useState();

    useEffect(() =>{
        if (diagnosis) {
            const chosen = fullInfo.filter(infection => infection.name === diagnosis.name);
            setNeedsAntibiotics(chosen[0].needsAntibiotics);
            if (chosen[0].checkBoxes.length > 0) {
                setAdditionalCheckboxes(chosen[0].checkBoxes)
            }
        }
    }, [diagnosis, fullInfo])

    const Choose = () => {
        return (
            <span className="diagnosis-menu-choose">
                Valitse diagnoosi
             </span>
        )
    }

    const ShowDiagnosisName = () => {
        const name = diagnosis.name;
        return (
            <span 
                className="diagnosis-menu-name"
                >
                {name}
            </span>
        )
    }

    const DiagnosisMenu = () => {
        if (!diagnosisNames) {
            return (
                <div 
                    className="diagnosis-menu dropdown" >
                    <button 
                        className="dropdown-btn"
                        data-testid="diagnosis-menu-btn"
                        onClick={handleMenuClick}>{diagnosis ? <ShowDiagnosisName  /> : <Choose />}
                        <ion-icon name="chevron-down-outline" size="large"></ion-icon>
                    </button>
                    <div className="dropdown-content">
                        <ul className="menu--items" data-testid="diagnosis-menu">
                            <li 
                                key="1" 
                                onClick={handleMenuSelection}>
                                Ladataan diagnooseja...
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div 
                    className="diagnosis-menu dropdown" >
                    <button 
                        className="dropdown-btn"
                        data-testid="diagnosis-menu-btn"
                        onClick={handleMenuClick}>{diagnosis ? <ShowDiagnosisName  /> : <Choose />}
                        <ion-icon name="chevron-down-outline" size="large"></ion-icon>
                    </button>
                    <div className="dropdown-content">
                        <ul className="menu--items" data-testid="diagnosis-menu">
                            {diagnosisNames
                                .filter((item) => item !== diagnosis.name)
                                .map((item) => (
                                <li 
                                    key={item} 
                                    onClick={handleMenuSelection}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    const handleMenuClick = (e) => {
        e.preventDefault();
    }

    const handleMenuSelection = (e) => {
        e.preventDefault();
        
        setFormatWeight(true);
        const selected = e.target.textContent;
        
        const selectedInfo = fullInfo.filter(d => d.name === selected)[0]
        setDiagnosis(selectedInfo);
        props.setChosenDiagnosis(selected);
        if(!props.formSubmitted || props.formData === null) {
            props.changeInstruction(STEP2);
        }
        else if (props.hasFormData && selectedInfo.id !== "J20.9" && selectedInfo.id !== "J21.9") {
            const checkBoxes = [
                {
                    id: 'EBV-001',
                    value: props.concurrentEBV
                },
                {
                    id: 'MYK-001',
                    value: props.concurrentMycoplasma
                  }
            ];
            const matchingCheckBoxes = checkBoxes.filter(cb => {
                return selectedInfo.checkBoxes.some(c => c.id === cb.id);
            });

            let newData = null;
            
            if (props.formData === null) {
                console.log("no data")
            }
            newData = {
                    ...props.formData,
                diagnosisID: selectedInfo.id,
                checkBoxes: matchingCheckBoxes
            }
            
            props.handleSubmit(newData);
        }

        if (selectedInfo.needsAntibiotics === true) {
            setNeedsAntibiotics(true);
        }
        if (selected !== "Streptokokki-tonsilliitti") {
            resetCheckboxes();
        }
        if (selected !== "Avohoitopneumonia") {
            resetCheckboxes();
        }        
    }

    const resetCheckboxes = () => {
        props.setConcurrentEBV(false);
        props.setConcurrentMycoplasma(false);
        setAdditionalCheckboxes([]);
    }

    const [weight, setWeight] = useState("");
    const [formatWeight, setFormatWeight] = useState(true);
    const [inputErrorMessage1, setInputErrorMessage1] = useState("");
    const MIN_WEIGHT = 4;
    const MAX_WEIGHT = 100;
    const VALID_WEIGHT_INPUT =  /^\d*([.,])?\d*$/;
    const VALID_DECIMALS = /^\d*([.,]?\d{0,2})?$/;

    const handleInput = (e) => {
        e.preventDefault();
        const input = e.target.value;
        if (!VALID_WEIGHT_INPUT.test(input)) {
            setInputErrorMessage1("Syötä vain numeroita tai desimaalierotin , tai .");
            props.setIsWeightOk(false);
            setFormatWeight(false);
        }
        else if(!VALID_DECIMALS.test(input)) {
            // Placeholder
            // We want to do nothing. This is just so that the user cannot input more than
            // 2 decimals in the weight input field.
        }
        else {
            setWeight(input);
            if(!props.formSubmitted) {
                props.changeInstruction(STEP3);
            }

            const roundedWeight = Math.round(parseFloat(input.replace(",", ".")) * 100) / 100;
            const weightForCalculations = roundedWeight.toFixed(2).replace(",", ".");
            if (weightForCalculations >= MIN_WEIGHT && weightForCalculations <= MAX_WEIGHT) {
                props.setIsWeightOk(true);
                setFormatWeight(true);
                if (props.hasFormData) {
                    const newData = {
                        ...props.formData,
                        weight: weightForCalculations
                    }
                    props.setChosenWeight(weightForCalculations)
                    props.handleSubmit(newData);
                }
            }
            else {
                setInputErrorMessage1(`Hyväksyttävä painoväli on ${MIN_WEIGHT}kg - ${MAX_WEIGHT}kg`);
                props.setIsWeightOk(false);
                if (input.length >= 1 && props.formSubmitted) {
                    setFormatWeight(false);
                }
                
            }
        }
    }

    /*const [penicillinAllergy, setPenicillinAllergy] = useState(false);
    const [concurrentEBV, setConcurrentEBV] = useState(false);
    const [concurrentMycoplasma, setConcurrentMycoplasma] = useState(false);*/

    const SubmitButton = () => {
        return (
            <button 
                className="form--button" 
                type="submit"
                disabled={!formatWeight || !needsAntibiotics}>
                Laske suositus
            </button>
        )
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (props.isWeightOk) {
            const checkBoxes = [
                {
                    id: 'EBV-001',
                    value: props.concurrentEBV
                },
                {
                    id: 'MYK-001',
                    value: props.concurrentMycoplasma
                  }
            ];
            const matchingCheckBoxes = checkBoxes.filter(cb => {
                return diagnosis.checkBoxes.some(c => c.id === cb.id);
            });

            const roundedWeight = Math.round(parseFloat(weight.replace(",", ".")) * 100) / 100;
            const formattedWeight = roundedWeight.toFixed(2).replace(".", ",");
            
            const weightForCalculations = roundedWeight.toFixed(2).replace(",", ".");
            if (weightForCalculations >= MIN_WEIGHT && weightForCalculations <= MAX_WEIGHT) {
                props.setIsWeightOk(true);
                setWeight(formattedWeight);
                props.setChosenWeight(formattedWeight);
                setFormatWeight(true);

                const data = { 
                                diagnosisID: diagnosis.id,
                                weight: weightForCalculations,
                                penicillinAllergic: props.penicillinAllergy,
                                checkBoxes: matchingCheckBoxes
                            }

                logUserInputData(
                    diagnosis.name, 
                    weight, 
                    props.penicillinAllergy, 
                    props.concurrentEBV, 
                    props.concurrentMycoplasma
                    );

                props.handleSubmit(data);

            }            
        }
        else if (diagnosis && !props.isWeightOk && needsAntibiotics) {
            setFormatWeight(false);
        }
    }

    let placeholder = "Syötä paino"
    
    const selectText = () => {
        const inputField = document.getElementById('weight-input');
        inputField.select();
    }
    /*const emptyPlaceholder = () => {
        placeholder = "";
    }*/
    const [selected, setSelected] = useState(false);
    const handleSelect = () => {
        if(weight) {
            if(selected) {
                setSelected(prevStatus => !prevStatus);
            } else {
                setSelected(prevStatus => !prevStatus);
                setTimeout(selectText, 0);
            }
        }
    }

    const handlePenicillinAllergy = () => {
        const newData = {
            ...props.formData,
            penicillinAllergic: !props.penicillinAllergy
        }
        if (props.hasFormData) {
            props.handleSubmit(newData);
        }
        props.setPenicillinAllergy(!props.penicillinAllergy)
    }

    const handleEBV = () => {
        if (props.hasFormData) {
            const checkBoxes = [
                {
                    id: 'EBV-001',
                    value: !props.concurrentEBV
                }
            ];
            const newData = {
                ...props.formData,
                checkBoxes: checkBoxes
            }
            props.handleSubmit(newData);
        }
        props.setConcurrentEBV(!props.concurrentEBV)
    }

    const handleMycoplasma = () => {
        if (props.hasFormData) {
            const checkBoxes = [
                {
                    id: 'MYK-001',
                    value: !props.concurrentMycoplasma
                }
            ];
            const newData = {
                ...props.formData,
                checkBoxes: checkBoxes
            }
            props.handleSubmit(newData);
        }
        props.setConcurrentMycoplasma(!props.concurrentMycoplasma)
    }

    return (
        <form 
            className="diagnosis-form" 
            autoComplete="off"
            onSubmit={handleClick}>
            <DiagnosisMenu />
            <div className="weight-input">
                    <input
                        id="weight-input"
                        data-testid="weight-input"
                        className={formatWeight ? "form--input" : "form--input-notok" }
                        placeholder={placeholder}
                        //onFocus={emptyPlaceholder}
                        onClick={handleSelect}
                        name="weight"   
                        value={weight}
                        onChange={handleInput}
                        type="text"
                        inputMode="numeric"
                        disabled={!needsAntibiotics || !diagnosis}
                        required={true}
                    /><span className={!needsAntibiotics || !diagnosis ? "kg-text-disabled" : "kg-text"}>
                            {(!needsAntibiotics || !diagnosis) ? 
                            <img className="weight-icon-disabled" src="./icons/weight-icon-disabled.svg" alt="weight icon disabled"/> : 
                            <img className="weight-icon" src="./icons/weight-icon.svg" alt="weight icon"/>}
                    </span>
                    {!formatWeight && <div className="error" id="inputErr">{inputErrorMessage1}</div>}
            </div>
            <div className="checkbox-container">
                {diagnosis &&
                    <label className="form--checkbox">
                        <input 
                            type="checkbox"
                            disabled={!needsAntibiotics}
                            onClick={handlePenicillinAllergy}
                        /> <span className={!needsAntibiotics ? "disabled" : "enabled"}>Penisilliiniallergia</span>
                    </label>} 
                {additionalCheckboxes && additionalCheckboxes.filter(obj => obj.id === 'EBV-001').length > 0 &&
                    <label className="form--checkbox">
                        <input 
                            type="checkbox"
                            onClick={handleEBV}
                        /> Samanaikainen EBV-infektio
                    </label>}
                {additionalCheckboxes && additionalCheckboxes.filter(obj => obj.id === 'MYK-001').length > 0 &&
                    <label className="form--checkbox">
                        <input 
                            type="checkbox"
                            onClick={handleMycoplasma}
                        /> Varmistettu mykoplasmainfektio
                    </label>}
            </div>
            {diagnosis && <SubmitButton />}
        </form>
    );}