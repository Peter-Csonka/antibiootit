import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from '../Form';

const menuItems = [
    "Streptokokkitonsilliitti",
    "Bronkiitti",
    "Third item"
]

test('Should render Form', async () => {
    render(<Form diagnoses={menuItems} />);
});

test('Should not render checkboxes initially', async () => {
    render(<Form diagnoses={menuItems} />);
    expect(screen.queryByText('Penisilliiniallergia')).toBeNull();
    expect(screen.queryByText('Samanaikainen EBV-infektio')).toBeNull();
    expect(screen.queryByText('Samanaikainen mykoplasma')).toBeNull();
});
