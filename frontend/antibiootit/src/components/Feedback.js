import React, { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

export default function Feedback() {

    const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);

    return (
        <div className="feedback-container">
            <div id={showLoadingIndicator ? "" : "hidden"}><LoadingIndicator loading="feedback" /></div>
            <iframe 
                title="feedback"
                className="feedback-form"
                src="https://docs.google.com/forms/d/e/1FAIpQLSdnDoQe0D4rqPg2T8SC1Ezm8-_Mp7PxNxVrd9be42y8RzAduA/viewform?embedded=true" 
                width="640" 
                height="1488"
                onLoad={() => setShowLoadingIndicator(false)}>
            </iframe>
        </div>
    )
}