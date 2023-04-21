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
	render(<BrowserRouter>
    <App>
      <Header />
    </App>
  </BrowserRouter>);
  expect(screen.getByText('Laskuri')).toBeInTheDocument();
  expect(screen.getByText('Tietoa sivustosta')).toBeInTheDocument();
  expect(screen.getByText('Palaute')).toBeInTheDocument();
});


test('Should render Footer', async () => {
  render(<BrowserRouter>
    <App>
      <Footer />
    </App>
  </BrowserRouter>);
});

