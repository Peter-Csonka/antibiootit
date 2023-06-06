import React from 'react';

export default function LoadingIndicator(props) {

    if(props.loading === "feedback") {
        return (
            <div className="loading-container">
                <div className="loading-animation-calculations"></div>
                <p>Haetaan palautelomaketta...</p>
            </div>
        )
    }

    if(props.loading === "all") {
        return (
            <div className="loading">
                <div className="loading-animation-calculations"></div>
                <p className="loading-text">Haetaan suosituksia...</p>
            </div>
        )
    }
}