import React, {useEffect, useState} from "react";
import Form from "./Form";
import Treatment from "./Treatment";
import NoTreatment from "./NoTreatment";
import Recipe from "./Recipe";
import GetDiagnoses from "./GetDiagnoses";
import GetInfoTexts from "./GetInfoTexts";
import GetRecommendedTreatment from "./GetRecommendedTreatment";
import LoadingIndicator from "./LoadingIndicator";

const STEP1 = 7;
const STEP2 = 8;
const STEP4 = 13;
const CHECKPENISILLIN = 10;
const CHECKEBV = 11;
const CHECKMYKO = 12;

export default function Antibiotics() {

    const [chosenDiagnosis, setChosenDiagnosis] = useState("");
    const [diagnosisData, setDiagnosisData] = useState("");
    const [chosenWeight, setChosenWeight] = useState(null);
    const [noAntibioticTreatment, setNoAntibioticTreatment] = useState(null);
    const [formData, setFormData] = useState(null);
    const [hasFormData, setHasFormData] = useState(false);
    const [isWeightOk, setIsWeightOk] = useState(false);
    
    const [diagnoses, setDiagnoses] = useState(null);
    const [infoTexts, setInfoTexts] = useState(null);

    const [penicillinAllergy, setPenicillinAllergy] = useState(false);
    const [concurrentEBV, setConcurrentEBV] = useState(false);
    const [concurrentMycoplasma, setConcurrentMycoplasma] = useState(false);

    const [treatments, setTreatments] = useState(null);
    const [description, setDescription] = useState(null);
    const [targetedInfo, setTargetedInfo] = useState(null);
 
    const [instruction, setInstruction] = useState([]);

    const [loading, setLoading] = useState(false);

    async function fetchData() {
        const diagnosesList = await GetDiagnoses();
        setDiagnoses(diagnosesList);
    }

    useEffect(() => {
        const infoTextsList = GetInfoTexts();
        setInfoTexts(infoTextsList);
        setInstruction(infoTextsList[STEP1]);
        fetchData();
    }, []);

    const [activeRecipe, setActiveRecipe] = useState(null);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const receiveInput = (data) => {
        if (data.diagnosisID !== "") {
            setFormSubmitted(true);
            setInstruction(infoTexts[STEP4]);
            setFormData(data);
        }
        else {
            setFormSubmitted(false);
            return;
        }

        const selected = diagnoses.filter(infection => infection.id === data.diagnosisID)[0];

        if (selected.needsAntibiotics) {
            setLoading(true);
            setHasFormData(true);
            GetRecommendedTreatment(data)
            .then(response => {
                setTreatments(response.treatments);
                setDescription(response.description);
                setTargetedInfo(response.targetedInfos);

                setLoading(false);
                // Also set the first active recipe 
                const dosageValue = response.treatments[0].dosageResult.dose.value;
                const dosageUnit = response.treatments[0].dosageResult.dose.unit;
                const instructionDays = response.treatments[0].instructions.days;
                const dosesPerDayText = response.treatments[0].instructions.recipeText;
                const recipe = `${dosageValue} ${dosageUnit} ${dosesPerDayText} ${instructionDays} vuorokauden ajan`;
                const antibiote = response.treatments[0].antibiotic;
                const strength = response.treatments[0].formula.strength.text;
                const dose = response.treatments[0].dosageResult.dose;
                const dosage = response.treatments[0].instructions;

                const treatment = {
                    text: recipe,
                    antibioteName: antibiote,
                    antibioteStrength: strength,
                    dose: dose,
                    dosage: dosage
                }
                setActiveRecipe(treatment);
            })
            .catch(error => {
                console.log(error)
                console.log("Tarkista lomakkeen arvot")
            });
                
        }
        else {
            console.log("No need for antibiotic treatment")
        }
    }

    function changeInstruction(index, checkboxes) {
        if(index === STEP2) {
            let checkText;
            const instruction = infoTexts[index].text;
            if (checkboxes.length > 0) {
                if (checkboxes[0].id === "EBV-001") {
                    checkText = infoTexts[CHECKEBV].text;
                }
                if (checkboxes[0].id === "MYK-001") {
                    checkText = infoTexts[CHECKMYKO].text;
                }
            } else {
                checkText = infoTexts[CHECKPENISILLIN].text;
            }
            const resultText = `${instruction}\n${checkText}`;
            const result = {
                header: infoTexts[index].header,
                text: (
                    <p style={{whiteSpace: 'pre-line'}}>
                        {resultText}
                    </p>
                )
            }
            setInstruction(result);
        } else {
            setInstruction(infoTexts[index]);
        }
    }
    
    useEffect(() => {   
        if (chosenDiagnosis !== null && diagnoses !== null) {
            setDiagnosisData(diagnoses.filter(infection => infection.name === chosenDiagnosis)[0]);
            if (chosenDiagnosis === 'Bronkiitti') {
                setNoAntibioticTreatment({id: 'J21.9', text: infoTexts[14].text})
                setFormSubmitted(true);
                setLoading(false)
            }
            else if (chosenDiagnosis === 'Obstruktiivinen bronkiitti') {
                setNoAntibioticTreatment({id: 'J20.9', text: infoTexts[15].text})
                setFormSubmitted(true);
                setLoading(false)
            }
            else {
                setNoAntibioticTreatment(null);
            }
        }
    }, [chosenDiagnosis, diagnoses, infoTexts])

    const antibioticsStyle = {
        opacity: loading ? "0.3" : "1"
    }
/**
 * {loading ?
            <LoadingIndicator 
                loading={"all"}
            /> : ''}
 */
    return (
        <>
            {loading ?
            <LoadingIndicator 
                loading={"all"}
            /> : ''}
            <div className="antibiotics" style={antibioticsStyle}>
                <section>
                    <h1>Lapsen antibioottilaskuri</h1>
                    <div className="antibiotic-instructions"
                        data-testid="instructions">
                        <h2 data-testid="instructions-header">{instruction.header}</h2>
                        <hr className="line"></hr>
                        <div>{instruction.text}</div>
                    </div>
                </section>
                <Form 
                    diagnoses={diagnoses}
                    handleSubmit={receiveInput} 
                    changeInstruction={changeInstruction} 
                    setChosenDiagnosis={setChosenDiagnosis}
                    setChosenWeight={setChosenWeight}
                    formSubmitted={formSubmitted} 
                    formData={formData}
                    hasFormData={hasFormData}
                    isWeightOk={isWeightOk}
                    setIsWeightOk={setIsWeightOk}
                    penicillinAllergy={penicillinAllergy}
                    setPenicillinAllergy={setPenicillinAllergy}
                    concurrentEBV={concurrentEBV}
                    setConcurrentEBV={setConcurrentEBV}
                    concurrentMycoplasma={concurrentMycoplasma}
                    setConcurrentMycoplasma={setConcurrentMycoplasma}
                />
                {formSubmitted && !!noAntibioticTreatment && <NoTreatment/>}
                {formSubmitted && (treatments && diagnosisData.needsAntibiotics && isWeightOk)  && <Treatment 
                    loading={loading}
                    needsAntibiotics={diagnosisData.needsAntibiotics}
                    description={description}
                    targetedInfo={targetedInfo}
                    weight={chosenWeight}
                    treatments={treatments}
                    setActiveRecipe={setActiveRecipe}
                    format={treatments[0].format}
                    penicillinAllergy={penicillinAllergy}
                    concurrentMycoplasma={concurrentMycoplasma}
                />}
                {formSubmitted && !!noAntibioticTreatment && <Recipe
                    loading={loading}
                    treatments={treatments} 
                    activeRecipe={activeRecipe} 
                    diagnosisData={diagnosisData}
                    noTreatment={noAntibioticTreatment}
                />}
                {formSubmitted && (treatments && diagnosisData.needsAntibiotics) && isWeightOk && <Recipe 
                    loading={loading}
                    treatments={treatments}
                    weight={chosenWeight} 
                    activeRecipe={activeRecipe} 
                    diagnosisData={diagnosisData}
                    penicillinAllergy={penicillinAllergy}
                    concurrentEBV={concurrentEBV}
                    concurrentMycoplasma={concurrentMycoplasma}
                    noTreatment={noAntibioticTreatment} />}
            </div>
        </>
    );
}