import infotexts from "../data/infotexts";

function GetInfoTexts() {
    const infotextsList = infotexts.map(item => {
        return (item)
    })
    return infotextsList;
}

function GetInfoText(infotexts, id) {
    return infotexts.find(item => item.id === id);
}

export {GetInfoText, GetInfoTexts}