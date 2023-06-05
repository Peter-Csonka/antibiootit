export function logUserInputData(diagnosis, weight, penicillin, ebv, mycoplasma) {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwNwrKT_uXxt0HOg9mWrap3oG26X50FTOQJ30_gJe-_pwro1fu8XfHalrvzVqINjkVXjQ/exec";

    var data = new FormData();
    data.append('diagnosis', diagnosis);
    data.append('weight', weight);
    data.append('penicillin', penicillin);
    data.append('ebv', ebv);
    data.append('mycoplasma', mycoplasma);

    fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: data
    })
    .catch(err => console.log(err))
}