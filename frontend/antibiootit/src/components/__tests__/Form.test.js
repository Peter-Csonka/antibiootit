import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from '../Form';

const diagnoses = [
    {name: "Streptokokkitonsilliitti",
     needsAntibiotics: "true",
     checkBoxes: [
        {id: 'EBV-001', name: 'EBV-infektio'}]},
    {name: "Bronkiitti",
     needsAntibiotics: "false",
     checkBoxes: []},
    {name: "Välikorvatulehdus",
     needsAntibiotics: "true",
     checkBoxes: []},
    {name: "Avohoitopneumonia",
     needsAntibiotics: "true",
     checkBoxes: [
        {id: 'MYK-001', name: 'Mykoplasmainfektio'}]}
]

const MIN_WEIGHT = 4;
const MAX_WEIGHT = 100;

const receiveInput = () => {
    console.log("Testdata received")
}

const setChosenDiagnosis = () => {
    console.log("Test diagnosis set")
}

const setChosenWeight = () => {
    console.log("Test weight set")
}

const changeInstruction = () => {
    console.log("Test instruction changed")
}

const formSubmitted = false;
const formData = null;
const hasFormData = false;

const TestWrapper = () => {
    const [isWeightOk, setIsWeightOk] = useState(false);
    
    return (
        <Form 
        diagnoses={diagnoses}
        handleSubmit={receiveInput} 
        changeInstruction={changeInstruction} 
        setChosenDiagnosis={setChosenDiagnosis}
        setChosenWeight={setChosenWeight}
        formSubmitted={formSubmitted} 
        formData={formData}
        hasFormData={hasFormData}
        isWeightOk={isWeightOk}
        setIsWeightOk={setIsWeightOk}
    />
  );
};

test('Should render Form', async () => {
    render(<TestWrapper />);
});

test('Should not render checkboxes initially', async () => {
    render(<TestWrapper />);
    expect(screen.queryByText('Penisilliiniallergia')).toBeNull();
    expect(screen.queryByText('Samanaikainen EBV-infektio')).toBeNull();
    expect(screen.queryByText('Samanaikainen mykoplasma')).toBeNull();
});

test('Should have the correct number of diagnoses in the menu', async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    const childCount = diagnosisMenu.children.length;
  
    expect(childCount).toBe(4);
});

test('Should render the correct checkboxes for streptokokkitonsilliitti', async () => {
    render(<TestWrapper />);
    
    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    fireEvent.click(screen.getByText('Streptokokkitonsilliitti'))
    await waitFor(() => {
        expect(screen.queryByText('Penisilliiniallergia')).toBeInTheDocument();
        expect(screen.queryByText('Samanaikainen EBV-infektio')).toBeInTheDocument();
        expect(screen.queryByText('Samanaikainen mykoplasma')).toBeNull();
      });
})

test('Should render the correct checkboxes for avohoitopneumonia', async () => {
    render(<TestWrapper />);
    
    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    fireEvent.click(screen.getByText('Avohoitopneumonia'))
    await waitFor(() => {
        expect(screen.queryByText('Penisilliiniallergia')).toBeInTheDocument();
        expect(screen.queryByText('Samanaikainen EBV-infektio')).toBeNull();
        expect(screen.queryByText('Samanaikainen mykoplasma')).toBeInTheDocument();
      });
})

test('Should render the correct checkbox for bronkiitti', async () => {
    render(<TestWrapper />);
    
    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    fireEvent.click(screen.getByText('Bronkiitti'))
    await waitFor(() => {
        expect(screen.queryByText('Penisilliiniallergia')).toBeInTheDocument();
        expect(screen.queryByText('Samanaikainen EBV-infektio')).toBeNull();
        expect(screen.queryByText('Samanaikainen mykoplasma')).toBeNull();
      });
})

test('Should not render submit button initially', async () => {
    render(<TestWrapper />);
    expect(screen.queryByText('Laske suositus')).toBeNull();
})

test('Should render submit button after a diagnosis is selected', async () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    fireEvent.click(screen.getByText('Streptokokkitonsilliitti'))
    expect(screen.queryByText('Laske suositus')).toBeInTheDocument();
})

test('Should render submit button after a diagnosis is selected even if it needs no antibiotic treatment', async () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    fireEvent.click(screen.getByText('Bronkiitti'))
    expect(screen.queryByText('Laske suositus')).toBeInTheDocument();
})

test('Should allow diagnosis changes in the form', async () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    fireEvent.click(screen.getByText('Bronkiitti'))
    expect(screen.queryByText('Laske suositus')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Bronkiitti'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    expect(screen.queryByText('Välikorvatulehdus')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Välikorvatulehdus'))

    await waitFor(() => screen.getByTestId('weight-input'))
    expect(screen.getByTestId('weight-input')).toBeInTheDocument();
})


test('Should not allow weight input below 4 kg', async () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    fireEvent.click(screen.getByText('Välikorvatulehdus'))

    await waitFor(() => screen.getByTestId('weight-input'));
    const input = screen.getByTestId('weight-input');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '3.99' } });
    expect(input).toHaveValue('3.99');

    fireEvent.click(screen.queryByText('Laske suositus'));
    expect(screen.getByText(`Hyväksyttävä painoväli on ${MIN_WEIGHT}kg - ${MAX_WEIGHT}kg`)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });
})

test('Should not allow weight input above 100 kg', async () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    fireEvent.click(screen.getByText('Välikorvatulehdus'))

    await waitFor(() => screen.getByTestId('weight-input'));
    const input = screen.getByTestId('weight-input');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '100.5' } });
    expect(input).toHaveValue('100.5');

    fireEvent.click(screen.queryByText('Laske suositus'));
    expect(screen.getByText(`Hyväksyttävä painoväli on ${MIN_WEIGHT}kg - ${MAX_WEIGHT}kg`)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });
})

test('Should allow weight inputs between 4-100 kg', async () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Valitse diagnoosi'))
    await waitFor(() => screen.getAllByTestId('diagnosis-menu'))

    const diagnosisMenu = screen.getByTestId('diagnosis-menu');
    fireEvent.click(screen.getByText('Välikorvatulehdus'))

    await waitFor(() => screen.getByTestId('weight-input'));
    const input = screen.getByTestId('weight-input');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '12' } });
    expect(input).toHaveValue('12');

    fireEvent.click(screen.queryByText('Laske suositus'));
    expect(screen.queryByText('Tarkista paino')).toBeNull();

    fireEvent.change(input, { target: { value: '' } });
})
