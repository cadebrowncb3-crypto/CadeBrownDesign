import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted fonts (closest open-licence matches to the PDF's typefaces).
import '@fontsource/jetbrains-mono/latin-300.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/atkinson-hyperlegible-next/latin-400.css';
import '@fontsource/atkinson-hyperlegible-next/latin-500.css';
import '@fontsource/archivo-narrow/latin-400.css';
import '@fontsource/archivo-narrow/latin-500.css';
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
