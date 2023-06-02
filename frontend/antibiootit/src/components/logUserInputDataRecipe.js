export function logUserInputDataRecipe(diagnosis, weight, penicillin, ebv, mycoplasma, recipe) {
    //const scriptUrl = "https://script.google.com/macros/s/AKfycbwNwrKT_uXxt0HOg9mWrap3oG26X50FTOQJ30_gJe-_pwro1fu8XfHalrvzVqINjkVXjQ/exec";
    /** TESTI URL MALLAN OMAAN SHEETSIIN */
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxhQRTbKfG3sPCmwfW4PMfieuYBBvmYuB2vW8N4x33OITIgopBHlsPNCMuALMqH1aM0/exec";

    var data = new FormData();
    data.append('diagnosis', diagnosis);
    data.append('weight', weight);
    data.append('penicillin', penicillin);
    data.append('ebv', ebv);
    data.append('mycoplasma', mycoplasma);
    data.append('recipe', recipe);

    fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: data
    })
    .catch(err => console.log(err))
}