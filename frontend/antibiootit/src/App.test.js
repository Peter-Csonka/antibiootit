import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Footer from './components/Footer';
import Header from './components/Header';

test('Should render App', async () => {
  render(<BrowserRouter>
          <App />
        </BrowserRouter>);
});

test('Should render Header', async () => {
  render(<BrowserRouter>
    <App>
      <Header />
    </App>
  </BrowserRouter>);
});

test('Header includes all the correct links', () => {
  window.innerWidth = 1024;
  window.innerHeight = 1800;

	render(<BrowserRouter>
    <App>
      <Header />
    </App>
  </BrowserRouter>);

  expect(screen.getByTestId('calculator-link')).toBeInTheDocument();
  expect(screen.getByTestId('allergy-link')).toBeInTheDocument();
  expect(screen.getByTestId('info-link')).toBeInTheDocument();
  expect(screen.getByTestId('feedback-link')).toBeInTheDocument();
  
  delete window.innerWidth;
  delete window.innerHeight;
});


test('Should render Footer', async () => {
  render(<BrowserRouter>
    <App>
      <Footer />
    </App>
  </BrowserRouter>);
});

