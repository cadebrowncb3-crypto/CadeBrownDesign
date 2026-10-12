import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted fonts: Archivo (variable weight + width) for display type,
// Instrument Sans for text and labels, Instrument Serif italic for accents.
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/instrument-sans/latin-400.css';
import '@fontsource/instrument-sans/latin-500.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
