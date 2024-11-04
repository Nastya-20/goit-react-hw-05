import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import "modern-normalize";
import './i18n';
import { I18nextProvider } from 'react-i18next'; 
import i18n from './i18n'; 
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}> 
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


