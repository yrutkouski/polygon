import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initStorage } from './utils/helpers';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

initStorage();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
