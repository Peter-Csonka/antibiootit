jest.mock('react-markdown', () => {
    return {
      Markdown: () => <div>Mocked react-markdown component</div>
    };
  });
  
  jest.mock('remark-gfm', () => {
    return () => {};
  });

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Antibiotics from '../Antibiotics';

test('Should render Antibiotics', async () => {
    render(<Antibiotics handlePenicillinInfoVisibility={() => {}}/>);
});

test('Frontpage includes instructions', async () => {
	render(<Antibiotics handlePenicillinInfoVisibility={() => {}}/>);
	expect(screen.getByText('Lapsen antibioottilaskuri')).toBeInTheDocument();
    await waitFor(() => screen.getByTestId('instructions'));
    await waitFor(() => screen.getByTestId('instructions-header'));
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('instructions-header')).toBeInTheDocument();
    expect(screen.getByTestId('instructions-header')).toBeInTheDocument();
});