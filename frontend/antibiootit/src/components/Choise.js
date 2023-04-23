import React from "react";

export default function Choise(props) {
    
        const styles = {
            backgroundColor: props.choise ? "white" : (props.index === 0 ? "#D7E2F2" : "#CACACA"),
            cursor: props.choise ? "auto" : "pointer"
          };

    const choiseNbr = props.index === 0 ? "Ensisijainen" : "Toissijainen"

    const ChoiseTxt = () => {
        const txt =
        <>
            {props.length > 1 && <div className="choise-header">
                <h4>{`${choiseNbr} valinta: ${props.name} ${props.dosage}`}</h4>
                {!props.choise && <ion-icon name="chevron-down-outline" size="large"></ion-icon>}
            </div>}
            {props.length === 1 && <div className="choise-header">
                <h4>{props.name} {props.dosage}</h4>
            </div>}
            {props.choise && <div className="choise-inner">
                <p>Kerta-annos: {props.dose}</p>
                <p>Vuorokausiannos: {props.doseInDay}</p>
                <p>Annostelu: {props.instruction}</p>
            </div>}
        </>
        
        return txt;
    }

    return (
        <div className="choise" data-testid="choise-element" style={styles} onClick={() => props.toggleChoise(props.name)}>
            <ChoiseTxt />
            {console.log(props.choise)}
        </div>
    );
}