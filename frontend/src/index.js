import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import ScrollToTop from './Utils/ScrollToTop';
import './asset/font/font.css'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ScrollToTop/>
        <App />
    </BrowserRouter>
);

reportWebVitals();