import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom'
import { AppProvider } from './context/context';

ReactDOM.render(
 <React.StrictMode>
    <AppProvider>
        <BrowserRouter>
      <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
 document.getElementById('root'));



