import React from "react"

export default function NoTreatment() {
    const style = {
        backgroundColor: "white"
    }
    
    return (
        <div className="treatment-container">
            <div className="treatment-header">
                <div className="no-treatment-icon-container">
                    <img className="no-antibiotic-icon" src="./icons/no-antibiotic-icon.svg" alt="no antibiotic icon"/>
                </div>
                <h2>Ei antibioottisuositusta</h2>
            </div>
            <div className="treatment-choises">
                <div className="choise-container">
                    <div className="choise" style={style}>
                        <div className="choise-inner">
                            <p>Tämän diagnoosin hoitoon <strong>ei suositella antibioottia.</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}