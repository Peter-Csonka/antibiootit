export function logUserInputDataRecipe(diagnosis, weight, penicillin, ebv, mycoplasma, recipe) {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxbjtmnguQYFP4-7D-XkRKc8lUz7VKMekLErjlfrD7v0j8Gj8QIo0mINUULQl7bRf1Itg/exec";

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