// src/main.tsx
import React from 'react';
import { setupApiInterceptors } from "./components/AdminPanel/services/apiService";
import { useAuthStore } from "./components/AdminPanel/store/authStore";

setupApiInterceptors(() => useAuthStore.getState().token || localStorage.getItem("token"));

import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
    </React.StrictMode>
);