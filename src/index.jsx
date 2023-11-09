import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initStorage } from './utils/helpers';
import './index.css';

initStorage();

const root = createRoot(document.getElementById('root'));
root.render(<App />);
