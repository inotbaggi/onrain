import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import AppClass from './AppClass';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <AppClass />
);
