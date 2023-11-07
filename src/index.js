import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
if (!sessionStorage.getItem('current_user')) sessionStorage.setItem('current_user', JSON.stringify({}));
if (!localStorage.getItem('whiteboards')) localStorage.setItem('whiteboards', JSON.stringify({}));

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
