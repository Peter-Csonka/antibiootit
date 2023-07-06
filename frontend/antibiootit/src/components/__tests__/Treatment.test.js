import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Treatment from '../Treatment';


const loading = false;
const needsAntibiotics = true;
const description = "60% valikorvatulehduksista paranee ilman antibioottia";
const chosenWeight = 22;
const targetedInfo = [];

const treatments = [
{
    antibiotic: 'Amoksisilliini jauhe',
    dosageResult: {dose: {unit: "ml", value: 4.5}, accurateDose: {unit: "ml", value: 4.4}, maxAccurateDose: {unit: "ml", value: 4.4}},
    format: "mikstuura",
    formula: {strength: {unit: "mg/ml", value: 100, text: "100 mg/ml"}, dosage: {unit: "mg/kg/vrk", value: 40}},
    instructions: {days: 5, dosesPerDay: 2, recipeText: "kahdesti päivässä", doseMultipliers: [{ id: 0, multiplier: 1 }]}
},
{
    antibiotic: 'Amoksisilliini-klavulaanihappo jauhe',
    dosageResult: {dose: {unit: "ml", value: 5.5}, accurateDose: {unit: "ml", value: 5.5}, maxAccurateDose: {unit: "ml", value: 5.5}},
    format: "mikstuura",
    formula: {strength: {unit: "mg/ml", value: 80, text: "80/11.4 mg/ml"}, dosage: {unit: "mg/kg/vrk", value: 40}},
    instructions: {days: 5, dosesPerDay: 2, recipeText: "kahdesti päivässä", doseMultipliers: [{ id: 0, multiplier: 1 }]}
}];

const treatmentsMax = [
    {
        antibiotic: 'Amoksisilliini jauhe',
        dosageResult: {dose: {unit: "ml", value: 3}, accurateDose: {unit: "ml", value: 2.993}, maxAccurateDose: {unit: "ml", value: 2.993}},
        format: "mikstuura",
        formula: {strength: {unit: "mg/ml", value: 100, text: "100 mg/ml"}, dosage: {unit: "mg/kg/vrk", value: 40}},
        instructions: {days: 5, dosesPerDay: 3, recipeText: "kolmesti päivässä", doseMultipliers: [{ id: 0, multiplier: 1 }]}
    }
]

const TestWrapper = () => {
  const [activeRecipe, setActiveRecipe] = useState({
    text: "4.5 ml kahdesti päivässä 5 vrk:n ajan",
    antibioteName: "Amoksisilliini jauhe",
    antibioteStrength: "100 mg/ml"
  });
  const [canMixture, setCanMixture] = useState(false);

  return (
    <Treatment
      loading={loading}
      needsAntibiotics={needsAntibiotics}
      description={description}
      weight={chosenWeight}
      treatments={treatments}
      setActiveRecipe={setActiveRecipe}
      targetedInfo={targetedInfo}
      penicillinAllergy={false}
      concurrentMycoplasma={false}
      setCanMixture={setCanMixture}
      wantsMixture={false}
    />
  );
};

const TestWrapperMax = () => {
    const [activeRecipe, setActiveRecipe] = useState({
        text: "10 ml kolmesti päivässä 5 vrk:n ajan",
        antibioteName: "Amoksisilliini jauhe",
        antibioteStrength: "100 mg/ml"
    });

    return (
        <Treatment
            loading={loading}
            needsAntibiotics={needsAntibiotics}
            description={description}
            weight={39}
            treatments={treatmentsMax}
            setActiveRecipe={setActiveRecipe}
            format={treatments[0].format}
        />
    );
}

test('Should render Treatment', async() => {
    render(<TestWrapper />);
});

test('Should show header with text mikstuurana', async() => {
    render(<TestWrapper />);

    expect(screen.queryByText('Hoitosuositus mikstuurana')).toBeInTheDocument();
});

test('Should render 2 treatments', async() => {
    render(<TestWrapper />);
  
    const choiseElements = screen.getAllByTestId('choise-element');
    expect(choiseElements).toHaveLength(2); // Assuming there are 2 treatments in the props
});

test('Should show instructions', async() => {
    render(<TestWrapper />);

    expect(screen.queryByText('Hoitosuositus mikstuurana')).toBeInTheDocument();
});

test('Should render Laskukaava-button', async() => {
    render(<TestWrapper />);
    
    await waitFor(() => {
        expect(screen.queryByText('Laskukaava')).toBeInTheDocument();
    });
});

test('Should show description', async() => {
    render(<TestWrapper />);

    expect(screen.queryByText(description)).toBeInTheDocument();
});

test('Should not show description after clicking laskukaava-button', async() => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Laskukaava'));
    expect(screen.queryByText(description)).not.toBeInTheDocument();
});

test('Should render calculations after clicking laskukaava-button', async() => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Laskukaava'));
    expect(screen.getByTestId('calculations')).toBeInTheDocument();
});

/*
test('Should show additional info when result is over max', async() => {
    render(<TestWrapperMax />);

    fireEvent.click(screen.getByText('Laskukaava'));
    expect(screen.queryByText('Vuorokauden maksimiannos ylittyy (10.4ml > 10ml), joten tarjotaan maksimiannosta')).toBeInTheDocument();
});*/

