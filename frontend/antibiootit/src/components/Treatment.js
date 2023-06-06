import React, {useEffect, useState} from "react"
import Choise from "./Choise"
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import OpacityIcon from '@mui/icons-material/Opacity';

export default function Treatment(props) {

    const [activeChoice, setActiveChoice] = useState(props.treatments[0]);
    const [activeVariables, setActiveVariables] = useState(giveValues());

    // This updates the variables when the diagnosis is changed
    useEffect(() => {
        if (props.treatments[0].format === 'mikstuura') {
            setActiveVariables({
                weight: `${props.weight}kg`,
                doseInDay: `${props.treatments[0].formula.dosage.value} ${props.treatments[0].formula.dosage.unit}`,
                dosesPerDay: `${props.treatments[0].instructions.dosesPerDay} krt/vrk`,
                strength: `${props.treatments[0].formula.strength.text}`,
                result: `${props.treatments[0].dosageResult.dose.value} ${props.treatments[0].dosageResult.dose.unit}`,
                accResult: `${props.treatments[0].dosageResult.accurateDose.value} ${props.treatments[0].dosageResult.accurateDose.unit}`,
                maxRes: props.treatments[0].dosageResult.accurateDose.value,
                realRes: props.treatments[0].dosageResult.maxAccurateDose.value,
                unit: props.treatments[0].dosageResult.accurateDose.unit
            });
        } else {
            setActiveVariables({
                weight: `${props.weight}kg`,
                dosesPerDay: `${props.treatments[0].instructions.dosesPerDay} krt/vrk`,
                strength: `${props.treatments[0].formula.strength.text}`,
                result: `${props.treatments[0].dosageResult.dose.value} ${props.treatments[0].dosageResult.dose.unit}`,
            });
        }
        
    }, [props.weight, props.treatments]);

    useEffect(() => {
        setActiveChoice(props.treatments[0]);
    }, [props.treatments])


    function giveValues() {
        if (props.treatments[0].format === 'mikstuura') {
            return ({
                weight: `${props.weight}kg`,
                doseInDay: `${props.treatments[0].formula.dosage.value} ${props.treatments[0].formula.dosage.unit}`,
                dosesPerDay: `${props.treatments[0].instructions.dosesPerDay} krt/vrk`,
                strength: `${props.treatments[0].formula.strength.text}`,
                result: `${props.treatments[0].dosageResult.dose.value} ${props.treatments[0].dosageResult.dose.unit}`,
                accResult: `${props.treatments[0].dosageResult.accurateDose.value} ${props.treatments[0].dosageResult.accurateDose.unit}`,
                maxRes: props.treatments[0].dosageResult.accurateDose.value,
                realRes: props.treatments[0].dosageResult.maxAccurateDose.value,
                unit: props.treatments[0].dosageResult.accurateDose.unit
            });
        } else {
            return ({
                weight: `${props.weight}kg`,
                dosesPerDay: `${props.treatments[0].instructions.dosesPerDay} krt/vrk`,
                strength: `${props.treatments[0].formula.strength.text}`,
                result: `${props.treatments[0].dosageResult.dose.value} ${props.treatments[0].dosageResult.dose.unit}`,
            });
        }
    }

    let dose;
    let doseInDay;
    if(activeChoice.instructions.doseMultipliers.length > 1) {
        const multiplier = activeChoice.instructions.doseMultipliers[1].multiplier;
        const multipliedDose = activeChoice.dosageResult.dose.value * multiplier;
        dose = `1. päivä ${multipliedDose} ${activeChoice.dosageResult.dose.unit}, sitten ${activeChoice.dosageResult.dose.value} ${activeChoice.dosageResult.dose.unit}`;
        doseInDay = `1. päivä ${multipliedDose * activeChoice.instructions.dosesPerDay} ${activeChoice.dosageResult.dose.unit}, sitten ${activeChoice.dosageResult.dose.value * activeChoice.instructions.dosesPerDay} ${activeChoice.dosageResult.dose.unit}`;
        if(props.format === 'tabletti') {
            formatTablet(multipliedDose, dose);
            formatTablet(multipliedDose * activeChoice.instructions.dosesPerDay, doseInDay);
        }
    } else {
        dose = `${activeChoice.dosageResult.dose.value} ${activeChoice.dosageResult.dose.unit}`;
        doseInDay = `${activeChoice.dosageResult.dose.value * activeChoice.instructions.dosesPerDay} ${activeChoice.dosageResult.dose.unit}`;
        if(props.format === 'tabletti') {
            formatTablet(activeChoice.dosageResult.dose.value, dose);
            formatTablet(activeChoice.dosageResult.dose.value * activeChoice.instructions.dosesPerDay, doseInDay);
        }
    }

    function formatTablet(doseValue, doseStr) {
        if(doseValue > 1) {
            if(doseStr === dose) {
                dose = `${doseStr}a`;
            } else if (doseStr === doseInDay) {
                doseInDay = `${doseStr}a`;
            }
        }
    }

    function toggleChoise(name) {
        for(let i = 0; i < props.treatments.length; i++ ) {
            if(props.treatments[i].antibiotic === name) {
                setActiveChoice(props.treatments[i]);

                // Updates the variables when the second choice is clicked
                if (props.treatments[i].format === 'mikstuura') {
                    setActiveVariables({
                        weight: `${props.weight}kg`,
                        doseInDay: `${props.treatments[i].formula.dosage.value} ${props.treatments[i].formula.dosage.unit}`,
                        dosesPerDay: `${props.treatments[i].instructions.dosesPerDay} krt/vrk`,
                        strength: `${props.treatments[i].formula.strength.text}`,
                        result: `${props.treatments[i].dosageResult.dose.value} ${props.treatments[i].dosageResult.dose.unit}`,
                        accResult: `${props.treatments[i].dosageResult.accurateDose.value} ${props.treatments[i].dosageResult.accurateDose.unit}`,
                        maxRes: props.treatments[i].dosageResult.accurateDose.value,
                        realRes: props.treatments[i].dosageResult.maxAccurateDose.value,
                        unit: props.treatments[0].dosageResult.accurateDose.unit
                    });
                } else {
                    setActiveVariables({
                        weight: `${props.weight}kg`,
                        dosesPerDay: `${props.treatments[i].instructions.dosesPerDay} krt/vrk`,
                        strength: `${props.treatments[i].formula.strength.text}`,
                        result: `${props.treatments[i].dosageResult.dose.value} ${props.treatments[i].dosageResult.dose.unit}`,
                    });
                }

                const dosageValue = props.treatments[i].dosageResult.dose.value;
                const dosageUnit = props.treatments[i].dosageResult.dose.unit;
                const instructionDosesPerDay = props.treatments[i].instructions.recipeText;
                const instructionDays = props.treatments[i].instructions.days;
                const recipe = `${dosageValue} ${dosageUnit} ${instructionDosesPerDay} ${instructionDays} vuorokauden ajan`;
                const antibiote = props.treatments[i].antibiotic;
                const strength = props.treatments[i].formula.strength.text;

                const treatment = {
                    text: recipe,
                    antibioteName: antibiote,
                    antibioteStrength: strength,
                    dose: props.treatments[i].dosageResult.dose,
                    dosage: props.treatments[i].instructions
                }

                props.setActiveRecipe(treatment);
            }
        }
    }

    let AntibioticElements = props.treatments.map((antibiote, index) => 
        <Choise
            key={index}
            index={index}
            name={antibiote.antibiotic}
            dosage={`${antibiote.formula.strength.text}`}
            dose={dose}
            doseInDay={doseInDay}
            instruction={`${antibiote.instructions.dosesPerDay} krt/vrk, yht ${antibiote.instructions.days} vrk ajan`}
            toggleChoise={toggleChoise}
            choise={antibiote.antibiotic === activeChoice.antibiotic ? true : false}
            diagnose={props.diagnose}
            length={props.treatments.length}
        />
    )

    const [openCalculations, setOpenCalculations] = React.useState(false);

    function calculate() {
        setOpenCalculations(prevStatus => !prevStatus)
    }
    
    let greater = false;
    if(props.format === "mikstuura") {
        let maxRes = activeVariables.maxRes;
        let realRes = activeVariables.realRes;
        if(realRes > maxRes) {
            greater = true;
        } else {
            greater = false;
        }
    }

    function MathFormula(mathprops) {
        return (
            <div className="calculations-container">
                <InlineMath math={`\\frac{\\frac{${mathprops.weight} \\cdot 
                ${mathprops.doseInDay}}{${mathprops.dosesPerDay}}}{${mathprops.strength}}
                =${greater ? '\\text{\\color{red}' + mathprops.realRes + mathprops.unit + '}' : mathprops.accResult} \\approx ${mathprops.result}`}/>
            </div>
        )
    }

    let targetedInfo;
    if (props.targetedInfo.length > 0) {
        if (props.penicillinAllergy && props.concurrentMycoplasma) {
            targetedInfo = props.targetedInfo[0].text + "\n" + props.targetedInfo[1].text;
        } else if (props.penicillinAllergy) {
            targetedInfo = props.targetedInfo[0].text;
        } else if (props.concurrentMycoplasma) {
            targetedInfo = props.targetedInfo[1].text;
        } else {
            targetedInfo = "";
        }
    }

    return (
        <div className="treatment-container">
            <div className="treatment-header">
                <div className="treatment-icon-container">
                    {props.format === 'mikstuura' ? 
                    <div className="treatment-icon">
                        <OpacityIcon/>
                    </div> : 
                    <img className="pill-icon" src="./icons/pill-icon.svg" alt="pill icon"/>}
                </div>
                <h2>{!props.needsAntibiotics ?
                `Ei antibioottisuositusta` :
                `Hoitosuositus ${props.format.toLowerCase()}na`}</h2>
            </div>
            <div className="treatment-choises">
                <div className="choise-container">
                    {AntibioticElements}
                </div>
            </div>
            <div className="treatment-extra">
                <button className="btn-calculate" onClick={calculate} 
                    disabled={!props.needsAntibiotics || props.format === 'tabletti'}>
                    {openCalculations ?
                    <div className="btn-elements">
                        <img className="func-icon-closed" src="./icons/function-icon-closed.svg" alt="icon-closed"/>
                        <p> Piilota kaava</p> 
                    </div> :
                    <div className="btn-elements">
                        {(!props.needsAntibiotics || props.format === 'tabletti') ?
                            <img className="func-icon-open" src="./icons/function-icon-open-disabled.svg" alt="icon-open-disabled"/> :
                            <img className="func-icon-open" src="./icons/function-icon-open.svg" alt="icon-open"/>}
                        <p> Laskukaava</p>
                    </div>}
                </button>
                {!openCalculations && <div className="description-container">
                    {(props.description !== "" || targetedInfo !== "") && !props.loading &&
                    <div className="strepto-info">
                        <p className="help-circle"><ion-icon name="help-circle-outline"></ion-icon></p>
                        {props.description !== "" ? <p className="info-description">{props.description}</p> :
                        <p className="info-description">{targetedInfo}</p>}
                    </div>}
                </div>}
                {openCalculations && greater && <div className="max-dosage-container">
                    <p className="max-dosage-text">Vuorokauden maksimiannos ylittyy {"("}{activeVariables.realRes}ml {">"} {activeVariables.maxRes}ml{")"}, joten tarjotaan maksimiannosta</p>
                </div>}
            </div>
            {openCalculations && props.needsAntibiotics && props.format === 'mikstuura' && <div className="treatment-calculations" data-testid="calculations">
                <MathFormula
                    weight={activeVariables.weight}
                    doseInDay={activeVariables.doseInDay}
                    dosesPerDay={activeVariables.dosesPerDay}
                    strength={activeVariables.strength}
                    result={activeVariables.result}
                    accResult={activeVariables.accResult}
                    realRes={activeVariables.realRes}
                    unit={activeVariables.unit}
                />
            </div>}
        </div>
    )
}