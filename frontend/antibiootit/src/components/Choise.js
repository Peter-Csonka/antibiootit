import React from "react";

export default function Choise(props) {
    
    const styles = {
        backgroundColor: props.choise ? "white" : "#D7E2F2",
        cursor: props.choise ? "auto" : "pointer"
    };

    const choiseNbr = props.index === 0 ? "Ensisijainen" : "Toissijainen"

    const ChoiseTxt = () => {
        const txt = props.diagnose !== "Bronkiitti" ?
        <>
            {props.length > 1 && <div className="choise-header">
                <h4>{`${choiseNbr} valinta`}</h4>
                {!props.choise && <ion-icon name="chevron-down-outline" size="large"></ion-icon>}
            </div>}
            {props.choise && <div className="choise-inner">
                <p>Antibiootti: {props.name} {props.dosage}</p>
                <p>Kerta-annos: {props.dose}</p>
                <p>Vuorokausiannos: {props.doseInDay}</p>
                <p>Lääkkeenotto: {props.instruction}</p>
            </div>}
        </> :
        <div className="choise-inner">
            <p>Bronkiitin hoitoon <strong>ei suositella antibioottia.</strong></p>
        </div>
        
        return txt;
    }

    return (
        <div className="choise" style={styles} onClick={() => props.toggleChoise(props.name)}>
            <ChoiseTxt />
        </div>
    );
}