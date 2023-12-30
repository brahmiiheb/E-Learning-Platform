// frontend/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './LandingPage';
import AdminApp from './AdminApp';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {window.location.pathname.startsWith('/admin') ? <AdminApp /> : <App />}
  </React.StrictMode>
);
