import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import AppClass from './AppClass';
import axios from "axios";

axios.defaults.baseURL = 'onrain-s.qubixmc.net/api/v1'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <AppClass />
);
