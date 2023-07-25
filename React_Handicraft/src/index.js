import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from "../src/redux-config/Store"
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId1 = "772948950721-v1oh3qjif6a0tjdfgosea03498gmp5pg.apps.googleusercontent.com"
root.render(


    <Provider store={Store}>
        <BrowserRouter>
            <GoogleOAuthProvider
                clientId={clientId1}
                redirectUri={"https://localhost:3001"}
                scope={['profile', 'email']}
            >
                <App />
            </GoogleOAuthProvider>
        </BrowserRouter>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
