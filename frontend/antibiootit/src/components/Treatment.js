import React, {useState} from "react"
import Choise from "./Choise"

export default function Treatment(props) {

    const [activeChoice, setActiveChoice] = useState(props.antibiotic[0])

    const style = {
        backgroundColor: "white"
    }

    function toggleChoise(name) {
        /**for(let i = 0; i < props.antibiotic.length; i++) {
            if(props.antibiotic[i].name === name) {
                Tähän resepti pitää ottaa esim props.antibiotic[i].dosageResult.value jne
                ja ne yhdistää tulokseks joka sitte laittaa tohon
                setActiveRecipe
                eli const recipe = `${juttuja}`
                Tää on vanha
                props.setActiveRecipe(props.antibiotic[i].recipe)
            }
        }*/
        for(let i = 0; i < props.antibiotic.length; i++ ) {
            if(props.antibiotic[i].antibiotic === name) {
                setActiveChoice(props.antibiotic[i]);
            }
        }
        console.log(activeChoice);
        console.log(name);

    }

    let AntibioticElements = props.antibiotic.map((antibiote, index) => 
        <Choise
            key={index}
            index={index}
            name={antibiote.antibiotic}
            dosage={`${antibiote.dosageFormula.strength.text}`}
            dose={`${antibiote.dosageResult.dose.value} ${antibiote.dosageResult.dose.unit}`}
            doseInDay={`${antibiote.dosageResult.dose.value * antibiote.instructions.dosesPerDay} ${antibiote.dosageResult.dose.unit}`}
            instruction={`${antibiote.instructions.dosesPerDay} krt/vrk, yht ${antibiote.instructions.days} vrk ajan`}
            toggleChoise={toggleChoise}
            choise={antibiote.antibiotic === activeChoice.antibiotic ? true : false}
            diagnose={props.diagnose}
            length={props.antibiotic.length}
        />
    )

    const [openCalculations, setOpenCalculations] = React.useState(false);
    
    function calculate() {
        setOpenCalculations(prevStatus => !prevStatus)
    }

    if(!props.antibiotic) {
        return <p>Haetaan hoitosuosituksia...</p>
    }

    return (
        <div className="treatment-container">
            <div className="treatment-header">
                {<div className="treatment-icon"></div>}
                <h2>{props.diagnosis==="Bronkiitti" ?
                `Ei antibioottisuositusta` :
                `Hoitosuositus ${props.format.toLowerCase()}na`}</h2>
            </div>
            <div className="treatment-choises">
                <div className="choise-container">
                    {props.diagnosis !== "Bronkiitti" ? AntibioticElements : 
                    <div className="choise" style={style}>
                        <div className="choise-inner">
                            <p>Bronkiitin hoitoon <strong>ei suositella antibioottia.</strong></p>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="treatment-extra">
                <button className="btn-calculate" onClick={calculate} disabled={props.diagnose==="Bronkiitti"}>
                    {openCalculations ?
                    <p><ion-icon name="eye-off-outline"></ion-icon> Piilota kaava</p> :
                    <p><ion-icon name="calculator-outline"></ion-icon> Laskukaava</p>}
                </button>
                {!openCalculations && <div className="test2-container">
                    {props.diagnose==="Välikorvatulehdus" &&
                    <div className="strepto-info">
                        <p><ion-icon name="help-circle-outline"></ion-icon></p>
                        <p>60% Välikorvatulehduksista paranee ilman antibioottia</p>
                    </div>}
                </div>}
            </div>
            {openCalculations && <div className="treatment-calculations">
                Laskukaavat tähän
            </div>}
        </div>
    )
}