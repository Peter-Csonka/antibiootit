import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Choise from '../Choise';

let dose;
let doseInDay;

const treatments = [
    {
        antibiotic: 'Amoksisilliini jauhe',
        dosageResult: {dose: {unit: "ml", value: 4.5}, accurateDose: {unit: "ml", value: 4.4}},
        format: "mikstuura",
        formula: {strength: {unit: "mg/ml", value: 100, text: "100 mg/ml"}, dosage: {unit: "mg/kg/vrk", value: 40}},
        instructions: {days: 5, dosesPerDay: 2, recipeText: "kahdesti päivässä", doseMultipliers: [{ id: 0, multiplier: 1 }]}
    },
    {
        antibiotic: 'Amoksisilliini-klavulaanihappo jauhe',
        dosageResult: {dose: {unit: "ml", value: 5.5}, accurateDose: {unit: "ml", value: 5.5}},
        format: "mikstuura",
        formula: {strength: {unit: "mg/ml", value: 80, text: "80/11.4 mg/ml"}, dosage: {unit: "mg/kg/vrk", value: 40}},
        instructions: {days: 5, dosesPerDay: 2, recipeText: "kahdesti päivässä", doseMultipliers: [{ id: 0, multiplier: 1 }]}
    }];

let activeChoice = treatments[0];

function setActiveChoice(name) {
    for(let i = 0; i < treatments.length; i++ ) {
        if(treatments[i].antibiotic === name) {
            activeChoice = treatments[i];
            break;
        }
    }
}

function toggleChoise(name) {
    setActiveChoice(name);
}

const TestWrapper = () => {
    dose = `${activeChoice.dosageResult.dose.value} ${activeChoice.dosageResult.dose.unit}`;
    doseInDay = `${activeChoice.dosageResult.dose.value * activeChoice.instructions.dosesPerDay} ${activeChoice.dosageResult.dose.unit}`;

    let AntibioticElements = treatments.map((antibiote, index) => 
        <Choise
            key={index}
            index={index}
            name={antibiote.antibiotic}
            dosage={`${antibiote.formula.strength.text}`}
            dose={dose}
            doseInDay={doseInDay}
            instruction={`${antibiote.instructions.dosesPerDay} krt/vrk, yht ${antibiote.instructions.days} vrk ajan`}
            toggleChoise={toggleChoise}
            choise={antibiote.antibiotic === activeChoice.antibiotic ? true : false}
            length={treatments.length}
        />
    );
    return (
        <div className="treatment-choises">
            <div className="choise-container">
                {AntibioticElements}
            </div>
        </div>
    );
};

test('Should render Choise', async() => {
    render(<TestWrapper />);
});

test('Should show primary choice text with Amoksisilliini jauhe', async () => {
    render(<TestWrapper />);

    expect(screen.queryByText('Ensisijainen valinta: Amoksisilliini jauhe 100 mg/ml')).toBeInTheDocument();
});

test('Should show secondary choice text with Amoksisilliini-klavulaanihappo', async () => {
    render(<TestWrapper />);
    
    expect(screen.queryByText('Toissijainen valinta: Amoksisilliini-klavulaanihappo jauhe 80/11.4 mg/ml')).toBeInTheDocument();
});

test('Should show dose, dosage and dosesInDay texts', async () => {
    render(<TestWrapper />);
    
    expect(screen.queryByText('Kerta-annos: 4.5 ml')).toBeInTheDocument();
    expect(screen.queryByText('Vuorokausiannos: 9 ml')).toBeInTheDocument();
    expect(screen.queryByText('Annostelu: 2 krt/vrk, yht 5 vrk ajan')).toBeInTheDocument();
});

/*
test('Should show secondary choices instructions after clicking it', async() => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Toissijainen valinta: Amoksisilliini-klavulaanihappo jauhe 80/11.4 mg/ml'));
    await waitFor(() => {
        expect(screen.queryByText('Kerta-annos: 5.5 ml')).toBeInTheDocument();
        expect(screen.queryByText('Vuorokausiannos: 11 ml')).toBeInTheDocument();
        expect(screen.queryByText('Annostelu: 2 krt/vrk, yht 5 vrk ajan')).toBeInTheDocument();
    });
});*/