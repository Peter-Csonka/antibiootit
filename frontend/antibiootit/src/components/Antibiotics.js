import React, {useEffect, useState} from "react";
import Form from "./Form";
import Treatment from "./Treatment";
import NoTreatment from "./NoTreatment";
import Recipe from "./Recipe";
import GetDiagnoses from "./GetDiagnoses";
import {GetInfoTexts, GetInfoText} from "./GetInfoTexts";
import GetRecommendedTreatment from "./GetRecommendedTreatment";
import LoadingIndicator from "./LoadingIndicator";
import PenicillinInfo from "./PenicillinInfo";

const STEP1 = "step1";
const STEP2 = "step2";
const STEP4 = "step4";
const CHECKPENISILLIN = "checkPenisillin";
const CHECKEBV = "checkEBV";
const CHECKMYKO = "checkMyko";
const BRONCHITIS = "infoBronchitis";
const OBSBRONCHITIS = "infoObsBronchitis";

export default function Antibiotics({handlePenicillinInfoVisibility}) {

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
    const [penicillinInfo, setPenicillinInfo] = useState(false);
    const [showPenicillinInfo, setShowPenicillinInfo] = useState(false);

    const [treatments, setTreatments] = useState(null);
    const [description, setDescription] = useState(null);
    const [targetedInfo, setTargetedInfo] = useState(null);
 
    const [instruction, setInstruction] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wantsMixture, setWantsMixture] = useState(false);
    const [canMixture, setCanMixture] = useState(false);

    async function fetchData() {
        const diagnosesList = await GetDiagnoses();
        setDiagnoses(diagnosesList);
    }

    useEffect(() => {
        const infoTextsList = GetInfoTexts();
        setInfoTexts(infoTextsList);
        setInstruction(GetInfoText(infoTextsList, STEP1));
        fetchData();
    }, []);

    const [activeRecipe, setActiveRecipe] = useState(null);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const receiveInput = (data) => {
        if (data.diagnosisID !== "") {
            setFormSubmitted(true);
            setInstruction(GetInfoText(infoTexts, STEP4));
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

    function changeInstruction(step, checkboxes) {
        if(step === STEP2) {
            let checkText;
            const instruction = GetInfoText(infoTexts, step).text;
            if (checkboxes.length > 0) {
                if (checkboxes[0].id === "EBV-001") {
                    checkText = GetInfoText(infoTexts, CHECKEBV).text;
                }
                if (checkboxes[0].id === "MYK-001") {
                    checkText = GetInfoText(infoTexts, CHECKMYKO).text;
                }
            } else {
                checkText = GetInfoText(infoTexts, CHECKPENISILLIN).text;
            }
            const resultText = `${instruction}\n${checkText}`;
            const result = {
                header: GetInfoText(infoTexts, step).header,
                text: (
                    <p style={{whiteSpace: 'pre-line'}}>
                        {resultText}
                    </p>
                )
            }
            setInstruction(result);
        } else {
            setInstruction(GetInfoText(infoTexts, step));
        }
    }
    
    useEffect(() => {   
        if (chosenDiagnosis !== null && diagnoses !== null) {
            setDiagnosisData(diagnoses.filter(infection => infection.name === chosenDiagnosis)[0]);
            if (chosenDiagnosis === 'Bronkiitti') {
                setNoAntibioticTreatment({id: 'J21.9', text: GetInfoText(infoTexts, BRONCHITIS).text})
                setFormSubmitted(true);
                setLoading(false)
            }
            else if (chosenDiagnosis === 'Obstruktiivinen bronkiitti') {
                setNoAntibioticTreatment({id: 'J20.9', text: GetInfoText(infoTexts, OBSBRONCHITIS).text})
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

    function handlePenicillinInfoClicked() {
        setShowPenicillinInfo(false);
    }

    const shouldShowPenicillinInfo = formSubmitted && penicillinAllergy === true;

    useEffect(() => {
        if (shouldShowPenicillinInfo) {
            setShowPenicillinInfo(true);
        } else {
            setShowPenicillinInfo(false);
        }
      }, [shouldShowPenicillinInfo]);
    

    handlePenicillinInfoVisibility(showPenicillinInfo);

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
                    penicillinInfo={penicillinInfo}
                    setPenicillinInfo={setPenicillinInfo}
                    concurrentEBV={concurrentEBV}
                    setConcurrentEBV={setConcurrentEBV}
                    concurrentMycoplasma={concurrentMycoplasma}
                    setConcurrentMycoplasma={setConcurrentMycoplasma}
                    canMixture={canMixture}
                    wantsMixture={wantsMixture}
                    setWantsMixture={setWantsMixture}
                />
                {showPenicillinInfo && (
                <PenicillinInfo handleClick={handlePenicillinInfoClicked}
                />
                )}
                {formSubmitted && !!noAntibioticTreatment && <NoTreatment/>}
                {formSubmitted && (treatments && diagnosisData.needsAntibiotics && isWeightOk)  && <Treatment 
                    loading={loading}
                    needsAntibiotics={diagnosisData.needsAntibiotics}
                    description={description}
                    targetedInfo={targetedInfo}
                    weight={chosenWeight}
                    treatments={treatments}
                    setActiveRecipe={setActiveRecipe}
                    penicillinAllergy={penicillinAllergy}
                    concurrentMycoplasma={concurrentMycoplasma}
                    choice={chosenDiagnosis}
                    setCanMixture={setCanMixture}
                    wantsMixture={wantsMixture}
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